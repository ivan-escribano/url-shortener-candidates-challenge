// Creado — PrismaClient singleton
// Ensures only one DB connection is created, even with hot reload in development

import { PrismaClient } from '@prisma/client';

// Extend globalThis to store the prisma instance across hot reloads
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// Reuse existing instance in development, create new one in production
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
