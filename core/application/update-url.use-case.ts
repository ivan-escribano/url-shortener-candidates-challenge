import type { UrlRepository } from '../domain/url.repository';
import type { UpdateUrlInput } from './types/url.dto';

export class UpdateUrl {
  constructor(private repo: UrlRepository) {}

  async execute(input: UpdateUrlInput): Promise<void> {
    const url = await this.repo.findById(input.id);

    if (!url) throw new Error('URL not found');

    url.updateOriginalUrl(input.originalUrl);

    await this.repo.save(url);
  }
}
