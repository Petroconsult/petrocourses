# PetroCourses – Full-Stack Training & Consultancy Platform

PetroCourses is a scalable, domain-driven full-stack platform built with **Next.js App Router**, **Prisma**, and a **modular service architecture**.

The platform delivers professional **training programs**, **consultancy services**, **advisory sessions**, and a **personalized user dashboard**, supported by a **unified payments layer** and modern content delivery via **Sanity CMS**.

---

## Table of Contents

1. Introduction  
2. Platform Capabilities  
3. Technology Stack  
## PetroCourses — INTRODUCTION

PetroCourses implements training, enrollment, payments, and certification with a strong separation between content and credentialing authority. The repository is organized for maintainability and auditability.

This README is intentionally focused: what the project contains, how to work with it locally, tests and migration helpers, and a clear map of source folders.

---

## Project summary

- Content (training courses, lessons, modules) is modeled by `Course` and related artifacts and lives in the training modules and UI.
- Certification is modeled via `Pathway`, `Level`, `CertificationPolicy`, and immutable `Certificate` records in Prisma.
- Enrollment is a first-class lifecycle entity with entitlement and revocation fields.
- Payment logic lives in `src/modules/payments` and is orchestrated by `src/orchestrators/payment.orchestrator.ts`.

---

## Architecture sanity checklist (current state)

- training: content-only — `Course` and UI components present.
- enrollment: lifecycle modeled; repo and stubs present.
- certification: separate models for Pathway/Level/Certificate; immutable certificates.
- payments: `PaymentService` exists; orchestrator stub implemented (needs gateway integration).
- identity/corporate: org & seat models present (corporate features marked phased/partial).

Orchestrators: payment → enrollment → certification orchestrators added as deterministic, logged stubs in `src/orchestrators/`.

Policy engine: deterministic evaluator stub at `src/modules/certification/policy.evaluator.ts` — intended to be replaced by a full rules evaluator.

Database: `prisma/schema.prisma` contains Pathway, Level, Enrollment, Certificate and CertificationPolicy models. Certificate is designed to be immutable.

Migration helpers: `scripts/map-legacy-courses.ts` provides a dry-run discovery of legacy `Course` items without `levelId`.

---

## Directory map (source-focused)

Top-level important folders and what they contain:

```
prisma/                 # schema.prisma, migrations, seed
sanity/                 # CMS configuration (content schemas)
src/
  app/                  # Next.js App Router (UI pages, thin API endpoints)
  components/           # UI components (presentation only)
  domains/               # Business authority (training, enrollment, certification)
  orchestrators/         # Cross-domain workflows (payment -> enrollment -> certification)
  modules/               # Domain services and business logic (payments, training services)
  server/                # Server Actions (authenticated mutations)
  integrations/          # Adapters for external services (Stripe, UniPay, Sanity, HubSpot)
  lib/                   # Utilities (logger, db helpers)
tests/                  # Integration and e2e tests
scripts/                # Migration and helper scripts
```

```

Representative directory structure (developer-friendly view)

```
prisma/                 # schema.prisma, migrations, seed
public/                 # Static assets (images, downloads)
sanity/                 # CMS configuration (content schemas)
scripts/                # Migration and helper scripts

src/
  app/                  # Next.js App Router (UI pages, thin API endpoints)
    (home)/             # Home pages
      about/
      contact/
    advisory/           # Advisory booking and services pages
      book/
      services/
    api/                # API endpoints
      auth/
      bookings/
      chatbot/
      courses/
      crm/
      payments/
      webhooks/
    consultancy/        # Consultancy booking and services pages
      book/
      services/
    dashboard/          # Dashboard pages for users
      bookings/
      courses/
      profile/
    insights/           # Insights pages
      [slug]/
    resources/          # Resource pages
      [slug]/
    training/           # Training related pages
      courses/
      enroll/
  components/           # UI components (presentation only)
    tests/
    chatbot/
    courses/
    forms/
    layout/
    shared/
    ui/
  data/                 # Static or seed data
  domains/              # Business authority (training, enrollment, certification)
    certification/
    corporate/
    enrollment/
    identity/
    payments/
    training/
  hooks/                # React hooks
  integrations/         # Adapters for external services (Stripe, UniPay, Sanity, HubSpot)
  lib/                  # Utilities (logger, db helpers, security, email)
    tests/
    db/
    email/
    security/
    utils/
  modules/              # Domain services and business logic (payments, training services)
    advisory/
    certification/
    consultancy/
    payments/
    training/
  orchestrators/        # Cross-domain workflows (payment -> enrollment -> certification)
    tests/
  server/               # Server Actions (authenticated mutations)
    tests/
  types/                # TypeScript types

utils/                  # Generic utilities

tests/                  # Integration and e2e tests
  e2e/
  fixtures/
  integration/
  setup/

```

Files of particular interest:

- `prisma/schema.prisma` — canonical data model
- `src/orchestrators/*` — orchestrators coordinating flows
- `src/domains/certification/*` — certificate repo and models
- `src/modules/payments/*` — payment initiation/processing logic

---

## How to run (developer)

Prerequisites

- Node.js 18+ (LTS recommended)
- npm or pnpm
- Postgres instance for Prisma (only required for DB ops)

Install dependencies

```bash
pnpm install
# or
npm install
```

Start dev server

```bash
pnpm dev
# or
npm run dev
```

Run tests

```bash
npm test
# or run unit-only
npm run test:unit
```

Prisma client

```bash
npm run prisma:generate
```

---

## Migrations & mapping helpers

- Dry-run mapping script: `scripts/map-legacy-courses.ts` — lists `Course` rows with no `levelId` for inspection.

Run dry-run (example)

```bash
DATABASE_URL="postgresql://user:pass@localhost:5432/db" node scripts/map-legacy-courses.js
```

To apply mappings you should extend the script to create `Level` rows and update `Course.levelId` in a transactional and tested migration on staging first.

---

## Implementations present

- `src/lib/logger.ts` — simple structured logger used by orchestrators and tests.
- `src/orchestrators/payment.orchestrator.ts` — orchestrates payment initiation + processing (dev stub).
- `src/orchestrators/enrollment.orchestrator.ts` — idempotent enrollment creation stub.
- `src/orchestrators/certification.orchestrator.ts` — policy-based issuance orchestration stub.
- `src/modules/certification/policy.evaluator.ts` — deterministic policy evaluator stub.
- `src/orchestrators/__tests__/orchestrators.test.ts` — vitest unit test covering the payment→enroll→cert flow.
- `scripts/map-legacy-courses.ts` — migration dry-run helper.

---

## Tests & verification guidance

Key verification areas before any release:

- Unit tests for policy logic (grant/deny) and certificate immutability.
- Integration tests for payment webhooks → entitlement granting and rollback.
- E2E flow: enroll → complete → certificate issuance.
- Migration smoke test: ensure legacy `Course` → `Level` mapping preserves enrollments and certificates.

Run the full suite with:

```bash
npm test
```

## License

See the `LICENSE` file in the repository root.
