import { Url } from '@url-shortener/core';

import { prisma } from './db.config';

import type { FindAllOptions, FindAllResult, UrlRepository } from '@url-shortener/core';

export const PrismaUrlRepository: UrlRepository = {
  async save(url: Url): Promise<void> {
    await prisma.url.upsert({
      where: { id: url.id },

      update: {
        originalUrl: url.originalUrl,
        clicks: url.clicks,
      },

      create: {
        id: url.id,
        originalUrl: url.originalUrl,
        shortCode: url.shortCode,
        clicks: url.clicks,
        createdAt: url.createdAt,
      },
    });
  },

  async findByCode(code: string): Promise<Url | null> {
    const record = await prisma.url.findUnique({ where: { shortCode: code } });

    if (!record) return null;

    return Url.restore(record);
  },

  async findById(id: string): Promise<Url | null> {
    const record = await prisma.url.findUnique({ where: { id } });

    if (!record) return null;

    return Url.restore(record);
  },

  async findAll(options: FindAllOptions): Promise<FindAllResult> {
    const { page, limit } = options;

    const skip = (page - 1) * limit;

    const [records, total] = await Promise.all([
      prisma.url.findMany({
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),

      prisma.url.count(),
    ]);

    return {
      urls: records.map((record) => Url.restore(record)),
      total,
    };
  },

  async delete(id: string): Promise<void> {
    await prisma.url.delete({ where: { id } });
  },
};
