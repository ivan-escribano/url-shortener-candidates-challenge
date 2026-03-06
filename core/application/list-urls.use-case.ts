import type { UrlRepository } from '../domain/url.repository';
import type { ListUrlsInput, ListUrlsOutput } from './types/url.dto';

export class ListUrls {
  constructor(private repo: UrlRepository) {}

  async execute(input?: ListUrlsInput): Promise<ListUrlsOutput> {
    const page = input?.page ?? 1;
    const limit = input?.limit ?? 5;

    const { urls, total } = await this.repo.findAll({ page, limit });

    return {
      urls: urls.map((url) => ({
        id: url.id,
        shortCode: url.shortCode,
        originalUrl: url.originalUrl,
        clicks: url.clicks,
        createdAt: url.createdAt,
      })),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }
}
