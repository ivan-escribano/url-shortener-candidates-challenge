// Creado — Url domain entity
// Encapsulates all URL business rules: creation, validation, and click tracking

// All constants in one place — no magic strings
const URL_CONFIG = {
  ALPHABET: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  CODE_LENGTH: 7,
  MAX_URL_LENGTH: 2048,
  ALLOWED_PROTOCOLS: ['http:', 'https:'],
  // Regex patterns to detect private/local IP ranges (SSRF prevention)
  PRIVATE_IP_PATTERNS: [/^localhost$/i, /^127\./, /^10\./, /^192\.168\./, /^172\.(1[6-9]|2\d|3[01])\./],
  ERRORS: {
    URL_REQUIRED: 'URL is required',
    URL_TOO_LONG: 'URL must be 2048 characters or less',
    INVALID_FORMAT: 'Invalid URL format',
    INVALID_PROTOCOL: 'Only http and https URLs are allowed',
    PRIVATE_URL: 'Private and local URLs are not allowed',
  },
} as const;

export class Url {
  readonly id: string;
  readonly originalUrl: string;
  readonly shortCode: string;
  // Private — only changeable through registerClick()
  private _clicks: number;
  readonly createdAt: Date;

  // Expose clicks as read-only from outside
  get clicks() {
    return this._clicks;
  }

  // Private constructor — forces use of create() or reconstitute()
  private constructor(originalUrl: string, shortCode: string, clicks: number, createdAt: Date, id?: string) {
    this.id = id ?? crypto.randomUUID();
    this.originalUrl = originalUrl;
    this.shortCode = shortCode;
    this._clicks = clicks;
    this.createdAt = createdAt;
  }

  // Factory method — creates a new URL from user input with full validation
  static create(originalUrl: string): Url {
    Url.validate(originalUrl);
    return new Url(originalUrl.trim(), Url.generateCode(), 0, new Date());
  }

  // Reconstitutes an existing URL from database data — skips validation
  static reconstitute(params: { id: string; originalUrl: string; shortCode: string; clicks: number; createdAt: Date }): Url {
    return new Url(params.originalUrl, params.shortCode, params.clicks, params.createdAt, params.id);
  }

  // The only way to increment clicks — enforces the rule "always +1, never arbitrary"
  registerClick(): void {
    this._clicks += 1;
  }

  // Full URL validation — called only on create(), not on reconstitute()
  private static validate(url: string): void {
    if (!url.trim()) throw new Error(URL_CONFIG.ERRORS.URL_REQUIRED);

    if (url.length > URL_CONFIG.MAX_URL_LENGTH) throw new Error(URL_CONFIG.ERRORS.URL_TOO_LONG);

    let parsed: URL;

    try {
      parsed = new URL(url);
    } catch {
      throw new Error(URL_CONFIG.ERRORS.INVALID_FORMAT);
    }

    if (!URL_CONFIG.ALLOWED_PROTOCOLS.includes(parsed.protocol as 'http:' | 'https:')) throw new Error(URL_CONFIG.ERRORS.INVALID_PROTOCOL);

    const isPrivate = URL_CONFIG.PRIVATE_IP_PATTERNS.some((pattern) => pattern.test(parsed.hostname));
    if (isPrivate) throw new Error(URL_CONFIG.ERRORS.PRIVATE_URL);
  }

  // Generates a random 7-character alphanumeric short code (3.5 trillion combinations)
  private static generateCode(): string {
    let code = '';

    for (let i = 0; i < URL_CONFIG.CODE_LENGTH; i++) code += URL_CONFIG.ALPHABET[Math.floor(Math.random() * URL_CONFIG.ALPHABET.length)];

    return code;
  }
}
