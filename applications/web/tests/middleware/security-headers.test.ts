import { describe, it, expect } from 'vitest';
import { applySecurityHeaders } from '../../app/server/middleware/security-headers.middleware';

describe('applySecurityHeaders', () => {
  it('applies all 6 security headers', () => {
    const headers = new Headers();

    applySecurityHeaders(headers);

    expect(headers.get('X-Frame-Options')).toBe('DENY');
    expect(headers.get('X-Content-Type-Options')).toBe('nosniff');
    expect(headers.get('Referrer-Policy')).toBe('strict-origin-when-cross-origin');
    expect(headers.get('Strict-Transport-Security')).toBe('max-age=31536000; includeSubDomains');
    expect(headers.get('Permissions-Policy')).toBe('camera=(), microphone=(), geolocation=()');
    expect(headers.get('Content-Security-Policy')).toBeDefined();
  });

  it('CSP contains the expected directives', () => {
    const headers = new Headers();

    applySecurityHeaders(headers);

    const csp = headers.get('Content-Security-Policy')!;

    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("script-src 'self' 'unsafe-inline'");
    expect(csp).toContain("frame-src 'none'");
    expect(csp).toContain("form-action 'self'");
  });
});
