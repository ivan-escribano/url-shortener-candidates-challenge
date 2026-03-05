// Creado — contract that any URL repository must fulfill
// This interface defines WHAT can be done with URLs in the DB,
// without knowing HOW it's done (Prisma, MongoDB, in-memory, etc.)
import type { Url } from './Url.interface';

export interface IUrlRepository {
  // Find a single URL by its short code (e.g. "aB3xKp2")
  // Returns null if no match is found
  findByCode(shortCode: string): Promise<Url | null>;

  // Save a new short URL to the database
  // Returns the full saved entity (with id, createdAt, etc.)
  create(originalUrl: string, shortCode: string): Promise<Url>;

  // Add 1 to the click counter every time someone visits the short link
  incrementClicks(shortCode: string): Promise<void>;

  // Get all URLs ordered by creation date (newest first)
  findAll(): Promise<Url[]>;
}
