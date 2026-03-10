# Submission

> For the full technical documentation, architecture diagrams, setup instructions, and project structure, please refer to the [README.md](./README.md).

## What I Did

Transformed a broken prototype (2-char collision-prone codes, in-memory storage, no validation, unusable UI) into a production-ready URL shortener with clean architecture, real persistence, and full test coverage.

### Architecture & Structure

- Full restructure from a spaghetti monolith to DDD with 4 layers (domain → application → infrastructure → presentation)
- `core/` as a standalone package with pure TypeScript, zero framework dependencies
- Entity with self-validation (SSRF protection, protocol check, max length, private IPs)
- Zod for input validation at the presentation layer (form data)

### Persistence

- Migrated from in-memory storage to PostgreSQL with Prisma 6
- Added pagination, URL update, and URL deletion with pre-delete verification

### Security

- IP-based rate limiting (20 req/min in production)
- URL validation: format, protocol, length, private IPs (SSRF prevention)
- Helmet security headers in entry server

### UI/UX

- Full redesign with shadcn/ui + Tailwind CSS
- UI/UX designed beforehand in Figma
- Inline CRUD (edit, delete with confirmation dialog)
- Loading states, visual error handling, responsive design
- Separation of concerns: single-responsibility components, hooks for state, config for constants, isolated sub-components, loaders and actions in separate files

### Testing (46 tests)

- Unit: 18 entity tests (validations, edge cases, `it.each` for private IPs)
- Unit: 11 use case tests (with shared `createMockRepo` factory)
- Integration: 12 tests (5 middleware + 7 components with Testing Library)
- E2E: 5 Playwright tests (shorten flow + full CRUD flow)

### Code Quality

- ESLint + Prettier with `prettier-plugin-tailwindcss` for automatic class sorting
- Kebab-case naming convention across all files

## What I Would Do With More Time

### Features

- Collision detection on short codes (verify uniqueness before saving)
- URL expiration with configurable TTL
- QR code generation for each short URL
- Bulk shortening (multiple URLs at once)

### Auth & Ownership

- User authentication (login/register)
- URL ownership each user only sees their own URLs

### Infrastructure

- Deployment to a cloud environment (AWS/GCP/Azure)
- Redis caching layer for faster redirects (not needed at this scale would be overengineering, but worth considering for high-traffic scenarios)

## AI Usage

**Tools:** Claude Code (Anthropic CLI), Stitch (Google) for Figma design.

**Example prompts:**

1. **Specs**:Analyzed the existing repo and combined it with my own notes to generate a structured specs.md with functional requirements, non-functional requirements, and edge cases.

   > "Based on my notes and all the information from this repo, generate a specs.md file with: what to build (summary), functional requirements, non-functional requirements, and edge cases."

2. **Planning**:Used the specs as input to prioritize work within the time constraint using MoSCoW.

   > "Based on the specs.md, based on my own notes, and based on the time given, using the MoSCoW framework generate me a plan to implement in 2-3 hours of work: MUST, SHOULD, COULD, NOT NEEDED / EXTRA. Output: plan.md"

3. **Design**:Fed the specs, plan, my chosen color palette, and a hand-drawn sketch mock into Stitch (Google) to generate a minimalist UI in Figma.

   > "Based on the specs.md + plan.md + my own notes, based on the palette I chose, and based on the sketch mock I gave you, generate me a minimalist design for the app."

4. **Domain**:Reviewed the core package implementation and asked for DDD improvements with a clear constraint: no overengineering.

   > "Given this part of the core folder, how can I improve the implementation of DDD without overengineering?"

5. **Application**:Same approach for the web layer, focusing on SOLID principles and separation of concerns.

   > "Given the app/web folder, how can I improve and apply SOLID principles better here?"

6. **Testing**:Used the full codebase context to identify which tests would provide the most value across unit, integration, and E2E.
   > "Based on all the implementations I did, what are the most important unit tests, integration tests, and E2E tests?"

**Why this approach matters:** Working with AI through a spec driven development workflow (specs → plan → design → implement → test) produces far better results than jumping straight into code generation. When the AI has structured context, requirements, constraints, priorities its output is focused and aligned with the actual goal. The specs become the single source of truth that guides every step.

## Feedback

I really like Kabilio's approach: building something with the tools you use in your day to day, following the way you actually do things at the company. Not some kind of test that doesn't match the role, like the typical LeetCode exercises "do a binary search in 15 minutes" which tell you very little about whether someone can actually build software. I think this approach is much better for seeing if a candidate can adopt the technologies you're using, the architecture you follow, and build something meaningful that shows they can do the job at your company.

Plus, doing it without the pressure of 3 people watching your every step, and encouraging the use of the tools you rely on every day VS Code, GitHub Copilot, Claude Code, Stitch, Figma all the tools a software engineer needs to build good software.
