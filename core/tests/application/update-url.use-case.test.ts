import { describe, expect, it, vi } from 'vitest';

import { UpdateUrl } from '../../application/update-url.use-case';
import { Url } from '../../domain/url.entity';
import { createMockRepo } from '../helpers/mock-repo';

describe('UpdateUrl', () => {
  it('finds URL, updates originalUrl, and saves', async () => {
    const fakeUrl = Url.restore({
      id: 'abc-123',
      originalUrl: 'https://old.com',
      shortCode: 'aBcDeFg',
      clicks: 5,
      createdAt: new Date(),
    });

    const mockRepo = createMockRepo({
      findById: vi.fn().mockResolvedValue(fakeUrl),
    });

    await new UpdateUrl(mockRepo).execute({ id: 'abc-123', originalUrl: 'https://new.com' });

    expect(fakeUrl.originalUrl).toBe('https://new.com');
    expect(mockRepo.save).toHaveBeenCalledWith(fakeUrl);
  });

  it('throws if id does not exist without calling save', async () => {
    const mockRepo = createMockRepo({
      findById: vi.fn().mockResolvedValue(null),
    });

    await expect(new UpdateUrl(mockRepo).execute({ id: 'no-exist', originalUrl: 'https://new.com' })).rejects.toThrow('URL not found');
    expect(mockRepo.save).not.toHaveBeenCalled();
  });
});
