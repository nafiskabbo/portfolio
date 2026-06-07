import { NextResponse } from 'next/server';
import { handleTrackingRequest } from '@/lib/tracking/handle-request';

export const runtime = 'nodejs';

/** Beacon endpoint for programmatic click logging (e.g. sendBeacon from email HTML). */
export async function GET(request: Request) {
  const result = await handleTrackingRequest(request, 'click');
  return NextResponse.json(
    { ok: true, recorded: result.recorded },
    { status: 200, headers: { 'Cache-Control': 'no-store' } }
  );
}

export async function POST(request: Request) {
  return GET(request);
}
