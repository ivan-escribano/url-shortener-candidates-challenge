import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { applyRateLimit } from '../../app/server/middleware/rate-limit.middleware';

const createRequest = (ip = '1.2.3.4') =>
  new Request('http://localhost/', {
    headers: { 'x-forwarded-for': ip },
  });

// Rate limit only runs in production, so we simulate it for testing
const originalEnv = process.env.NODE_ENV;

describe('applyRateLimit', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'production';
  });

  afterAll(() => {
    process.env.NODE_ENV = originalEnv;
  });
  it('allows the first 20 requests', () => {
    const ip = `10.0.0.${Math.random()}`;

    for (let i = 0; i < 20; i++) {
      expect(applyRateLimit(createRequest(ip))).toBeNull();
    }
  });

  it('blocks the 21st request with status 429', () => {
    const ip = `10.0.1.${Math.random()}`;

    for (let i = 0; i < 20; i++) {
      applyRateLimit(createRequest(ip));
    }

    const response = applyRateLimit(createRequest(ip));

    expect(response).toBeInstanceOf(Response);
    expect(response!.status).toBe(429);
  });

  it('includes Retry-After header in 429 response', () => {
    const ip = `10.0.2.${Math.random()}`;

    for (let i = 0; i < 20; i++) {
      applyRateLimit(createRequest(ip));
    }

    const response = applyRateLimit(createRequest(ip));

    expect(response!.headers.get('Retry-After')).toBe('60');
  });
});
