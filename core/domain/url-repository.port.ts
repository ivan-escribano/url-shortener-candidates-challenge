// Creado — UrlRepository port (contract)
// Defines what the database layer must be able to do — no implementation details here

import type { Url } from './url.entity';

export interface UrlRepository {
  // Persists a URL — handles both insert and update (upsert)
  save(url: Url): Promise<void>;
  // Returns the URL matching the short code, or null if not found
  findByCode(code: string): Promise<Url | null>;
  // Returns all URLs ordered by creation date descending
  findAll(): Promise<Url[]>;
}
