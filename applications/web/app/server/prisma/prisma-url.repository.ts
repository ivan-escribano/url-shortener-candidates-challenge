// Creado — Prisma implementation of UrlRepository
// Only file that talks to the database — no business logic here

import { Url, type UrlRepository } from '@url-shortener/core';
import { prisma } from './db.config';

export const PrismaUrlRepository: UrlRepository = {
  // Upsert — handles both create (new URL) and update (click increment)
  async save(url: Url): Promise<void> {
    await prisma.url.upsert({
      where: { id: url.id },
      update: { clicks: url.clicks },
      create: {
        id: url.id,
        originalUrl: url.originalUrl,
        shortCode: url.shortCode,
        clicks: url.clicks,
        createdAt: url.createdAt,
      },
    });
  },

  // Returns a reconstituted Url entity or null if not found
  async findByCode(code: string): Promise<Url | null> {
    const record = await prisma.url.findUnique({ where: { shortCode: code } });
    if (!record) return null;
    return Url.reconstitute(record);
  },

  // Returns all URLs as reconstituted entities, newest first
  async findAll(): Promise<Url[]> {
    const records = await prisma.url.findMany({ orderBy: { createdAt: 'desc' } });
    return records.map((record) => Url.reconstitute(record));
  },
};
