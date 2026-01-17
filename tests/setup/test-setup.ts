import { vi } from 'vitest';

// Setup global test environment

// Mock environment variables
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/petrocourses_test';
process.env.NEXTAUTH_SECRET = 'test_secret_key_123';

// Mock window object for browser APIs
global.window = {
  location: {
    href: 'http://localhost:3000',
  },
} as any;

// Suppress console output during tests
global.console = {
  ...console,
  log: vi.fn(),
  debug: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
};

// Mock fetch if needed
global.fetch = vi.fn();

// Setup afterEach cleanup
afterEach(() => {
  vi.clearAllMocks();
});
