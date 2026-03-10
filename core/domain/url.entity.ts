import { URL_CONFIG, URL_ERRORS } from './url.config';

export class Url {
  readonly id: string;
  readonly shortCode: string;
  readonly createdAt: Date;
  private _clicks: number;
  private _originalUrl: string;

  get originalUrl() {
    return this._originalUrl;
  }

  get clicks() {
    return this._clicks;
  }

  private constructor(originalUrl: string, shortCode: string, clicks: number, createdAt: Date, id?: string) {
    this.id = id ?? crypto.randomUUID();
    this._originalUrl = originalUrl;
    this.shortCode = shortCode;
    this._clicks = clicks;
    this.createdAt = createdAt;
  }

  static create(originalUrl: string): Url {
    Url.validate(originalUrl);

    return new Url(originalUrl.trim(), Url.generateCode(), 0, new Date());
  }

  static restore(params: { id: string; originalUrl: string; shortCode: string; clicks: number; createdAt: Date }): Url {
    return new Url(params.originalUrl, params.shortCode, params.clicks, params.createdAt, params.id);
  }

  registerClick(): void {
    this._clicks += 1;
  }

  updateOriginalUrl(newUrl: string): void {
    Url.validate(newUrl);

    this._originalUrl = newUrl.trim();
  }

  private static validate(url: string): void {
    if (!url.trim()) throw new Error(URL_ERRORS.URL_REQUIRED);

    if (url.length > URL_CONFIG.MAX_URL_LENGTH) throw new Error(URL_ERRORS.URL_TOO_LONG);

    const parsed = Url.safeParseUrl(url);

    if (!parsed) throw new Error(URL_ERRORS.INVALID_FORMAT);

    if (!URL_CONFIG.ALLOWED_PROTOCOLS.includes(parsed.protocol as 'http:' | 'https:')) throw new Error(URL_ERRORS.INVALID_PROTOCOL);

    const isPrivate = URL_CONFIG.PRIVATE_IP_PATTERNS.some((p) => p.test(parsed.hostname));

    if (isPrivate) throw new Error(URL_ERRORS.PRIVATE_URL);

    const parts = parsed.hostname.split('.');
    const tld = parts[parts.length - 1];

    if (parts.length < 2 || tld.length < 2) throw new Error(URL_ERRORS.INVALID_DOMAIN);
  }

  private static safeParseUrl(url: string): URL | null {
    try {
      return new URL(url);
    } catch {
      return null;
    }
  }

  private static generateCode(): string {
    const { ALPHABET, CODE_LENGTH } = URL_CONFIG;

    return Array.from({ length: CODE_LENGTH }, () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)]).join('');
  }
}
