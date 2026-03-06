import type { UrlRepository } from '../domain/url.repository';

export class DeleteUrl {
  constructor(private repo: UrlRepository) {}

  async execute(id: string): Promise<void> {
    const url = await this.repo.findById(id);

    if (!url) throw new Error('URL not found');

    await this.repo.delete(id);
  }
}
