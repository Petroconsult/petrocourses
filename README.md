# PetroCourses – Full-Stack Training & Consultancy Platform

PetroCourses is a scalable, domain-driven full-stack platform built with **Next.js App Router**, **Prisma**, and a **modular service architecture**.

The platform delivers professional **training programs**, **consultancy services**, **advisory sessions**, and a **personalized user dashboard**, supported by a **unified payments layer** and modern content delivery via **Sanity CMS**.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Project Summary](#project-summary)
3. [Technology Stack](#technology-stack)
4. [Architecture Overview](#architecture-overview)
5. [Directory Structure](#directory-structure)
6. [Getting Started](#getting-started)
7. [Development Workflow](#development-workflow)
8. [Testing](#testing)
9. [Migrations & Helpers](#migrations--helpers)
10. [License](#license)

---

## Introduction

PetroCourses implements training, enrollment, payments, and certification with a strong separation between content and credentialing authority. The repository is organized for maintainability and auditability.

This README provides:
- What the project contains
- How to work with it locally
- Test and migration helpers
- A clear map of source folders

---

## Project Summary

### Core Components

- **Content Management**: Training courses, lessons, and modules modeled by `Course` and related artifacts
- **Certification System**: Modeled via `Pathway`, `Level`, `CertificationPolicy`, and immutable `Certificate` records
- **Enrollment Lifecycle**: First-class entity with entitlement and revocation fields
- **Payment Processing**: Orchestrated by payment services in `src/modules/payments` and `src/orchestrators/payment.orchestrator.ts`

---

## Technology Stack

- **Frontend**: Next.js App Router, React
- **Backend**: Node.js, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **CMS**: Sanity CMS for content delivery
- **Payments**: Stripe, UniPay integrations
- **Testing**: Vitest (unit), Playwright (e2e)

---

## Architecture Overview

### Architecture Sanity Checklist (Current State)

| Domain | Status | Description |
|--------|--------|-------------|
| **Training** | ✅ Content-only | `Course` model and UI components present |
| **Enrollment** | ✅ Lifecycle modeled | Repository and service stubs implemented |
| **Certification** | ✅ Separate models | Pathway/Level/Certificate with immutable certificates |
| **Payments** | 🚧 Partial | `PaymentService` exists; orchestrator stub (needs gateway integration) |
| **Identity/Corporate** | 🚧 Phased | Org & seat models present (corporate features partial) |

### Key Components

**Orchestrators**
- Payment → Enrollment → Certification orchestrators added as deterministic, logged stubs in `src/orchestrators/`

**Policy Engine**
- Deterministic evaluator stub at `src/modules/certification/policy.evaluator.ts`
- Intended to be replaced by a full rules evaluator

**Database**
- `prisma/schema.prisma` contains all core models
- `Certificate` model is designed to be immutable

**Migration Helpers**
- `scripts/map-legacy-courses.ts` provides dry-run discovery of legacy `Course` items without `levelId`

---

## Directory Structure

### High-Level Overview

```
prisma/                 # Database schema, migrations, seed data
sanity/                 # CMS configuration and content schemas
src/
  ├── app/              # Next.js App Router (UI pages, API endpoints)
  ├── components/       # UI components (presentation layer)
  ├── domains/          # Business authority (core domain logic)
  ├── orchestrators/    # Cross-domain workflows
  ├── modules/          # Domain services and business logic
  ├── server/           # Server Actions (authenticated mutations)
  ├── integrations/     # External service adapters
  └── lib/              # Utilities and helpers
tests/                  # Integration and e2e tests
scripts/                # Migration and helper scripts
```

### Detailed Source Structure

```
prisma/
└── schema.prisma                    # Canonical data model
└── migrations/                      # Database migrations
└── seed/                            # Seed data scripts

public/                              # Static assets (images, downloads)

sanity/                              # Sanity CMS configuration
└── schemas/                         # Content type schemas

scripts/
└── map-legacy-courses.ts            # Migration helper for legacy courses

src/
├── app/                             # Next.js App Router
│   ├── (home)/                      # Home pages
│   │   ├── about/
│   │   └── contact/
│   ├── advisory/                    # Advisory services
│   │   ├── book/
│   │   └── services/
│   ├── api/                         # API endpoints
│   │   ├── auth/
│   │   ├── bookings/
│   │   ├── chatbot/
│   │   ├── courses/
│   │   ├── crm/
│   │   ├── payments/
│   │   └── webhooks/
│   ├── consultancy/                 # Consultancy services
│   │   ├── book/
│   │   └── services/
│   ├── dashboard/                   # User dashboard
│   │   ├── bookings/
│   │   ├── courses/
│   │   └── profile/
│   ├── insights/                    # Blog/insights pages
│   │   └── [slug]/
│   ├── resources/                   # Resource pages
│   │   └── [slug]/
│   └── training/                    # Training pages
│       ├── courses/
│       └── enroll/
│
├── components/                      # UI components (presentation only)
│   ├── chatbot/
│   ├── courses/
│   ├── forms/
│   ├── layout/
│   ├── shared/
│   ├── ui/
│   └── tests/
│
├── data/                            # Static or seed data
│
├── domains/                         # Business authority (core domain logic)
│   ├── certification/               # Certificate domain models
│   ├── corporate/                   # Corporate/organization models
│   ├── enrollment/                  # Enrollment domain logic
│   ├── identity/                    # User identity models
│   ├── payments/                    # Payment domain models
│   └── training/                    # Training domain models
│
├── hooks/                           # React hooks
│
├── integrations/                    # External service adapters
│   ├── stripe/                      # Stripe payment integration
│   ├── unipay/                      # UniPay integration
│   ├── sanity/                      # Sanity CMS client
│   └── hubspot/                     # HubSpot CRM integration
│
├── lib/                             # Utilities and helpers
│   ├── db/                          # Database utilities
│   ├── email/                       # Email service
│   ├── security/                    # Security utilities
│   ├── utils/                       # General utilities
│   ├── logger.ts                    # Structured logger
│   └── tests/
│
├── modules/                         # Domain services (business logic)
│   ├── advisory/                    # Advisory service logic
│   ├── certification/               # Certification services
│   │   └── policy.evaluator.ts     # Policy evaluation engine
│   ├── consultancy/                 # Consultancy service logic
│   ├── payments/                    # Payment processing logic
│   └── training/                    # Training services
│
├── orchestrators/                   # Cross-domain workflows
│   ├── payment.orchestrator.ts      # Payment workflow orchestration
│   ├── enrollment.orchestrator.ts   # Enrollment workflow
│   ├── certification.orchestrator.ts # Certification workflow
│   └── tests/
│       └── orchestrators.test.ts    # Orchestrator unit tests
│
├── server/                          # Server Actions
│   └── tests/
│
└── types/                           # TypeScript type definitions

tests/
├── e2e/                             # End-to-end tests
├── fixtures/                        # Test fixtures and data
├── integration/                     # Integration tests
└── setup/                           # Test setup and configuration

utils/                               # Generic utilities
```

### Key Files

| File | Purpose |
|------|---------|
| `prisma/schema.prisma` | Canonical data model for the entire platform |
| `src/orchestrators/*` | Orchestrators coordinating cross-domain flows |
| `src/domains/certification/*` | Certificate repository and domain models |
| `src/modules/payments/*` | Payment initiation and processing logic |
| `src/lib/logger.ts` | Structured logger used throughout the application |
| `scripts/map-legacy-courses.ts` | Migration helper for legacy course data |

---

## Getting Started

### Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** or **pnpm**
- **PostgreSQL** instance for Prisma

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd petrocourses
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials and API keys
   ```

4. **Generate Prisma client**
   ```bash
   npm run prisma:generate
   ```

5. **Run database migrations**
   ```bash
   npm run prisma:migrate
   ```

6. **Seed the database (optional)**
   ```bash
   npm run prisma:seed
   ```

### Running the Development Server

```bash
pnpm dev
# or
npm run dev
```

The application will be available at `http://localhost:3000`

---

## Development Workflow

### Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run type-check       # Run TypeScript compiler check
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run database migrations
npm run prisma:studio    # Open Prisma Studio
```

---

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run integration tests
npm run test:integration

# Run e2e tests
npm run test:e2e

# Run tests in watch mode
npm run test:watch
```

### Test Coverage

Key verification areas before any release:

- ✅ Unit tests for policy logic (grant/deny)
- ✅ Certificate immutability tests
- ✅ Integration tests for payment webhooks → entitlement granting and rollback
- ✅ E2E flow: enroll → complete → certificate issuance
- ✅ Migration smoke test: ensure legacy `Course` → `Level` mapping preserves enrollments and certificates

---

## Migrations & Helpers

### Legacy Course Mapping

The `scripts/map-legacy-courses.ts` script provides a dry-run discovery of legacy `Course` rows with no `levelId`.

**Run dry-run:**
```bash
DATABASE_URL="postgresql://user:pass@localhost:5432/db" node scripts/map-legacy-courses.js
```

**To apply mappings:**
1. Extend the script to create `Level` rows
2. Update `Course.levelId` in a transactional operation
3. Test the migration on staging first
4. Review and validate results before applying to production

### Database Migrations

```bash
# Create a new migration
npx prisma migrate dev --name your_migration_name

# Apply pending migrations
npx prisma migrate deploy

# Reset database (⚠️ destructive)
npx prisma migrate reset
```

---

## Key Implementations

### Orchestrators
- `src/orchestrators/payment.orchestrator.ts` — Payment initiation + processing (dev stub)
- `src/orchestrators/enrollment.orchestrator.ts` — Idempotent enrollment creation
- `src/orchestrators/certification.orchestrator.ts` — Policy-based certificate issuance

### Services
- `src/modules/certification/policy.evaluator.ts` — Deterministic policy evaluator
- `src/lib/logger.ts` — Structured logging utility

### Tests
- `src/orchestrators/__tests__/orchestrators.test.ts` — Unit tests for payment → enroll → cert flow

---

## License

See the `LICENSE` file in the repository root.

---

## Support

For questions or issues, please:
- Open an issue on GitHub

---
