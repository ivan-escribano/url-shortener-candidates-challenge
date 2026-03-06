import type { UrlRepository } from '../domain/url.repository';
import type { RedirectUrlOutput } from './types/url.dto';

export class RedirectUrl {
  constructor(private repo: UrlRepository) {}

  async execute(code: string): Promise<RedirectUrlOutput> {
    const url = await this.repo.findByCode(code);

    if (!url) throw new Error('Short URL not found');

    url.registerClick();

    await this.repo.save(url);

    return { originalUrl: url.originalUrl };
  }
}
