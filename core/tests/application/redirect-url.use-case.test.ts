import { describe, expect, it, vi } from 'vitest';

import { RedirectUrl } from '../../application/redirect-url.use-case';
import { Url } from '../../domain/url.entity';
import { createMockRepo } from '../helpers/mock-repo';

describe('RedirectUrl', () => {
  it('finds URL, registers click, saves, and returns originalUrl', async () => {
    const fakeUrl = Url.restore({
      id: '1',
      originalUrl: 'https://example.com',
      shortCode: 'aBcDeFg',
      clicks: 0,
      createdAt: new Date(),
    });

    const mockRepo = createMockRepo({
      findByCode: vi.fn().mockResolvedValue(fakeUrl),
    });

    const result = await new RedirectUrl(mockRepo).execute('aBcDeFg');

    expect(result.originalUrl).toBe('https://example.com');
    expect(fakeUrl.clicks).toBe(1);
    expect(mockRepo.save).toHaveBeenCalledWith(fakeUrl);
  });

  it('throws if code does not exist', async () => {
    const mockRepo = createMockRepo({
      findByCode: vi.fn().mockResolvedValue(null),
    });

    await expect(new RedirectUrl(mockRepo).execute('noExist')).rejects.toThrow('Short URL not found');
  });
});
