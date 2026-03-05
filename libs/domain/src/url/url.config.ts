// Actualizado — all URL domain constants grouped in a single config object
export const URL_CONFIG = {
  // Short code generation
  ALPHABET: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  CODE_LENGTH: 7,

  // Validation limits
  MAX_URL_LENGTH: 2048,

  // Allowed protocols
  ALLOWED_PROTOCOLS: ['http:', 'https:'],

  // Private IP ranges that should never be allowed as redirect targets
  PRIVATE_IP_PATTERNS: [
    /^https?:\/\/localhost/i,
    /^https?:\/\/127\./,
    /^https?:\/\/10\./,
    /^https?:\/\/192\.168\./,
    /^https?:\/\/172\.(1[6-9]|2\d|3[01])\./,
  ],

  // Validation error messages
  ERRORS: {
    URL_TOO_LONG: 'URL must be 2048 characters or less',
    INVALID_FORMAT: 'Invalid URL format',
    INVALID_PROTOCOL: 'Only http and https URLs are allowed',
    PRIVATE_URL: 'Private and local URLs are not allowed',
  },
} as const;
