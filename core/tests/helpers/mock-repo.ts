import { vi } from 'vitest';

import type { UrlRepository } from '../../domain/url.repository';

export const createMockRepo = (overrides: Partial<UrlRepository> = {}): UrlRepository => ({
  save: vi.fn(),
  findByCode: vi.fn(),
  findById: vi.fn(),
  findAll: vi.fn(),
  delete: vi.fn(),
  ...overrides,
});
