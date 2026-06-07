export function getClientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim();
    if (first) return first;
  }
  return headers.get('x-real-ip') || 'unknown';
}

export function getCountryCode(headers: Headers): string | null {
  return headers.get('x-vercel-ip-country')?.toUpperCase() ?? null;
}
