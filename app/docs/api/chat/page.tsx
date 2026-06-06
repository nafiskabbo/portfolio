import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Portfolio Chat API',
  description:
    'OpenAPI documentation for the portfolio chat API — ask questions about Nafis Kabbo skills and projects.',
  alternates: {
    canonical: `${SITE_URL}/docs/api/chat`,
  },
};

export default function ChatApiDocsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-slate-200">
      <h1 className="mb-4 text-3xl font-bold text-white">Portfolio Chat API</h1>
      <p className="mb-8 text-slate-400">
        Public, rate-limited API for AI agents and integrations. No authentication required.
      </p>

      <section className="mb-10 space-y-4">
        <h2 className="text-xl font-semibold text-white">Endpoint</h2>
        <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm">
          POST {SITE_URL}/api/chat
        </pre>
      </section>

      <section className="mb-10 space-y-4">
        <h2 className="text-xl font-semibold text-white">Request</h2>
        <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm">{`{
  "messages": [
    { "role": "user", "content": "What mobile platforms do you specialize in?" }
  ]
}`}</pre>
      </section>

      <section className="mb-10 space-y-4">
        <h2 className="text-xl font-semibold text-white">Response</h2>
        <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm">{`{
  "reply": "…",
  "modelUsed": "…"
}`}</pre>
      </section>

      <section className="mb-10 space-y-4">
        <h2 className="text-xl font-semibold text-white">Rate limits</h2>
        <p className="text-slate-400">24 messages per 10 minutes per IP address.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-white">Resources</h2>
        <ul className="list-inside list-disc space-y-2 text-slate-400">
          <li>
            <Link
              href="/.well-known/openapi/chat.json"
              className="text-cyan-400 hover:underline"
            >
              OpenAPI specification
            </Link>
          </li>
          <li>
            <Link href="/.well-known/api-catalog" className="text-cyan-400 hover:underline">
              API catalog (RFC 9727)
            </Link>
          </li>
          <li>
            <Link href="/api/health" className="text-cyan-400 hover:underline">
              Health endpoint
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
