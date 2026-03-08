PetroCourses LLM Engineering Playbook
Version: v1.0

Purpose: Enable LLM-driven development while preserving architecture integrity.

1. Core Principles

An LLM modifying this repository must follow these principles:

1.1 Respect Layered Architecture

The system follows a Domain-Driven Modular Monolith architecture.

Strict layer order:

UI (components)
    ↓
App Router (pages)
    ↓
API / Server Actions
    ↓
Orchestrators
    ↓
Modules (services)
    ↓
Domains (business rules)
    ↓
Prisma (database)

LLM must not bypass layers.

Example violation:

UI → Prisma

Correct:

UI → API → Orchestrator → Module → Domain → Prisma
2. Repository Map

The LLM must treat these directories as authoritative boundaries.

prisma/               → Database schema
sanity/               → CMS schema
src/app               → Next.js routes
src/components        → UI only
src/domains           → Business entities
src/modules           → Domain services
src/orchestrators     → Cross-domain workflows
src/integrations      → External APIs
src/lib               → Utilities
src/hooks             → React hooks
src/types             → Type definitions
tests                 → All test suites

The LLM must not create business logic in components or pages.

3. Architectural Responsibilities
3.1 Domains

Location:

src/domains/

Domains define:

core business entities

invariants

domain rules

Examples:

identity
training
payments
enrollment
certification
corporate

Example domain responsibilities:

Enrollment Domain

Rules:

Enrollment only created after payment confirmation

Example entity:

Enrollment
User
Course

LLM must place pure business logic here.

Domains must not import UI or integrations.

4. Modules (Business Services)

Location:

src/modules/

Modules implement operations on domains.

Examples:

modules/training
modules/payments
modules/certification
modules/consultancy
modules/advisory

Example responsibilities:

Training module:

fetch course structure
unlock next module
track lesson progress

Payment module:

create checkout session
validate payment
record payment

Modules may access:

Prisma
Domains
Utilities

Modules must not call UI or Next.js router code.

5. Orchestrators (Workflow Layer)

Location:

src/orchestrators/

Orchestrators coordinate multi-domain workflows.

Existing orchestrators:

payment.orchestrator.ts
enrollment.orchestrator.ts
certification.orchestrator.ts

Example workflow:

Payment Flow
User purchases course
      ↓
Stripe checkout
      ↓
Stripe webhook
      ↓
payment.orchestrator
      ↓
payment module
      ↓
enrollment orchestrator

The LLM must implement new cross-domain workflows here.

6. API Layer

Location:

src/app/api/

Used for:

webhooks

external service endpoints

CRM integration

chatbot

Examples:

api/payments
api/webhooks
api/courses
api/crm

LLM must ensure:

API → Orchestrator

NOT:

API → Prisma
7. UI Layer

Location:

src/components
src/app

Rules:

Components must be pure presentation.

Components may:

call hooks
call server actions
render data

Components must not contain business logic.

8. Integrations Layer

Location:

src/integrations/

Purpose:

External services must be isolated here.

Examples:

stripe
hubspot
sanity
unipay

Each integration must expose adapters.

Example:

integrations/stripe/checkout.ts
integrations/stripe/webhook.ts

LLM must never call Stripe SDK directly outside this folder.

9. Database Layer

Location:

prisma/schema.prisma

This is the canonical data model.

LLM must update:

schema.prisma
migrations
seed scripts

when adding new entities.

10. PetroCourses Business Rules Implementation

The LLM must enforce the following platform rules.

10.1 Enrollment Rules

Enrollment occurs only after Stripe webhook confirmation.

Workflow:

Stripe webhook
   ↓
verify webhook
   ↓
payment.orchestrator
   ↓
create payment record
   ↓
enrollment.orchestrator
   ↓
create enrollment
10.2 Course Progression

Rules:

modules must be sequential
quizzes required
progress tracked

Implementation:

Training module must enforce:

canAccessNextModule()
10.3 Final Exam Rules

Certification exam rules:

85% pass threshold
3 attempts allowed
randomized questions
5 day cooldown after failure

Implementation location:

modules/certification/policy.evaluator.ts

LLM must implement a policy engine.

Example result states:

PASS
FAIL
LOCKED
COOLDOWN
10.4 Certification Issuance

Triggered when:

exam passed

Workflow:

certification.orchestrator
   ↓
generate certificate
   ↓
store PDF
   ↓
email certificate

Certificates must be immutable once issued.

10.5 Refund Rules

Refund window:

20 days

Conditions:

progress < 30%

Refund must trigger:

revoke enrollment
revoke certificate
11. Feedback System

Feedback is collected at:

course completion
checkout abandonment
exam failures

Database table:

feedback

Stored in:

Prisma

Marketing feedback may also be sent to:

HubSpot integration
12. Media Access Control

Media must be protected.

Rules:

authenticated user required
enrollment required
signed CDN URLs

Future location:

integrations/media
13. Security Policies

LLM must enforce:

Role-Based Access Control

Roles:

Guest
Student
Admin
ContentManager

Admin actions must log:

audit_logs
14. Testing Rules

All new functionality must include tests.

Test types:

unit tests
integration tests
e2e tests

Locations:

tests/unit
tests/integration
tests/e2e

Critical workflows requiring tests:

payment
enrollment
exam attempts
certificate generation
15. Code Generation Rules for LLM

When adding a feature, the LLM must:

Step 1

Check if a domain exists.

If not:

create domain
Step 2

Create module service.

Step 3

If workflow crosses domains:

create orchestrator
Step 4

Expose via:

API route
or
server action
Step 5

Add UI component.

Step 6

Add tests.

16. Feature Extension Protocol

When implementing a new feature, the LLM must answer:

1. What domain owns this?
2. What service implements it?
3. Does it require orchestration?
4. Does it require database changes?
5. Does it require external integration?
17. Migration Strategy

Legacy courses are mapped using:

scripts/map-legacy-courses.ts

LLM must preserve migration compatibility.

18. Forbidden Actions

The LLM must never:

embed secrets in code

bypass orchestrators

add business logic in UI

bypass payment verification

create direct Prisma calls in API routes

19. Future Extensions

The architecture must support:

corporate training
bulk enrollments
AI chatbot
advanced analytics
multi-language
mobile apps

LLM must implement these as new modules, not modifications of existing ones.

20. LLM Output Requirements

When the LLM modifies the codebase it must provide:

1. file changes
2. new modules
3. schema changes
4. migrations
5. tests

All changes must be atomic and reversible.