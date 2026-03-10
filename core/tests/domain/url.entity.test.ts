import { describe, expect, it } from 'vitest';

import { URL_CONFIG, URL_ERRORS } from '../../domain/url.config';
import { Url } from '../../domain/url.entity';

describe('Url.create()', () => {
  it('creates a valid URL with correct defaults', () => {
    const url = Url.create('https://example.com');

    expect(url.originalUrl).toBe('https://example.com');
    expect(url.shortCode).toHaveLength(URL_CONFIG.CODE_LENGTH);
    expect(url.shortCode).toMatch(/^[A-Za-z0-9]+$/);
    expect(url.clicks).toBe(0);
    expect(url.id).toBeDefined();
    expect(url.createdAt).toBeInstanceOf(Date);
  });

  it('generates unique short codes', () => {
    const codes = new Set(Array.from({ length: 20 }, () => Url.create('https://example.com').shortCode));
    expect(codes.size).toBeGreaterThan(1);
  });

  it('trims whitespace from URL', () => {
    const url = Url.create('  https://example.com  ');
    expect(url.originalUrl).toBe('https://example.com');
  });

  describe('validation', () => {
    it('rejects empty string', () => {
      expect(() => Url.create('')).toThrow(URL_ERRORS.URL_REQUIRED);
    });

    it('rejects whitespace-only string', () => {
      expect(() => Url.create('   ')).toThrow(URL_ERRORS.URL_REQUIRED);
    });

    it('rejects invalid URL format', () => {
      expect(() => Url.create('not-a-url')).toThrow(URL_ERRORS.INVALID_FORMAT);
    });

    it('rejects URL longer than 2048 characters', () => {
      const longUrl = 'https://example.com/' + 'a'.repeat(2048);
      expect(() => Url.create(longUrl)).toThrow(URL_ERRORS.URL_TOO_LONG);
    });

    it('rejects non-http protocols', () => {
      expect(() => Url.create('ftp://example.com')).toThrow(URL_ERRORS.INVALID_PROTOCOL);
    });

    it.each([
      ['https://example', 'no TLD'],
      ['https://example.', 'trailing dot, no TLD'],
      ['https://example.a', 'TLD too short (1 char)'],
    ])('rejects URL with invalid domain: %s (%s)', (url) => {
      expect(() => Url.create(url)).toThrow(URL_ERRORS.INVALID_DOMAIN);
    });

    it.each([
      ['http://localhost', 'localhost'],
      ['http://192.168.1.1', '192.168.x.x'],
      ['http://10.0.0.1', '10.x.x.x'],
      ['http://127.0.0.1', '127.x.x.x'],
    ])('rejects private URL %s (%s)', (url) => {
      expect(() => Url.create(url)).toThrow(URL_ERRORS.PRIVATE_URL);
    });
  });
});

describe('Url.restore()', () => {
  it('reconstructs entity preserving all data', () => {
    const params = {
      id: 'test-id-123',
      originalUrl: 'https://example.com',
      shortCode: 'aBcDeFg',
      clicks: 42,
      createdAt: new Date('2025-01-01'),
    };

    const url = Url.restore(params);

    expect(url.id).toBe(params.id);
    expect(url.originalUrl).toBe(params.originalUrl);
    expect(url.shortCode).toBe(params.shortCode);
    expect(url.clicks).toBe(params.clicks);
    expect(url.createdAt).toEqual(params.createdAt);
  });
});

describe('Url.registerClick()', () => {
  it('increments clicks by 1', () => {
    const url = Url.create('https://example.com');
    url.registerClick();
    expect(url.clicks).toBe(1);
  });

  it('accumulates multiple clicks', () => {
    const url = Url.create('https://example.com');
    url.registerClick();
    url.registerClick();
    url.registerClick();
    expect(url.clicks).toBe(3);
  });
});

describe('Url.updateOriginalUrl()', () => {
  it('updates with a valid URL', () => {
    const url = Url.create('https://example.com');
    url.updateOriginalUrl('https://new-example.com');
    expect(url.originalUrl).toBe('https://new-example.com');
  });

  it('rejects invalid URL keeping original unchanged', () => {
    const url = Url.create('https://example.com');
    expect(() => url.updateOriginalUrl('not-valid')).toThrow(URL_ERRORS.INVALID_FORMAT);
    expect(url.originalUrl).toBe('https://example.com');
  });

  it('applies same validation rules as create', () => {
    const url = Url.create('https://example.com');
    expect(() => url.updateOriginalUrl('http://localhost')).toThrow(URL_ERRORS.PRIVATE_URL);
  });
});
