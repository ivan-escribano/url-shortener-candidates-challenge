import type { UrlSummary } from '@url-shortener/core';

export interface UrlListProps {
  urls: UrlSummary[];
  total?: number;
  page?: number;
  totalPages?: number;
}
