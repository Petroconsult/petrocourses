# Testing Guide - Petrocourses

Complete guide to running tests and ensuring production readiness for the Petrocourses platform.

## Overview

The project implements a comprehensive testing strategy with four levels:
- **Unit Tests**: Individual functions and services
- **Component Tests**: React components in isolation
- **Integration Tests**: API routes with database
- **E2E Tests**: Complete user workflows

## Test Framework

- **Runner**: Vitest (Jest-compatible, faster)
- **React Testing**: @testing-library/react
- **Coverage**: v8 coverage provider

## Project Structure

```
tests/
├── __tests__/               # Colocated with source
│   ├── course.service.test.ts
│   ├── payment.service.test.ts
│   └── ...
├── integration/
│   ├── api/
│   │   └── api-integration.test.ts
│   └── integrations/
│       └── integrations.test.ts
├── e2e/
│   └── user-flows.test.ts
├── fixtures/
│   └── mock-data.ts         # Test data
└── setup/
    └── test-setup.ts        # Global setup
```

## Running Tests

### All Tests
```bash
npm test
# or
npm run test:all
```

### Watch Mode (Development)
```bash
npm run test:watch
```

### By Category
```bash
# Unit tests only
npm run test:unit

# Integration tests only
npm run test:integration

# E2E tests only
npm run test:e2e

# Coverage report
npm run test:coverage
```

### UI Mode (Visual)
```bash
npm run test:ui
# Opens interactive test UI at http://localhost:51204
```

## Test Files

### Unit Tests (src/**/__tests__)

#### Services
- `src/modules/training/__tests__/course.service.test.ts`
  - Course CRUD operations
  - Data validation
  - Error handling

- `src/modules/payments/__tests__/payment.service.test.ts`
  - Payment initiation
  - Transaction processing
  - Refund handling
  - Gateway validation

#### Queries
- `src/modules/training/__tests__/course.queries.test.ts`
  - Database queries
  - Pagination
  - Search and filtering

#### Utilities
- `src/lib/__tests__/lib.utils.test.ts`
  - Validation functions
  - Formatting utilities
  - Helper functions

#### Server Actions
- `src/server/__tests__/server.actions.test.ts`
  - Authentication
  - Course enrollment
  - User management

#### Components
- `src/components/__tests__/components.test.tsx`
  - CourseCard rendering
  - CourseCatalog functionality
  - Form handling

### Integration Tests (tests/integration/)

#### API Integration
- `tests/integration/api/api-integration.test.ts`
  - Payment API endpoints
  - Course API operations
  - Booking API workflows
  - Database integration

#### External Integrations
- `tests/integration/integrations/integrations.test.ts`
  - Stripe payment processing
  - Razorpay payment handling
  - PayPal integration
  - HubSpot CRM sync
  - Teachable enrollment
  - Calendly scheduling
  - Sanity CMS content

### E2E Tests (tests/e2e/)

#### User Flows
- `tests/e2e/user-flows.test.ts`
  - Complete enrollment flow
  - Dashboard access
  - Booking services
  - Multi-gateway payments
  - Admin functions

## Test Data (Fixtures)

Mock data available in `tests/fixtures/mock-data.ts`:

```typescript
// Courses
mockCourses

// Users
mockUsers

// Enrollments
mockEnrollments

// Payments
mockPayments

// Bookings
mockBookings

// Services
mockServices

// Payment Intents (Stripe, Razorpay, PayPal)
mockPaymentIntents

// Auth Tokens
mockAuthTokens

// Error Responses
mockErrorResponses

// Validation Errors
mockValidationErrors
```

Usage:
```typescript
import { mockCourses, mockUsers } from '@/tests/fixtures/mock-data';

describe('My Test', () => {
  it('should work with mock data', () => {
    expect(mockCourses).toHaveLength(2);
    expect(mockUsers[0].email).toBe('john@example.com');
  });
});
```

## Writing New Tests

### Unit Test Template
```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MyService } from '../my.service';

describe('MyService', () => {
  let service: MyService;

  beforeEach(() => {
    service = new MyService();
    vi.clearAllMocks();
  });

  describe('methodName', () => {
    it('should do something', async () => {
      // Arrange
      const input = 'test';

      // Act
      const result = await service.methodName(input);

      // Assert
      expect(result).toBeDefined();
    });
  });
});
```

### Component Test Template
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MyComponent } from '../MyComponent';

describe('MyComponent', () => {
  it('should render component', () => {
    render(<MyComponent />);

    expect(screen.getByText(/expected text/i)).toBeInTheDocument();
  });
});
```

### Integration Test Template
```typescript
import { describe, it, expect, beforeEach } from 'vitest';

describe('API Integration', () => {
  beforeEach(() => {
    // Setup test database
  });

  it('should call API and update database', async () => {
    const response = await fetch('/api/endpoint');
    
    expect(response.status).toBe(200);
  });
});
```

## Coverage Goals

Minimum coverage targets for production:
- **Lines**: 80%
- **Functions**: 80%
- **Branches**: 75%
- **Statements**: 80%

View coverage:
```bash
npm run test:coverage
# Opens coverage/index.html
```

## Continuous Integration

### Pre-commit Tests
Run unit tests before committing:
```bash
npm run test:unit
```

### Pre-push Tests
Run all tests before pushing:
```bash
npm run test:all
```

### CI/CD Pipeline
Tests run automatically on:
- Pull requests
- Commits to main
- Before deployment

## Common Test Patterns

### Mocking Functions
```typescript
const mockFn = vi.fn();
mockFn.mockResolvedValue({ id: '1' });
mockFn.mockRejectedValue(new Error('Failed'));
```

### Mocking Modules
```typescript
vi.mock('@/lib/db/prisma', () => ({
  default: {
    user: {
      findUnique: vi.fn(),
    },
  },
}));
```

### Testing Async Code
```typescript
it('should handle async', async () => {
  const result = await asyncFunction();
  expect(result).toBeDefined();
});
```

### Testing Errors
```typescript
it('should throw error', () => {
  expect(() => {
    throwingFunction();
  }).toThrow('Error message');
});
```

## Debugging Tests

### Debug Single Test
```bash
node --inspect-brk node_modules/vitest/vitest.mjs run my.test.ts
```

### Print Debug Info
```typescript
import { describe, it, expect } from 'vitest';

it('should debug', () => {
  const data = { id: 1 };
  console.log('Debug:', data);
  expect(data.id).toBe(1);
});
```

### Using Chrome DevTools
```bash
npm run test:watch
# Then open chrome://inspect in Chrome
```

## Best Practices

### 1. Test Organization
- Keep tests close to source code in `__tests__` folders
- Use descriptive test names
- Group related tests with `describe`

### 2. Test Independence
- Each test should be independent
- Use `beforeEach` for setup
- Use `afterEach` for cleanup

### 3. Mock External Services
- Mock API calls
- Mock database operations
- Mock external services (Stripe, etc.)

### 4. Use Fixtures
- Centralize mock data
- Reuse fixtures across tests
- Keep fixtures realistic

### 5. Assertions
- Test behavior, not implementation
- Use meaningful assertions
- Test happy path and error cases

### 6. Performance
- Keep tests fast
- Use `test:watch` during development
- Profile slow tests

## Troubleshooting

### Tests Not Running
```bash
# Clear Vitest cache
rm -rf .vitest

# Run with debug info
npm test -- --reporter=verbose
```

### Import Errors
- Ensure path aliases in `vitest.config.ts`
- Check `tsconfig.json` paths
- Verify file extensions

### Async Issues
- Always use `await` or `async`
- Return promises from async tests
- Increase `testTimeout` if needed

### Mock Issues
- Clear mocks between tests: `vi.clearAllMocks()`
- Check mock is called correctly: `toHaveBeenCalledWith()`
- Use `vi.resetModules()` if needed

## Production Readiness Checklist

- ✅ Unit tests for all services
- ✅ Component tests for all UI
- ✅ Integration tests for APIs
- ✅ E2E tests for user flows
- ✅ Error handling tested
- ✅ Edge cases covered
- ✅ 80%+ code coverage
- ✅ All tests passing
- ✅ Performance benchmarks met

## Resources

- [Vitest Documentation](https://vitest.dev)
- [Testing Library](https://testing-library.com)
- [Jest Expect API](https://jestjs.io/docs/expect)

## Questions?

For questions about testing, please refer to:
1. This guide
2. Existing test examples
3. Vitest documentation
4. Team wiki/confluence
