// Creado — RedirectUrl use case
// Single responsibility: find a URL by code, register the click, return the original URL

import type { UrlRepository } from '../domain/url-repository.port';

export interface RedirectUrlOutput {
  originalUrl: string;
}

export class RedirectUrl {
  constructor(private repo: UrlRepository) {}

  async execute(code: string): Promise<RedirectUrlOutput> {
    const url = await this.repo.findByCode(code);
    if (!url) throw new Error('Short URL not found');

    // Business rule lives in the entity — the use case just orchestrates
    url.registerClick();
    await this.repo.save(url);

    return { originalUrl: url.originalUrl };
  }
}
