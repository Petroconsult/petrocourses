# Petrocourses

A modern, multi-vertical platform for training, advisory, and consultancy services built with **Next.js 14**, **TypeScript**, **Prisma**, and **Tailwind CSS**.

## Project Overview

Petrocourses is a comprehensive platform that consolidates:
- **Training Vertical**: Course enrollment and management
- **Advisory Vertical**: Expert advisory services and bookings
- **Consultancy Vertical**: Consulting services and project management
- **Unified Payments**: Multi-gateway payment processing (Stripe, Razorpay, PayPal)
- **CRM Integration**: HubSpot integration for lead management
- **Learning Management**: Teachable and Calendly integrations

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS 3
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **Payments**: Unipay (orchestrator) with multiple gateway support
- **CMS**: Sanity
- **API**: RESTful APIs with Next.js App Router

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (marketing)/        # Public marketing pages
│   ├── training/           # Training vertical
│   ├── consultancy/        # Consultancy services
│   ├── advisory/           # Advisory services
│   ├── insights/           # Blog/insights
│   ├── resources/          # Resource library
│   ├── dashboard/          # Protected user dashboard
│   ├── api/                # API routes
│   └── layout.tsx          # Root layout
│
├── modules/                # Domain-driven modules
│   ├── training/           # Training business logic
│   ├── consultancy/        # Consultancy business logic
│   ├── advisory/           # Advisory business logic
│   └── payments/           # Unified payment module
│
├── server/                 # Server Actions (Next.js 14)
├── integrations/           # 3rd-party SDK connectors
├── components/             # Reusable React components
├── lib/                    # Utilities and helpers
│   ├── db/                 # Prisma client
│   ├── email/              # Email service
│   ├── security/           # Auth, encryption, rate limiting
│   └── utils/              # Formatting, validation helpers
├── types/                  # TypeScript type definitions
└── middleware.ts           # Next.js middleware

prisma/                    # Database configuration
sanity/                    # CMS configuration
public/                    # Static assets
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.local .env.local.backup
   # Edit .env.local with your configuration
   ```

3. **Set up database**:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

4. **Run development server**:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations

## Architecture

### Domain-Driven Design

The application follows a domain-driven architecture:

- **App Router (`src/app/`)**: Page layouts and route handlers
- **Modules (`src/modules/`)**: Business logic organized by domain
- **Server Actions (`src/server/`)**: Next.js 14 server-side operations
- **Integrations (`src/integrations/`)**: External service connectors

### API Routes

- `/api/auth/*` - Authentication
- `/api/payments/*` - Payment processing
- `/api/webhooks/*` - Third-party webhooks
- `/api/courses/*` - Course management
- `/api/bookings/*` - Booking management
- `/api/chatbot/*` - Chatbot API
- `/api/crm/*` - CRM integration

## Environment Variables

Key variables to configure in `.env.local`:

```env
# Database
DATABASE_URL=postgresql://...

# Authentication
NEXTAUTH_SECRET=your-secret

# Payment Gateways
STRIPE_PUBLIC_KEY=...
STRIPE_SECRET_KEY=...
RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...
PAYPAL_CLIENT_ID=...
PAYPAL_CLIENT_SECRET=...

# Services
SANITY_PROJECT_ID=...
SANITY_DATASET=...
HUBSPOT_API_KEY=...
```

## Development Guidelines

### File Naming Conventions

- Components: PascalCase (`CourseCard.tsx`)
- Utilities: camelCase (`formatCurrency.ts`)
- Types: PascalCase (`Course.ts`)
- Server Actions: `*.actions.ts`
- Services: `*.service.ts`
- Queries: `*.queries.ts`

### Styling

- Use Tailwind CSS for utility-first styling
- Global styles: `src/app/globals.css`

### Type Safety

- Use TypeScript for all files
- Define shared types in `src/types/`

## Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Platforms

- Vercel (recommended for Next.js)
- AWS EC2/ECS
- Docker containerization

## Contributing

1. Create a feature branch from `main`
2. Follow the established project structure
3. Use TypeScript and Tailwind CSS
4. Test changes locally
5. Create a pull request with a descriptive message

## License

See LICENSE file for details.
