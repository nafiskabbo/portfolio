import { NextResponse } from 'next/server';
import {
  runPortfolioChatWithFallback,
  type ChatTurn,
} from '@/lib/portfolio-chat/providers';
import { getClientIp } from '@/lib/security/client-ip';
import { canAccessChatApi } from '@/lib/security/api-guard';
import { checkRateLimit, CHAT_RATE_LIMIT } from '@/lib/security/rate-limit';

export const runtime = 'nodejs';
export const maxDuration = 120;

function isValidTurns(raw: unknown): raw is ChatTurn[] {
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > 40) return false;
  for (const item of raw) {
    if (!item || typeof item !== 'object') return false;
    const role = (item as ChatTurn).role;
    const content = (item as ChatTurn).content;
    if (role !== 'user' && role !== 'assistant') return false;
    if (typeof content !== 'string' || content.length < 1 || content.length > 6000) {
      return false;
    }
  }
  return true;
}

function clipForModel(turns: ChatTurn[]): ChatTurn[] {
  const start = turns.findIndex((t) => t.role === 'user');
  if (start === -1) return [];
  const sliced = turns.slice(start);
  const max = 24;
  return sliced.length > max ? sliced.slice(-max) : sliced;
}

export async function POST(req: Request) {
  if (!canAccessChatApi(req.headers)) {
    return NextResponse.json({ error: 'Forbidden.' }, { status: 403 });
  }

  const ip = getClientIp(req.headers);
  const rate = await checkRateLimit(ip, CHAT_RATE_LIMIT);
  if (rate.blocked) {
    return NextResponse.json({ error: 'Access temporarily blocked.' }, { status: 403 });
  }
  if (!rate.allowed) {
    return NextResponse.json(
      { error: 'Too many messages. Please try again in a few minutes.' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid body.' }, { status: 400 });
  }

  const messages = (body as { messages?: unknown }).messages;
  if (!isValidTurns(messages)) {
    return NextResponse.json(
      { error: 'Invalid messages: send 1–40 turns with role user|assistant and non-empty content.' },
      { status: 400 }
    );
  }

  const clipped = clipForModel(messages);
  if (clipped.length === 0) {
    return NextResponse.json(
      { error: 'Start with a user message after the welcome note.' },
      { status: 400 }
    );
  }

  const geminiApiKey = process.env.GEMINI_API_KEY;
  const openrouterApiKey = process.env.OPENROUTER_API_KEY;

  if (!geminiApiKey && !openrouterApiKey) {
    return NextResponse.json(
      { error: 'Chat is not configured (missing API keys).' },
      { status: 503 }
    );
  }

  try {
    const { reply, modelUsed } = await runPortfolioChatWithFallback(clipped, {
      geminiApiKey,
      openrouterApiKey,
    });
    return NextResponse.json({ reply, modelUsed });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Chat failed.';
    console.error('[portfolio-chat]', message);
    return NextResponse.json(
      { error: 'All models are busy or unavailable. Please try again shortly.' },
      { status: 503 }
    );
  }
}
