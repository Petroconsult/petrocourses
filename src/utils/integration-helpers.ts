/**
 * Integration Utility Functions
 * Common helpers across all integrations
 */

/**
 * Retry logic with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxAttempts: number = 3,
  initialDelayMs: number = 1000,
  maxDelayMs: number = 30000,
  backoffMultiplier: number = 2
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt < maxAttempts - 1) {
        const delayMs = Math.min(
          initialDelayMs * Math.pow(backoffMultiplier, attempt),
          maxDelayMs
        );

        console.warn(
          `Attempt ${attempt + 1} failed. Retrying in ${delayMs}ms...`
        );

        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }

  throw lastError || new Error('Max retries exceeded');
}

/**
 * Timeout wrapper for promises
 */
export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number,
  timeoutMessage: string = 'Operation timed out'
): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(
        () => reject(new Error(timeoutMessage)),
        timeoutMs
      )
    ),
  ]);
}

/**
 * Rate limiter
 */
export class RateLimiter {
  private requestTimestamps: number[] = [];

  constructor(private maxRequests: number, private windowMs: number) {}

  canMakeRequest(): boolean {
    const now = Date.now();
    const cutoffTime = now - this.windowMs;

    // Remove old timestamps outside the window
    this.requestTimestamps = this.requestTimestamps.filter(
      (ts) => ts > cutoffTime
    );

    // Check if we can make a request
    if (this.requestTimestamps.length < this.maxRequests) {
      this.requestTimestamps.push(now);
      return true;
    }

    return false;
  }

  async waitForSlot(): Promise<void> {
    while (!this.canMakeRequest()) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  getRemainingRequests(): number {
    const now = Date.now();
    const cutoffTime = now - this.windowMs;
    const activeRequests = this.requestTimestamps.filter(
      (ts) => ts > cutoffTime
    ).length;
    return Math.max(0, this.maxRequests - activeRequests);
  }
}

/**
 * Validate email address
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number format
 */
export function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^\+[1-9]\d{1,14}$/;
  return phoneRegex.test(phone);
}

/**
 * Parse error response from API
 */
export function parseApiError(error: unknown): {
  message: string;
  code?: string;
  details?: Record<string, any>;
} {
  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }

  if (typeof error === 'object' && error !== null) {
    const obj = error as Record<string, any>;
    return {
      message: obj.message || obj.error || JSON.stringify(error),
      code: obj.code || obj.errorCode,
      details: obj.details || obj.extra,
    };
  }

  return {
    message: String(error),
  };
}

/**
 * Generate unique request ID
 */
export function generateRequestId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Mask sensitive data for logging
 */
export function maskSensitiveData(
  data: Record<string, any>,
  keysToMask: string[] = ['password', 'token', 'secret', 'key', 'apiKey']
): Record<string, any> {
  const masked = { ...data };

  for (const key of keysToMask) {
    if (key in masked) {
      masked[key] = '***REDACTED***';
    }
  }

  return masked;
}

/**
 * Convert milliseconds to human-readable format
 */
export function formatDuration(ms: number): string {
  if (ms < 1000) {
    return `${Math.round(ms)}ms`;
  }

  if (ms < 60000) {
    return `${(ms / 1000).toFixed(2)}s`;
  }

  if (ms < 3600000) {
    return `${(ms / 60000).toFixed(2)}m`;
  }

  return `${(ms / 3600000).toFixed(2)}h`;
}

/**
 * Logger with integration context
 */
export class IntegrationLogger {
  constructor(private serviceName: string) {}

  debug(message: string, data?: any) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${this.serviceName}] 🔧 ${message}`, data);
    }
  }

  info(message: string, data?: any) {
    console.log(`[${this.serviceName}] ℹ️  ${message}`, data);
  }

  warn(message: string, data?: any) {
    console.warn(`[${this.serviceName}] ⚠️  ${message}`, data);
  }

  error(message: string, error?: any) {
    console.error(
      `[${this.serviceName}] ❌ ${message}`,
      error ? maskSensitiveData(parseApiError(error)) : ''
    );
  }

  time(label: string) {
    return {
      end: () => {
        this.debug(`${label} completed`);
      },
    };
  }
}

/**
 * Build query string from parameters
 */
export function buildQueryString(
  params: Record<string, string | number | boolean | undefined>
): string {
  const filtered = Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`);

  return filtered.length > 0 ? `?${filtered.join('&')}` : '';
}

/**
 * Wait for a condition to be true
 */
export async function waitFor(
  condition: () => boolean,
  maxWaitMs: number = 5000,
  checkIntervalMs: number = 100
): Promise<void> {
  const startTime = Date.now();

  while (!condition()) {
    if (Date.now() - startTime > maxWaitMs) {
      throw new Error('Timeout waiting for condition');
    }

    await new Promise((resolve) => setTimeout(resolve, checkIntervalMs));
  }
}

/**
 * Batch operations into chunks
 */
export function batchArray<T>(array: T[], batchSize: number): T[][] {
  const batches: T[][] = [];

  for (let i = 0; i < array.length; i += batchSize) {
    batches.push(array.slice(i, i + batchSize));
  }

  return batches;
}
