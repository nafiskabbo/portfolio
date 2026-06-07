import { NextResponse } from 'next/server';
import { handleTrackingRequest } from '@/lib/tracking/handle-request';
import { PIXEL_HEADERS, TRANSPARENT_GIF } from '@/lib/tracking/pixel';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  await handleTrackingRequest(request, 'pixel');

  return new NextResponse(TRANSPARENT_GIF, {
    status: 200,
    headers: PIXEL_HEADERS,
  });
}
