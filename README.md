PetroCourses – Full-Stack Training & Consultancy Platform

A scalable, domain-driven platform built with Next.js App Router, Prisma, and modular service architecture. PetroCourses provides training programs, consultancy services, advisory sessions, and a personalized user dashboard. The system integrates a unified payments layer and supports modern content delivery via Sanity CMS.

Table of Contents

Introduction

Technology Stack

Features

Project Architecture

Directory Overview

Authentication

Payments

Database

CMS Integration

Setup Instructions

Development Workflow

Environment Variables

Scripts

Deployment

Contributing

License

1. Introduction

PetroCourses is a full-stack web platform designed for online training, consultancy, and advisory services. The system is optimized for scalability, domain-driven structure, and ease of integration with external services such as CRMs, payment gateways, and LMS pipelines.

The platform supports marketing pages, course catalog, booking flows, a user dashboard, and API endpoints that power the frontend.

2. Technology Stack

Frontend & Backend

Next.js 14+ (App Router)

React

TypeScript

Database & ORM

PostgreSQL

Prisma ORM

Authentication

Clerk (with passwordless, OAuth, and server-side session support)

Payments

UniPay Connect (unified gateway for Stripe, Razorpay, PayPal, etc.)

CMS & Integrations

Sanity CMS

HubSpot

Calendly

Teachable (optional)

Styling & Components

Tailwind CSS

shadcn/ui

3. Features

Public marketing pages

Course catalog and enrollment

Consultancy and advisory booking

Insights and articles

Resource downloads

Authenticated user dashboard

Server Actions for backend operations

Domain-driven modules

Unified payment API with webhooks

Integrated CMS for content management

CRM and scheduling integrations

4. Project Architecture

PetroCourses uses a domain-driven modular architecture that separates concerns between routing, domain logic, integrations, and UI components.

Key architectural principles:

Each domain (Training, Consultancy, Advisory, Payments) has its own module.

API routes act as thin controllers and delegate real logic to services.

Server Actions handle authenticated mutations.

A unified integration layer manages payment providers and external APIs.

Middleware protects authenticated routes (dashboard).

Prisma handles database access through domain-specific query files.

5. Directory Overview
src/
 ├── app/                    # Next.js App Router (public + dashboard + APIs)
 ├── modules/                # Domain-driven application logic
 ├── server/                 # Server actions for mutations
 ├── integrations/           # Third-party SDK wrappers
 ├── components/             # UI and shared components
 ├── lib/                    # Utils, db, helpers, security
 ├── types/                  # Global TypeScript types
 └── middleware.ts           # Auth routing middleware

prisma/                      # Database schema and migrations
public/                      # Static assets
sanity/                      # CMS configuration

6. Authentication

Authentication is implemented using Clerk.

Key points:

The root layout wraps the application in ClerkProvider.

Middleware protects private routes such as /dashboard/*.

currentUser() is used inside server actions and services to ensure secure access.

Optional Clerk webhooks can sync user profiles into the database.

7. Payments

PetroCourses uses a unified payments domain located in:

src/modules/payments/


This includes:

Payment services (business logic)

Validation

Server actions

Payment type definitions

All payment processing is routed through UniPay Connect, which allows the platform to support multiple providers (Stripe, Razorpay, PayPal) without modifying frontend or business logic.

Webhook handlers are located under:

src/app/api/webhooks/unipay/


Metadata passed through payments ties transactions to authenticated users in the database.

8. Database

Prisma is used as the ORM with a PostgreSQL backend.

Folder structure:

prisma/
 ├── schema.prisma
 ├── migrations/
 └── seed.ts


Models include:

User

Course

Enrollment

Booking

Payment

Additional domain-specific entities

9. CMS Integration

Sanity powers the content for:

Insights (blog)

Marketing pages

Resource downloads

Sanity configuration is stored in:

sanity/
 ├── schemas/
 └── sanity.config.ts

10. Setup Instructions
Prerequisites

Node.js 18+

PostgreSQL database

Sanity project (optional)

Clerk account

UniPay Connect API key

Installation
npm install

Database Setup
npx prisma migrate dev
npx prisma db seed

Environment File

Create .env.local and configure the required variables (listed below).

Run the Development Server
npm run dev


The application will be available at http://localhost:3000.

11. Development Workflow

Modules contain all domain logic.

UI components live in src/components/.

Server Actions handle authenticated operations.

API routes act as the controller layer.

Prisma is used for all database operations via domain query files.

Integrations folder holds all external API clients.

This separation ensures scalability and maintainability.

12. Environment Variables

Typical values include:

DATABASE_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
UNIPAY_API_KEY=

SANITY_PROJECT_ID=
SANITY_TOKEN=

HUBSPOT_API_KEY=
CALENDLY_API_KEY=
TEACHABLE_API_KEY=


Add additional integration keys as needed.

13. Scripts
npm run dev         # Start development server
npm run build       # Create production build
npm run start       # Run production build
npm run lint        # Lint code
npm run format      # Format using Prettier
npx prisma studio   # Database admin UI

14. Deployment

PetroCourses is optimized for deployment on:

Vercel

AWS (via Next.js SSR support)

Render

Docker-based hosting

For Vercel:

Environment variables must be configured in project settings.

The platform will automatically detect Next.js App Router.

15. Contributing

Contributions should follow these guidelines:

Create a feature branch before submitting PRs.

Follow the existing domain-driven structure.

Ensure TypeScript types are correctly extended.

Add tests or validation for new modules.

Follow formatting and linting rules.

16. License

This project is licensed under the MIT License.
You may modify and distribute this software in compliance with the license terms.
