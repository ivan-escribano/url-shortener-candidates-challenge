// Actualizado — pure utility functions for URL logic
// No framework, no DB — just plain TypeScript
import { URL_CONFIG } from './url.config';

// Generates a random 7-character short code (e.g. "aB3xKp2")
// Uses 62 possible characters → 62^7 = ~3.5 billion combinations
function generateShortCode(): string {
  let code = '';

  for (let i = 0; i < URL_CONFIG.CODE_LENGTH; i++) {
    code += URL_CONFIG.ALPHABET[Math.floor(Math.random() * URL_CONFIG.ALPHABET.length)];
  }

  return code;
}

// Validates that a URL is safe to shorten
// Throws an error with a clear message if validation fails
function validateUrl(url: string): void {
  if (url.length > URL_CONFIG.MAX_URL_LENGTH) {
    throw new Error(URL_CONFIG.ERRORS.URL_TOO_LONG);
  }

  // Try to parse the URL — throws if malformed
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error(URL_CONFIG.ERRORS.INVALID_FORMAT);
  }

  // Only allow http and https — reject ftp://, javascript:, etc.
  if (!URL_CONFIG.ALLOWED_PROTOCOLS.includes(parsed.protocol as 'http:' | 'https:')) {
    throw new Error(URL_CONFIG.ERRORS.INVALID_PROTOCOL);
  }

  // Reject private/local IPs to prevent SSRF attacks
  const isPrivate = URL_CONFIG.PRIVATE_IP_PATTERNS.some((pattern) => pattern.test(url));
  if (isPrivate) {
    throw new Error(URL_CONFIG.ERRORS.PRIVATE_URL);
  }
}

// Exported as an object to group related utilities under a single namespace
export const UrlUtils = {
  generateShortCode,
  validateUrl,
};
