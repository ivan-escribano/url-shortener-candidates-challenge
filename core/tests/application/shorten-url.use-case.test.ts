import { describe, expect, it } from 'vitest';

import { ShortenUrl } from '../../application/shorten-url.use-case';
import { createMockRepo } from '../helpers/mock-repo';

describe('ShortenUrl', () => {
  it('creates a URL and calls repo.save()', async () => {
    const mockRepo = createMockRepo();
    const result = await new ShortenUrl(mockRepo).execute({ url: 'https://example.com' });

    expect(mockRepo.save).toHaveBeenCalledOnce();
    expect(result.id).toBeDefined();
    expect(result.shortCode).toHaveLength(7);
    expect(result.originalUrl).toBe('https://example.com');
  });

  it('throws on invalid URL without calling save', async () => {
    const mockRepo = createMockRepo();

    await expect(new ShortenUrl(mockRepo).execute({ url: 'not-valid' })).rejects.toThrow();
    expect(mockRepo.save).not.toHaveBeenCalled();
  });
});
