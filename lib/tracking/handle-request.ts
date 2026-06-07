import { getClientIp } from '@/lib/security/client-ip';
import { checkRateLimit, TRACKING_RATE_LIMIT } from '@/lib/security/rate-limit';
import {
  parseTrackingParams,
  verifyTrackingParams,
  type TrackingParams,
} from '@/lib/security/tracking-token';
import { recordTrackingEvent, type TrackingEventType } from '@/lib/tracking/record-event';

export type TrackingHandleResult = {
  params: TrackingParams | null;
  recorded: boolean;
  rateLimited: boolean;
  blocked: boolean;
};

export async function handleTrackingRequest(
  request: Request,
  eventType: TrackingEventType
): Promise<TrackingHandleResult> {
  const ip = getClientIp(request.headers);
  const url = new URL(request.url);
  const params = parseTrackingParams(url.searchParams);

  const rate = await checkRateLimit(
    ip,
    TRACKING_RATE_LIMIT,
    params?.leadToken
  );

  if (rate.blocked || !rate.allowed) {
    return { params, recorded: false, rateLimited: !rate.allowed, blocked: rate.blocked };
  }

  if (!params || !verifyTrackingParams(params)) {
    return { params, recorded: false, rateLimited: false, blocked: false };
  }

  await recordTrackingEvent(request.headers, ip, eventType, params);
  return { params, recorded: true, rateLimited: false, blocked: false };
}
