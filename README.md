# PetroCourses – Full-Stack Training & Consultancy Platform

PetroCourses is a scalable, domain-driven full-stack platform built with **Next.js App Router**, **Prisma**, and a **modular service architecture**.

The platform delivers professional **training programs**, **consultancy services**, **advisory sessions**, and a **personalized user dashboard**, supported by a **unified payments layer** and modern content delivery via **Sanity CMS**.

---

## Table of Contents

1. Introduction  
2. Platform Capabilities  
3. Technology Stack  
4. Features  
5. Project Architecture  
6. Directory Structure  
7. Authentication  
8. Payments  
9. Database  
10. CMS Integration  
11. Development Workflow  
12. Environment Variables  
13. Scripts  
14. Setup Instructions  
15. Deployment  
16. Contributing  
17. License  

---

## Introduction

PetroCourses is a production-grade web platform designed for **online education, consultancy, and advisory services**.

It is built to support:

- High-traffic public marketing pages  
- Modular course and service catalogs  
- Secure booking and payment flows  
- Authenticated dashboards for users  
- Clean separation of business logic and infrastructure  

The system is optimized for **scalability**, **maintainability**, and **easy integration** with external services such as CRMs, payment providers, and learning platforms.

---

## Platform Capabilities

PetroCourses supports multiple business verticals from a single codebase:

- **Training** – courses, enrollments, learning journeys  
- **Consultancy** – service listings and booking workflows  
- **Advisory** – expert advisory sessions  
- **Content** – insights, resources, and CMS-driven pages  
- **Payments** – unified checkout and webhook handling  
- **User Management** – authentication, profiles, bookings  

---

## Technology Stack

### Frontend & Backend
## Project Architecture

PetroCourses follows a domain-driven, modular architecture layered on the Next.js App Router.

High-level principles:
- Keep routing and presentation in `app/` (no business logic).
- Place authoritative business rules and persistence in `src/domains/`.
- Use thin orchestration/orchestrators for cross-domain workflows in `src/orchestrators/`.
- Expose authenticated mutations via `src/server/` Server Actions.
- Isolate third-party integrations in `src/integrations/` and adapters in `src/lib/`.
- Use `middleware.ts` for access control and role-based guards.

---

## Directory Structure

```text
PetroCourses/
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
│
├── sanity/
│   ├── sanity.config.ts
│   └── schemas/                       # Content only (no certification logic)
│
├── src/
│   ├── middleware.ts                  # Auth + access guards
│   
│   ├── app/                           # Routing & UI only
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   
│   │   ├── (marketing)/               # Marketing & public pages
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   └── insights/
│   │   
│   │   ├── pathways/                  # Public pathway → level views
│   │   │   ├── page.tsx
│   │   │   └── [pathwayId]/
│   │   │       └── levels/
│   │   
│   │   ├── dashboard/                 # Authenticated experience
│   │   │   ├── layout.tsx
│   │   │   ├── pathways/
│   │   │   ├── certificates/
│   │   │   ├── bookings/
│   │   │   └── profile/
│   │   
│   │   ├── advisory/
│   │   ├── consultancy/
│   │   
│   │   └── api/                       # Thin orchestration endpoints
│   │       ├── auth/
│   │       ├── payments/
│   │       ├── enrollment/
│   │       ├── certification/
│   │       └── webhooks/
│   
│   ├── domains/                       # 🔒 Business Truth Lives Here
│   │
│   │   ├── certification/             # ⭐ CORE AUTHORITY
│   │   │   ├── certification.engine.ts
│   │   │   ├── certification.policy.ts
│   │   │   ├── certificate.model.ts
│   │   │   ├── certificate.repo.ts
│   │   │   └── events.ts
│   │
│   │   ├── training/                  # Content structure only
│   │   │   ├── pathway.model.ts
│   │   │   ├── level.model.ts
│   │   │   ├── module.model.ts
│   │   │   ├── lesson.model.ts
│   │   │   └── progress.events.ts
│   │
│   │   ├── enrollment/                # Access & lifecycle
│   │   │   ├── enrollment.model.ts
│   │   │   ├── enrollment.lifecycle.ts
│   │   │   ├── access.control.ts
│   │   │   └── enrollment.repo.ts
│   │
│   │   ├── payments/
│   │   │   ├── product.catalog.ts      # Level / Pathway / Corporate
│   │   │   ├── entitlements.ts
│   │   │   ├── payment.service.ts
│   │   │   └── webhooks.ts
│   │
│   │   ├── identity/                  # User & org context
│   │   │   ├── user.context.ts
│   │   │   ├── roles.ts
│   │   │   └── organization.model.ts
│   │
│   │   ├── corporate/                 # Phase 2 (dormant but ready)
│   │   │   ├── organization.model.ts
│   │   │   ├── seat.model.ts
│   │   │   └── reporting.ts
│   │
│   │   ├── advisory/
│   │   └── consultancy/
│   
│   ├── orchestrators/                 # 🔁 Cross-domain workflows
│   │   ├── enrollment.orchestrator.ts
│   │   ├── payment.orchestrator.ts
│   │   └── certification.orchestrator.ts
│   
│   ├── server/                        # Server Actions
│   │   ├── auth.actions.ts
│   │   ├── enrollment.actions.ts
│   │   ├── certification.actions.ts
│   │   ├── booking.actions.ts
│   │   └── payment.actions.ts
│   
│   ├── components/                    # UI only (no business logic)
│   ├── hooks/
│   ├── integrations/                  # Stripe, UniPay, Sanity, HubSpot
│   ├── lib/                           # DB, security, utilities
│   ├── types/                         # Shared types (DTOs only)
│   
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   └── fixtures/
    
```
| `prisma/` | Database schema and access |

---

## Directory Structure

```text
my-platform/
├── src/
│   ├── app/                              # Next.js App Router
│   │   ├── (marketing)/                  # Public pages
│   │   ├── training/                     # Training vertical
│   │   ├── consultancy/
│   │   ├── advisory/
│   │   ├── insights/
│   │   ├── resources/
│   │   ├── dashboard/                    # Auth-protected area
│   │   ├── api/                          # Thin API controllers
│   │   ├── layout.tsx
│   │   └── globals.css
│   │
│   ├── modules/                          # Domain-driven logic
│   │   ├── training/
│   │   ├── consultancy/
│   │   ├── advisory/
│   │   └── payments/
│   │
│   ├── server/                           # Server Actions
│   ├── integrations/                     # External services
│   ├── components/                       # UI components
│   ├── lib/                              # Utilities & security
│   ├── types/                            # Global TS types
│   └── middleware.ts                     # Auth & routing guard
│
├── prisma/                               # Database
├── public/                               # Static assets
├── sanity/                               # CMS config
├── .env.local
├── next.config.js
├── tailwind.config.ts
└── package.json
