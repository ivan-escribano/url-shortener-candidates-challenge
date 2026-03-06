import type { Url } from './url.entity';

export interface FindAllOptions {
  page: number;
  limit: number;
}

export interface FindAllResult {
  urls: Url[];
  total: number;
}

export interface UrlRepository {
  save(url: Url): Promise<void>;
  findByCode(code: string): Promise<Url | null>;
  findById(id: string): Promise<Url | null>;
  findAll(options: FindAllOptions): Promise<FindAllResult>;
  delete(id: string): Promise<void>;
}
