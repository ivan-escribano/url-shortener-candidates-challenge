import type { EntryContext } from 'react-router';
import { ServerRouter } from 'react-router';
import { isbot } from 'isbot';
import { renderToReadableStream } from 'react-dom/server';

import { applyRateLimit } from '~/server/middleware/rate-limit.middleware';
import { applySecurityHeaders } from '~/server/middleware/security-headers.middleware';

const ABORT_DELAY = 5_000;

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
) {
  const rateLimitResponse = applyRateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  applySecurityHeaders(responseHeaders);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), ABORT_DELAY);

  const body = await renderToReadableStream(
    <ServerRouter context={routerContext} url={request.url} />,
    {
      signal: controller.signal,
      onError(error: unknown) {
        if (!controller.signal.aborted) {
          console.error(error);
        }
        responseStatusCode = 500;
      },
    },
  );

  clearTimeout(timeoutId);

  if (isbot(request.headers.get('user-agent') ?? '')) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');

  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
