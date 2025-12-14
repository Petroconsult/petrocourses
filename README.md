# PetroCourses  
**Full-Stack Training & Consultancy Platform**

PetroCourses is a scalable, domain-driven platform built with **Next.js App Router**, **Prisma**, and a **modular, vertical-oriented architecture**.  
It delivers training programs, consultancy services, advisory sessions, and a personalized user dashboard with unified payments and CMS-driven content.

---

## Table of Contents

- [Introduction](#introduction)
- [Technology Stack](#technology-stack)
- [Features](#features)
- [Project Architecture](#project-architecture)
- [Directory Structure](#directory-structure)
- [Authentication](#authentication)
- [Payments](#payments)
- [Database](#database)
- [CMS Integration](#cms-integration)
- [Setup Instructions](#setup-instructions)
- [Development Workflow](#development-workflow)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Introduction

PetroCourses is a full-stack web platform designed for **online training, consultancy, and advisory services**.  
The system is optimized for **scalability**, **clear domain separation**, and **easy integration** with third-party services such as payment gateways, CRMs, scheduling tools, and LMS platforms.

The platform supports:

- Marketing pages and lead capture
- Course catalog and enrollment flows
- Consultancy and advisory bookings
- Insights, resources, and downloads
- Authenticated user dashboards
- API endpoints powering frontend and integrations

---

## Technology Stack

### Frontend & Backend
- **Next.js 14+** (App Router)
- **React**
- **TypeScript**

### Database & ORM
- **PostgreSQL**
- **Prisma ORM**

### Authentication
- **Clerk**
  - Passwordless authentication
  - OAuth providers
  - Server-side session handling

### Payments
- **UniPay Connect**
  - Unified gateway for Stripe, Razorpay, PayPal, etc.

### CMS & Integrations
- **Sanity CMS**
- **HubSpot**
- **Calendly**
- **Teachable** (optional)

### Styling & UI
- **Tailwind CSS**
- **shadcn/ui**

---

## Features

- Public marketing pages
- Training, consultancy, and advisory verticals
- Course catalog and enrollment
- Booking flows for services
- Insights and CMS-driven content
- Resource downloads and lead magnets
- Authenticated user dashboard
- Server Actions for secure mutations
- Unified payments API with webhooks
- CRM, scheduling, and LMS integrations

---

## Project Architecture

PetroCourses uses a **vertical-oriented, domain-driven architecture** built on the **Next.js App Router**.

Each business vertical — **Training**, **Consultancy**, and **Advisory** — is represented directly in the routing layer, while shared UI, data access, and integrations are abstracted into reusable modules.

### Architectural Principles

- **Vertical-first routing** aligned with business domains
- **Clear separation of concerns** between routing, UI, and integrations
- **Composable UI components** shared across domains
- **Integration adapters** for payments, CRM, LMS, and scheduling
- **Secure-by-default routing** via middleware
- **CMS-driven content delivery** for marketing and insights

---

## Directory Structure

```text
my-platform/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (marketing)/              # Marketing pages
│   │   │   ├── page.tsx              # Homepage
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   └── layout.tsx
│   │   ├── training/                 # Training vertical
│   │   │   ├── page.tsx
│   │   │   ├── courses/
│   │   │   │   ├── page.tsx          # Course catalog
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx      # Course details
│   │   │   └── enroll/
│   │   ├── consultancy/              # Consultancy vertical
│   │   │   ├── page.tsx
│   │   │   ├── services/
│   │   │   └── book/
│   │   ├── advisory/                 # Advisory vertical
│   │   │   ├── page.tsx
│   │   │   ├── services/
│   │   │   └── book/
│   │   ├── insights/                 # Blog / insights
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   ├── resources/                # Lead magnets
│   │   │   └── [slug]/
│   │   ├── dashboard/                # Authenticated user dashboard
│   │   │   ├── layout.tsx
│   │   │   ├── courses/
│   │   │   ├── bookings/
│   │   │   └── profile/
│   │   ├── api/                      # API routes
│   │   │   ├── auth/
│   │   │   ├── courses/
│   │   │   ├── bookings/
│   │   │   ├── payments/
│   │   │   ├── webhooks/
│   │   │   │   ├── stripe/
│   │   │   │   ├── teachable/
│   │   │   │   └── calendly/
│   │   │   ├── chatbot/
│   │   │   └── crm/
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                       # shadcn/ui components
│   │   ├── forms/                    # Domain forms
│   │   │   ├── BookingForm.tsx
│   │   │   ├── EnrollmentForm.tsx
│   │   │   └── LeadCaptureForm.tsx
│   │   ├── course/                   # Course UI components
│   │   │   ├── CourseCard.tsx
│   │   │   └── CourseCatalog.tsx
│   │   ├── chatbot/
│   │   │   └── ChatWidget.tsx
│   │   ├── layout/                   # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navigation.tsx
│   │   └── shared/                   # Shared components
│   ├── lib/
│   │   ├── db/
│   │   │   └── prisma.ts
│   │   ├── integrations/             # External service adapters
│   │   │   ├── stripe.ts
│   │   │   ├── teachable.ts
│   │   │   ├── calendly.ts
│   │   │   ├── hubspot.ts
│   │   │   └── sanity.ts
│   │   ├── utils/
│   │   │   ├── email.ts
│   │   │   ├── validation.ts
│   │   │   └── helpers.ts
│   │   └── hooks/
│   ├── types/                        # Global TypeScript types
│   │   ├── course.ts
│   │   ├── booking.ts
│   │   └── user.ts
│   └── middleware.ts                 # Auth & routing middleware
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── public/
│   ├── images/
│   └── downloads/
├── sanity/                           # Sanity CMS configuration
│   ├── schemas/
│   └── sanity.config.ts
├── .env.local
├── next.config.js
├── tailwind.config.ts
└── package.json
