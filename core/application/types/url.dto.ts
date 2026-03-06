export interface ShortenUrlInput {
  url: string;
}

export interface ShortenUrlOutput {
  id: string;
  shortCode: string;
  originalUrl: string;
}

export interface RedirectUrlOutput {
  originalUrl: string;
}

export interface UpdateUrlInput {
  id: string;
  originalUrl: string;
}

export interface ListUrlsInput {
  page?: number;
  limit?: number;
}

export interface UrlSummary {
  id: string;
  shortCode: string;
  originalUrl: string;
  clicks: number;
  createdAt: Date;
}

export interface ListUrlsOutput {
  urls: UrlSummary[];
  total: number;
  page: number;
  totalPages: number;
}
