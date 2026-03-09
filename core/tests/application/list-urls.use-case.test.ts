import { describe, expect, it, vi } from 'vitest';

import { ListUrls } from '../../application/list-urls.use-case';
import { Url } from '../../domain/url.entity';
import { createMockRepo } from '../helpers/mock-repo';

const createFakeUrls = (count: number) =>
  Array.from({ length: count }, (_, i) =>
    Url.restore({
      id: `id-${i}`,
      originalUrl: `https://example-${i}.com`,
      shortCode: `code${i}xx`,
      clicks: i,
      createdAt: new Date(),
    }),
  );

describe('ListUrls', () => {
  it('returns paginated URLs with correct totalPages', async () => {
    const mockRepo = createMockRepo({
      findAll: vi.fn().mockResolvedValue({ urls: createFakeUrls(5), total: 12 }),
    });

    const result = await new ListUrls(mockRepo).execute({ page: 1, limit: 5 });

    expect(result.urls).toHaveLength(5);
    expect(result.total).toBe(12);
    expect(result.page).toBe(1);
    expect(result.totalPages).toBe(3);
  });

  it('uses defaults when no input is provided', async () => {
    const mockFindAll = vi.fn().mockResolvedValue({ urls: [], total: 0 });
    const mockRepo = createMockRepo({ findAll: mockFindAll });

    const result = await new ListUrls(mockRepo).execute();

    expect(mockFindAll).toHaveBeenCalledWith({ page: 1, limit: 5 });
    expect(result.page).toBe(1);
    expect(result.totalPages).toBe(0);
  });

  it('maps URL entities to UrlSummary DTOs', async () => {
    const mockRepo = createMockRepo({
      findAll: vi.fn().mockResolvedValue({ urls: createFakeUrls(1), total: 1 }),
    });

    const result = await new ListUrls(mockRepo).execute({ page: 1 });

    expect(result.urls[0]).toEqual({
      id: 'id-0',
      shortCode: 'code0xx',
      originalUrl: 'https://example-0.com',
      clicks: 0,
      createdAt: expect.any(Date),
    });
  });
});
