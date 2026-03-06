import { ExternalLink, Home, Link2Off } from 'lucide-react';
import { isRouteErrorResponse, redirect, useRouteError } from 'react-router';

import { RedirectUrl } from '@url-shortener/core';

import { PrismaUrlRepository } from '~/server/prisma/prisma-url.repository';

import type { Route } from './+types/route';

export async function loader({ params }: Route.LoaderArgs) {
  try {
    const { originalUrl } = await new RedirectUrl(PrismaUrlRepository).execute(params.code!);

    return redirect(originalUrl);
  } catch {
    throw new Response('Short URL not found', { status: 404 });
  }
}

export function ErrorBoundary() {
  const error = useRouteError();

  const is404 = isRouteErrorResponse(error) && error.status === 404;

  return (
    <main className="bg-background relative flex min-h-screen items-center justify-center px-4">
      <div className="absolute inset-0 bg-[url('/background.png')] bg-cover bg-center bg-no-repeat opacity-10" />

      <div className="relative flex max-w-md flex-col items-center gap-6 text-center">
        <div className="border-border bg-card rounded-full border p-4">
          <Link2Off className="text-destructive size-8" />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold">{is404 ? 'Link not found' : 'Something went wrong'}</h1>

          <p className="text-muted-foreground text-sm">
            {is404 ? "This short link doesn't exist or has been deleted." : 'An unexpected error occurred. Please try again later.'}
          </p>
        </div>

        <a
          href="/"
          className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors"
        >
          <Home className="size-4" />
          Back to home
        </a>

        <div className="border-border mt-4 flex flex-col items-center gap-1 border-t pt-6">
          <p className="text-muted-foreground text-xs">Built as a technical challenge for</p>

          <a
            href="https://www.kabilio.es"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary inline-flex items-center gap-1 text-sm font-medium hover:underline"
          >
            Kabilio
            <ExternalLink className="size-3" />
          </a>
        </div>
      </div>
    </main>
  );
}
