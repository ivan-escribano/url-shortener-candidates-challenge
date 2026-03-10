# URL Shortener

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router_v7-CA4245?logo=reactrouter&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-2EAD33?logo=playwright&logoColor=white)

A production-ready URL shortener built with DDD and clean architecture. Shorten links, track clicks, and manage URLs with a full CRUD interface.

<!-- DEMO -->

## Tech Stack

| Layer          | Technology                                                   | What it does                                                  |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------------------- |
| **Language**   | [TypeScript](https://www.typescriptlang.org/)                | Typed JavaScript catches errors at compile time               |
| **Frontend**   | [React](https://react.dev/)                                  | UI library for building component-based interfaces            |
| **Framework**  | [Remix / React Router v7](https://reactrouter.com/)          | Full-stack framework routing, loaders, actions, and SSR       |
| **Styling**    | [Tailwind CSS](https://tailwindcss.com/)                     | Utility-first CSS for rapid UI development                    |
| **Components** | [shadcn/ui](https://ui.shadcn.com/)                          | Pre-built accessible components (Dialog, Table, Button, etc.) |
| **Validation** | [Zod](https://zod.dev/)                                      | Schema validation for form data at the presentation layer     |
| **Database**   | [PostgreSQL](https://www.postgresql.org/)                    | Relational database for persistent URL storage                |
| **ORM**        | [Prisma](https://www.prisma.io/)                             | Type-safe database client with migrations                     |
| **Build**      | [Vite](https://vite.dev/)                                    | Fast dev server with hot module replacement                   |
| **Monorepo**   | [Turborepo](https://turbo.build/) + [pnpm](https://pnpm.io/) | Parallel task runner + disk-efficient package manager         |
| **Unit Test**  | [Vitest](https://vitest.dev/)                                | Fast test runner for unit and integration tests               |
| **E2E Test**   | [Playwright](https://playwright.dev/)                        | Browser automation for end-to-end testing                     |
| **Infra**      | [Docker](https://www.docker.com/)                            | Containerized app + database with `docker-compose up`         |

## Architecture

### Project Structure

```
url-shortener/
├── core/                          # Pure TypeScript zero framework dependencies
│   ├── domain/                    # Entity, config, repository interface
│   ├── application/               # Use cases (one per action)
│   └── tests/                     # Unit tests
│
├── applications/web/              # Remix app
│   ├── app/routes/                # Loaders, actions, components (presentation)
│   ├── app/server/                # Prisma repo, middleware (infrastructure)
│   ├── tests/                     # Integration tests
│   └── e2e/                       # Playwright E2E tests
│
└── docker-compose.yml
```

### Request Flows

**Create** - User submits a URL → entity validates and generates a unique short code → saved to DB.

<!-- TODO: add create-flow diagram -->

**Read** - Page loads with paginated URL list. Short link visits trigger a 302 redirect and increment the click counter.

<!-- TODO: add read-flow diagram -->

**Update** - User edits a URL inline → entity re-validates the new URL (same rules: format, protocol, SSRF) → saved to DB.

<!-- TODO: add update-flow diagram -->

**Delete** - User clicks delete → confirmation dialog → server verifies the URL exists before removing it.

<!-- TODO: add delete-flow diagram -->

## Design

### Figma

<!-- TODO: add Figma screenshot or link -->

### Final Result

<!-- TODO: add app screenshot -->

## Getting Started

### Docker (recommended)

The fastest way to run everything no local dependencies needed.

```bash
docker-compose up --build
```

Open `http://localhost:3000`

### Local Development

**Prerequisites:** Node.js, pnpm, PostgreSQL running locally.

```bash
pnpm install
cp .env.example .env        # configure your database URL
pnpm dev
```

Open `http://localhost:5173`

### Environment Variables

| Variable       | Description                         | Default                                                          |
| -------------- | ----------------------------------- | ---------------------------------------------------------------- |
| `NODE_ENV`     | `development` or `production`       | `development`                                                    |
| `PUBLIC_URL`   | Base URL for generating short links | `http://localhost:5173` (dev) / `http://localhost:3000` (docker) |
| `DATABASE_URL` | PostgreSQL connection string        | `postgresql://postgres:postgres@localhost:5432/urlshortener`     |

## Scripts

| Command                      | Description                          |
| ---------------------------- | ------------------------------------ |
| `pnpm dev`                   | Start dev server (localhost:5173)    |
| `pnpm build`                 | Build all packages for production    |
| `pnpm test`                  | Run all unit + integration tests     |
| `pnpm lint`                  | Run ESLint across all packages       |
| `pnpm format`                | Format all files with Prettier       |
| `pnpm typecheck`             | Run TypeScript type checking         |
| `pnpm --filter core test`    | Run only core tests (entity + use cases) |
| `pnpm --filter web test`     | Run only web tests (middleware + components) |
| `pnpm --filter web test:e2e` | Run Playwright E2E tests             |

## Testing

| Type            | Count | Command                      |
| --------------- | ----- | ---------------------------- |
| **Unit**        | 29    | `pnpm --filter core test`    |
| **Integration** | 12    | `pnpm --filter web test`     |
| **E2E**         | 5     | `pnpm --filter web test:e2e` |
| **All**         | 46    | `pnpm test`                  |

<!-- TODO: add screenshot of tests passing -->

## Project Structure

```
url-shortener/
│
├── core/                                    # Domain + Application (pure TypeScript)
│   ├── domain/
│   │   ├── url.entity.ts                    # Entity: create, restore, validate, registerClick, updateUrl
│   │   ├── url.config.ts                    # Business constants: alphabet, code length, allowed protocols, private IPs
│   │   └── url.repository.ts                # Port: repository interface (save, find, delete)
│   ├── application/
│   │   ├── shorten-url.use-case.ts          # Create a short URL
│   │   ├── redirect-url.use-case.ts         # Resolve short code + count click
│   │   ├── update-url.use-case.ts           # Edit original URL
│   │   ├── delete-url.use-case.ts           # Remove a URL
│   │   ├── list-urls.use-case.ts            # List URLs with pagination
│   │   └── types/url.dto.ts                 # Input/Output interfaces for all use cases
│   ├── tests/
│   │   ├── domain/url.entity.test.ts        # 18 entity tests
│   │   ├── application/*.test.ts            # 11 use case tests
│   │   └── helpers/mock-repo.ts             # Shared mock factory
│   └── index.ts                             # Public API barrel export
│
├── applications/web/                        # Remix app (presentation + infrastructure)
│   ├── app/
│   │   ├── routes/
│   │   │   ├── _index/
│   │   │   │   ├── route.tsx                # Loader (list URLs) + component
│   │   │   │   └── actions.ts               # Action handlers: shorten, update, delete
│   │   │   └── s.$code/
│   │   │       └── route.tsx                # Redirect loader (302 + click tracking)
│   │   ├── server/
│   │   │   ├── prisma/
│   │   │   │   ├── url.repository.ts        # Repository implementation (Prisma)
│   │   │   │   └── db.config.ts             # Prisma client singleton
│   │   │   └── middleware/
│   │   │       ├── rate-limit.middleware.ts  # IP-based rate limiting (20 req/min)
│   │   │       └── security-headers.middleware.ts  # Helmet-style security headers
│   │   └── components/
│   │       ├── ui/                          # shadcn/ui (auto-generated, don't touch)
│   │       └── custom/                      # App components
│   │           ├── url-form/                # Form: component + interface
│   │           ├── url-list/                # Table: component + config + interface
│   │           │   └── sub-components/
│   │           │       ├── url-row/         # Row: component + interface + hook
│   │           │       └── delete-dialog/   # Confirmation dialog: component + interface
│   │           ├── shortened-url-result/    # Result display after shortening
│   │           └── pagination/              # Pagination: component + interface + sub-components
│   ├── prisma/
│   │   └── schema.prisma                    # Database schema + migrations
│   ├── tests/
│   │   ├── middleware/*.test.ts             # 5 middleware tests
│   │   └── components/*.test.tsx            # 7 component tests
│   ├── e2e/
│   │   ├── shorten-flow.spec.ts             # 2 E2E tests (shorten + redirect)
│   │   ├── crud-flow.spec.ts                # 3 E2E tests (edit, delete, cancel)
│   │   └── helpers.ts                       # Shared E2E helper (shortenUrl)
│   └── playwright.config.ts
│
├── docker-compose.yml                       # App + PostgreSQL
├── Dockerfile
└── turbo.json                               # Turborepo task config
```

## About Me

Get to know me a little bit more:

- [SOLID-101](https://github.com/ivan-escribano/solid-101) - Open source project to learn SOLID principles the easy way
- [CV Screener AI](https://github.com/ivan-escribano/cv-screener-ai) - AI assistant that reads a pile of CVs and lets you ask questions about candidates in plain language
- [Portfolio](https://github.com/ivan-escribano/portfolio-ivan-102) - My portfolio, updated last week
- [LinkedIn](https://www.linkedin.com/in/ivan-escribano-dev/) - Where I post about software engineering and AI engineering
- [GitHub](https://github.com/ivan-escribano) - Check out my pinned projects

Thank you very much for your time and the opportunity to show my skills!
