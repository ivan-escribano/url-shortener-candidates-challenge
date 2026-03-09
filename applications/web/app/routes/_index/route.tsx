import { useActionData, useNavigation } from 'react-router';

import { ListUrls } from '@url-shortener/core';

import { PrismaUrlRepository } from '~/server/prisma/url.repository';
import { handleDelete, handleShorten, handleUpdate } from './actions';
import { ShortenedUrlResult } from '~/components/custom/shortened-url-result/shortened-url-result.component';
import { UrlForm } from '~/components/custom/url-form/url-form.component';
import { UrlList } from '~/components/custom/url-list/url-list.component';

import type { Route } from './+types/route';

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);

  const page = Number(url.searchParams.get('page')) || 1;

  return await new ListUrls(PrismaUrlRepository).execute({ page });
}

export async function action({ request }: Route.ActionArgs) {
  try {
    const formData = await request.formData();

    const intent = formData.get('intent');

    if (intent === 'delete') return await handleDelete(formData);

    if (intent === 'update') return await handleUpdate(formData);

    return await handleShorten(formData);
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Something went wrong' };
  }
}

export function meta({}: Route.MetaArgs) {
  return [{ title: 'URL Shortener' }, { name: 'description', content: 'Shorten your URLs quickly and easily' }];
}

export default function Index({ loaderData }: Route.ComponentProps) {
  const { urls, total, page, totalPages } = loaderData;

  const actionData = useActionData<typeof action>();
  const isSubmitting = useNavigation().state === 'submitting';

  const shortCode = actionData && 'shortCode' in actionData ? actionData.shortCode : undefined;
  const error = actionData && 'error' in actionData ? actionData.error : undefined;

  return (
    <main className="bg-background relative min-h-screen px-4 py-10 md:px-6">
      <div className="absolute inset-0 bg-[url('/background.png')] bg-cover bg-center bg-no-repeat opacity-10" />

      <div className="relative mx-auto flex max-w-4xl flex-col gap-8">
        <div className="text-center">
          <h1 className="text-3xl leading-tight font-semibold">
            Shorten your links,
            <br />
            <span className="text-primary">track your reach</span>
          </h1>

          <p className="text-muted-foreground mt-2 text-sm">Create concise, powerful links and get detailed insights on every click.</p>
        </div>

        <UrlForm isSubmitting={isSubmitting} error={error} />

        {shortCode && <ShortenedUrlResult shortCode={shortCode} />}

        <UrlList urls={urls} total={total} page={page} totalPages={totalPages} />
      </div>
    </main>
  );
}
