const requestMap = new Map<string, number[]>();

const MAX_REQUESTS = 20;
const WINDOW_MS = 60_000;

export function applyRateLimit(request: Request): Response | null {
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';
  const now = Date.now();

  const timestamps = (requestMap.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS) {
    return new Response('Too many requests. Please try again later.', {
      status: 429,
      headers: { 'Retry-After': '60' },
    });
  }

  timestamps.push(now);
  requestMap.set(ip, timestamps);
  return null;
}
