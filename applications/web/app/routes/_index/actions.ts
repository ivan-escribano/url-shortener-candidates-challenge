import { DeleteUrl, ShortenUrl, UpdateUrl } from '@url-shortener/core';
import { z } from 'zod';

import { PrismaUrlRepository } from '~/server/prisma/prisma-url.repository';

const shortenSchema = z.object({
  url: z.url('Invalid URL').max(2048, 'URL is too long'),
});

const updateSchema = z.object({
  id: z.string().min(1),
  originalUrl: z.url('Invalid URL').max(2048, 'URL is too long'),
});

export async function handleShorten(formData: FormData) {
  const result = shortenSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) return { error: result.error.issues[0].message };

  const { shortCode } = await new ShortenUrl(PrismaUrlRepository).execute({ url: result.data.url });

  return { shortCode };
}

export async function handleUpdate(formData: FormData) {
  const result = updateSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) return { error: result.error.issues[0].message };

  await new UpdateUrl(PrismaUrlRepository).execute(result.data);

  return { ok: true };
}

export async function handleDelete(formData: FormData) {
  await new DeleteUrl(PrismaUrlRepository).execute(formData.get('id') as string);

  return { ok: true };
}
