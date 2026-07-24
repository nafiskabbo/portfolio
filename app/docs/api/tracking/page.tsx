import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Lead Tracking API',
  description: 'Signed tracking endpoints for email campaigns and conversion attribution.',
  alternates: { canonical: `${SITE_URL}/docs/api/tracking` },
};

export default function TrackingApiDocsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16 text-slate-200">
      <h1 className="mb-4 text-3xl font-bold text-white">Lead Tracking API</h1>
      <p className="mb-8 text-slate-400">
        Signed URLs for pixel, click, and redirect tracking. Events stored in Supabase with
        minimal data (lead UUID, timestamp, country, hashed IP).
      </p>

      <section className="mb-10 space-y-4">
        <h2 className="text-xl font-semibold text-white">Endpoints</h2>
        <ul className="list-inside list-disc space-y-2 text-slate-400">
          <li>
            <code className="text-cyan-300">GET /api/t/pixel</code> - 1×1 GIF (email open)
          </li>
          <li>
            <code className="text-cyan-300">GET|POST /api/t/click</code> - click beacon
          </li>
          <li>
            <code className="text-cyan-300">GET /api/t/r</code> - log + redirect to destination
          </li>
        </ul>
      </section>

      <section className="mb-10 space-y-4">
        <h2 className="text-xl font-semibold text-white">Required query params</h2>
        <pre className="overflow-x-auto rounded-lg bg-slate-900 p-4 text-sm">{`t   = lead UUID v4 (from your CSV)
d   = destination key (github, portfolio, linkedin, …)
src = campaign source (email, linkedin, …)
exp = unix expiry (recommended)
s   = HMAC signature (server-generated)`}</pre>
      </section>

      <section className="mb-10 space-y-4">
        <h2 className="text-xl font-semibold text-white">Security</h2>
        <p className="text-slate-400">
          URLs must be signed with <code className="text-cyan-300">TRACKING_SIGNING_SECRET</code>.
          Unsigned requests are not logged. Rate limits and IP auto-blocking apply.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-white">Full documentation</h2>
        <p className="text-slate-400">
          See{' '}
          <Link
            href="https://github.com/nafiskabbo/portfolio/blob/main/docs/TRACKING_API.md"
            className="text-cyan-400 hover:underline"
          >
            docs/TRACKING_API.md
          </Link>{' '}
          in the repo for signature algorithm, CSV workflow, SQL queries, and lead-gen examples.
        </p>
      </section>
    </main>
  );
}
