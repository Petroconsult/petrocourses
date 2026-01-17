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
- Next.js 14+ (App Router)
- React
- TypeScript

### Database & ORM
- PostgreSQL
- Prisma ORM

### Authentication
- Clerk (passwordless login, OAuth, server-side sessions)

### Payments
- UniPay Connect  
  - Stripe  
  - Razorpay  
  - PayPal  

### CMS & Integrations
- Sanity CMS
- HubSpot
- Calendly
- Teachable (optional)

### Styling & UI
- Tailwind CSS
- shadcn/ui

---

## Features

- Public marketing pages  
- Course catalog and enrollment flows  
- Consultancy and advisory booking  
- CMS-driven insights and resources  
- Authenticated user dashboard  
- Server Actions for secure mutations  
- Domain-driven modular architecture  
- Unified payments with webhook handling  
- CRM and scheduling integrations  

---

## Project Architecture

PetroCourses follows a **domain-driven, modular architecture** built on top of the **Next.js App Router**.

### Core Architectural Principles

- **Routing is not business logic**  
- **API routes are thin controllers**  
- **All domain logic lives in modules**  
- **Server Actions handle authenticated mutations**  
- **Third-party services are isolated behind adapters**  
- **Payments are unified behind a single gateway**  
- **Middleware enforces access control**  

### Responsibility Separation

| Layer | Responsibility |
|-----|---------------|
| `app/` | Routing, layouts, and API endpoints |
| `modules/` | Domain rules and business logic |
| `server/` | Server Actions |
| `integrations/` | External APIs & SDKs |
| `lib/` | Shared utilities and infrastructure |
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
