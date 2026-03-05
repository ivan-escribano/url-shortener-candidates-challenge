// Creado — ShortenUrl use case
// Single responsibility: validate input, create a short URL, persist it

import { Url } from '../domain/url.entity';
import type { UrlRepository } from '../domain/url-repository.port';

export interface ShortenUrlInput {
  url: string;
}

export interface ShortenUrlOutput {
  id: string;
  shortCode: string;
  originalUrl: string;
}

export class ShortenUrl {
  constructor(private repo: UrlRepository) {}

  async execute(input: ShortenUrlInput): Promise<ShortenUrlOutput> {
    // Url.create() handles all validation — throws if invalid
    const url = Url.create(input.url);
    await this.repo.save(url);

    return {
      id: url.id,
      shortCode: url.shortCode,
      originalUrl: url.originalUrl,
    };
  }
}
