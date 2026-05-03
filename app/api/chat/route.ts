import { NextResponse } from 'next/server';
import {
  runPortfolioChatWithFallback,
  type ChatTurn,
} from '@/lib/portfolio-chat/providers';

export const runtime = 'nodejs';
export const maxDuration = 120;

const RATE_WINDOW_MS = 10 * 60_000;
const RATE_MAX = 24;
const rateBuckets = new Map<string, number[]>();

function getClientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }
  return headers.get('x-real-ip') || 'unknown';
}

function allowRate(ip: string): boolean {
  const now = Date.now();
  const prev = rateBuckets.get(ip) ?? [];
  const recent = prev.filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) return false;
  recent.push(now);
  rateBuckets.set(ip, recent);
  if (rateBuckets.size > 5000) {
    for (const [k, v] of rateBuckets) {
      const fresh = v.filter((t) => now - t < RATE_WINDOW_MS);
      if (fresh.length === 0) rateBuckets.delete(k);
      else rateBuckets.set(k, fresh);
    }
  }
  return true;
}

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
  const ip = getClientIp(req.headers);
  if (!allowRate(ip)) {
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
