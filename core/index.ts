// Actualizado — single barrel export for @url-shortener/core
export { Url } from './domain/url.entity';
export type { UrlRepository } from './domain/url-repository.port';

export { ShortenUrl } from './application/shorten-url.use-case';
export type { ShortenUrlInput, ShortenUrlOutput } from './application/shorten-url.use-case';

export { RedirectUrl } from './application/redirect-url.use-case';
export type { RedirectUrlOutput } from './application/redirect-url.use-case';

export { ListUrls } from './application/list-urls.use-case';
export type { UrlSummary } from './application/list-urls.use-case';
