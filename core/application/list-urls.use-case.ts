// Creado — ListUrls use case
// Single responsibility: retrieve all shortened URLs with their stats

import type { UrlRepository } from '../domain/url-repository.port';

export interface UrlSummary {
  id: string;
  shortCode: string;
  originalUrl: string;
  clicks: number;
  createdAt: Date;
}

export class ListUrls {
  constructor(private repo: UrlRepository) {}

  async execute(): Promise<UrlSummary[]> {
    const urls = await this.repo.findAll();

    return urls.map((url) => ({
      id: url.id,
      shortCode: url.shortCode,
      originalUrl: url.originalUrl,
      clicks: url.clicks,
      createdAt: url.createdAt,
    }));
  }
}
