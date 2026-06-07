import { NextResponse } from 'next/server';
import { handleTrackingRequest } from '@/lib/tracking/handle-request';
import { resolveDestination } from '@/lib/tracking/destinations';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const result = await handleTrackingRequest(request, 'redirect');
  const destinationKey = result.params?.destination ?? 'portfolio';
  const target = resolveDestination(destinationKey) ?? resolveDestination('portfolio');

  if (!target) {
    return NextResponse.redirect('https://nafiskabbo.dev', 302);
  }

  return NextResponse.redirect(target, 302);
}
