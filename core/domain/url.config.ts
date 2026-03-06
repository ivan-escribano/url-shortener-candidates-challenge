export const URL_CONFIG = {
  ALPHABET: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  CODE_LENGTH: 7,
  MAX_URL_LENGTH: 2048,
  ALLOWED_PROTOCOLS: ['http:', 'https:'],
  PRIVATE_IP_PATTERNS: [/^localhost$/i, /^127\./, /^10\./, /^192\.168\./, /^172\.(1[6-9]|2\d|3[01])\./],
};

export const URL_ERRORS = {
  URL_REQUIRED: 'URL is required',
  URL_TOO_LONG: 'URL must be 2048 characters or less',
  INVALID_FORMAT: 'Invalid URL format',
  INVALID_PROTOCOL: 'Only http and https URLs are allowed',
  PRIVATE_URL: 'Private and local URLs are not allowed',
};
