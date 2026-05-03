import { portfolioAssistantSystemPrompt } from './assistant-prompt';

export interface ChatTurn {
  role: 'user' | 'assistant';
  content: string;
}

/** Gemini (Google AI Studio) first, then top free OpenRouter models by quality/coverage. */
export const portfolioChatModelChain = [
  { provider: 'gemini' as const, model: 'gemini-3.1-flash-lite-preview' },
  { provider: 'gemini' as const, model: 'gemma-4-31b-it' },
  { provider: 'openrouter' as const, model: 'tencent/hy3-preview:free' },
  { provider: 'openrouter' as const, model: 'openai/gpt-oss-120b:free' },
  { provider: 'openrouter' as const, model: 'inclusionai/ling-2.6-1t:free' },
] as const;

const GEMINI_BASE = 'https://generativelanguage.googleapis.com/v1beta';
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';

function toGeminiContents(messages: ChatTurn[]) {
  return messages.map((m) => ({
    role: m.role === 'user' ? ('user' as const) : ('model' as const),
    parts: [{ text: m.content }],
  }));
}

function extractGeminiText(data: unknown): string | null {
  if (!data || typeof data !== 'object') return null;
  const root = data as Record<string, unknown>;
  const candidates = root.candidates;
  if (!Array.isArray(candidates) || candidates.length === 0) return null;
  const first = candidates[0] as Record<string, unknown>;
  const content = first.content as Record<string, unknown> | undefined;
  const parts = content?.parts;
  if (!Array.isArray(parts) || parts.length === 0) return null;
  const text = (parts[0] as Record<string, unknown>)?.text;
  return typeof text === 'string' && text.trim() ? text.trim() : null;
}

function geminiErrorMessage(data: unknown): string | undefined {
  if (!data || typeof data !== 'object') return undefined;
  const err = (data as Record<string, unknown>).error as Record<string, unknown> | undefined;
  const msg = err?.message;
  return typeof msg === 'string' ? msg : undefined;
}

async function callGemini(
  apiKey: string,
  model: string,
  messages: ChatTurn[]
): Promise<string> {
  const url = `${GEMINI_BASE}/models/${model}:generateContent`;
  const generationConfig: Record<string, unknown> = {
    maxOutputTokens: 640,
    temperature: 0.5,
    topP: 0.9,
  };
  if (model.startsWith('gemini-3')) {
    generationConfig.thinkingConfig = { thinkingLevel: 'minimal' };
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: portfolioAssistantSystemPrompt }] },
      contents: toGeminiContents(messages),
      generationConfig,
    }),
  });

  const data: unknown = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(geminiErrorMessage(data) || `Gemini HTTP ${res.status}`);
  }
  const text = extractGeminiText(data);
  if (!text) {
    const block = (data as Record<string, unknown>)?.promptFeedback;
    throw new Error(block ? 'Gemini blocked or empty response.' : 'Gemini returned no text.');
  }
  return text;
}

async function callOpenRouter(
  apiKey: string,
  model: string,
  messages: ChatTurn[]
): Promise<string> {
  const referer = process.env.NEXT_PUBLIC_SITE_URL || 'https://nafiskabbo.dev';
  const body = {
    model,
    temperature: 0.5,
    max_tokens: 640,
    messages: [
      { role: 'system' as const, content: portfolioAssistantSystemPrompt },
      ...messages.map((m) => ({
        role: m.role === 'user' ? ('user' as const) : ('assistant' as const),
        content: m.content,
      })),
    ],
  };

  const res = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
      'HTTP-Referer': referer,
      'X-Title': 'Nafis Kabbo Portfolio Chat',
    },
    body: JSON.stringify(body),
  });

  const data: unknown = await res.json().catch(() => null);
  if (!res.ok) {
    let errMsg: string | undefined;
    if (data && typeof data === 'object' && 'error' in data) {
      const err = (data as { error?: unknown }).error;
      if (typeof err === 'string') errMsg = err;
      else if (err && typeof err === 'object' && 'message' in err && typeof (err as { message: unknown }).message === 'string') {
        errMsg = (err as { message: string }).message;
      }
    }
    throw new Error(errMsg || `OpenRouter HTTP ${res.status}`);
  }
  const choice = (data as { choices?: { message?: { content?: string } }[] })?.choices?.[0];
  const text = choice?.message?.content?.trim();
  if (!text) throw new Error('OpenRouter returned no text.');
  return text;
}

export interface PortfolioChatResult {
  reply: string;
  modelUsed: string;
}

export async function runPortfolioChatWithFallback(
  messages: ChatTurn[],
  keys: { geminiApiKey?: string; openrouterApiKey?: string }
): Promise<PortfolioChatResult> {
  const errors: string[] = [];

  for (const step of portfolioChatModelChain) {
    try {
      if (step.provider === 'gemini') {
        if (!keys.geminiApiKey) {
          errors.push('Gemini: missing GEMINI_API_KEY');
          continue;
        }
        const reply = await callGemini(keys.geminiApiKey, step.model, messages);
        return { reply, modelUsed: `${step.provider}:${step.model}` };
      }
      if (!keys.openrouterApiKey) {
        errors.push('OpenRouter: missing OPENROUTER_API_KEY');
        continue;
      }
      const reply = await callOpenRouter(keys.openrouterApiKey, step.model, messages);
      return { reply, modelUsed: `${step.provider}:${step.model}` };
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      errors.push(`${step.provider}/${step.model}: ${msg}`);
    }
  }

  throw new Error(errors.length ? errors.join(' | ') : 'No chat providers configured.');
}
