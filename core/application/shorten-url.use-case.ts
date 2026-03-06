import { Url } from '../domain/url.entity';

import type { UrlRepository } from '../domain/url.repository';
import type { ShortenUrlInput, ShortenUrlOutput } from './types/url.dto';

export class ShortenUrl {
  constructor(private repo: UrlRepository) {}

  async execute(input: ShortenUrlInput): Promise<ShortenUrlOutput> {
    const url = Url.create(input.url);

    await this.repo.save(url);

    return {
      id: url.id,
      shortCode: url.shortCode,
      originalUrl: url.originalUrl,
    };
  }
}
