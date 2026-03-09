import { describe, it, expect, vi } from 'vitest';
import { DeleteUrl } from '../../application/delete-url.use-case';
import { Url } from '../../domain/url.entity';
import { createMockRepo } from '../helpers/mock-repo';

// Actualizado: usa createMockRepo compartido

describe('DeleteUrl', () => {
  it('deletes an existing URL', async () => {
    const fakeUrl = Url.restore({
      id: 'abc-123',
      originalUrl: 'https://example.com',
      shortCode: 'aBcDeFg',
      clicks: 0,
      createdAt: new Date(),
    });

    const mockRepo = createMockRepo({
      findById: vi.fn().mockResolvedValue(fakeUrl),
    });

    await new DeleteUrl(mockRepo).execute('abc-123');

    expect(mockRepo.delete).toHaveBeenCalledWith('abc-123');
  });

  it('throws if URL does not exist without calling delete', async () => {
    const mockRepo = createMockRepo({
      findById: vi.fn().mockResolvedValue(null),
    });

    await expect(
      new DeleteUrl(mockRepo).execute('no-exist'),
    ).rejects.toThrow('URL not found');
    expect(mockRepo.delete).not.toHaveBeenCalled();
  });
});
