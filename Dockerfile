FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@10.20.0 --activate
WORKDIR /app

FROM base AS dependencies
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY core/package.json ./core/
COPY applications/web/package.json ./applications/web/
RUN pnpm install --frozen-lockfile

FROM base AS build
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/core/node_modules ./core/node_modules
COPY --from=dependencies /app/applications/web/node_modules ./applications/web/node_modules
COPY . .
RUN cd applications/web && npx prisma generate
RUN pnpm build

FROM base AS production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/applications/web/node_modules ./applications/web/node_modules
COPY --from=build /app/core/node_modules ./core/node_modules
COPY --from=build /app/applications/web/build ./applications/web/build
# Updated — prisma folder is now inside applications/web
COPY --from=build /app/applications/web/prisma ./applications/web/prisma
COPY core ./core
COPY applications/web/package.json ./applications/web/
COPY core/package.json ./core/
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./

WORKDIR /app/applications/web
EXPOSE 3000
CMD ["sh", "-c", "npx prisma migrate deploy && pnpm start"]
