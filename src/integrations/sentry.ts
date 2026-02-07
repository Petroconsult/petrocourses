/**
 * Sentry Integration
 * Service for error tracking and performance monitoring
 * Docs: https://sentry.io
 */

export interface SentryError {
  message: string;
  level?: "fatal" | "error" | "warning" | "info" | "debug";
  tags?: Record<string, string>;
  contexts?: Record<string, any>;
  extra?: Record<string, any>;
  fingerprint?: string[];
  userId?: string;
}

export interface SentryTransaction {
  name: string;
  operation: string;
  duration: number; // milliseconds
  status: "ok" | "cancelled" | "unknown" | "unauthenticated" | "permission_denied" | "invalid_argument" | "deadline_exceeded" | "not_found" | "already_exists" | "permission_denied" | "resource_exhausted" | "failed_precondition" | "aborted" | "out_of_range" | "unimplemented" | "internal" | "unavailable" | "data_loss";
  tags?: Record<string, string>;
}

export interface ErrorResponse {
  success: boolean;
  eventId?: string;
  error?: string;
}

/**
 * Sentry client wrapper
 * Requires: NEXT_PUBLIC_SENTRY_DSN
 */
class SentryService {
  private dsn: string;
  private environment: string;
  private tracesSampleRate: number;

  constructor() {
    this.dsn = process.env.NEXT_PUBLIC_SENTRY_DSN || "";
    this.environment = process.env.NODE_ENV || "development";
    this.tracesSampleRate =
      parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE || "0.1");

    if (!this.dsn) {
      console.warn("Sentry DSN not configured");
    }
  }

  /**
   * Capture an exception
   */
  async captureException(
    error: Error | string,
    payload?: SentryError
  ): Promise<ErrorResponse> {
    if (!this.dsn) {
      return { success: false, error: "Sentry not configured" };
    }

    try {
      const message =
        error instanceof Error ? error.message : String(error);
      const stack =
        error instanceof Error ? error.stack : undefined;

      const response = await fetch(this.getIngestUrl(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_id: this.generateUUID(),
          timestamp: new Date().toISOString(),
          level: payload?.level || "error",
          message,
          exception: stack
            ? {
                values: [
                  {
                    type: error instanceof Error ? error.name : "Error",
                    value: message,
                    stacktrace: {
                      frames: this.parseStackTrace(stack),
                    },
                  },
                ],
              }
            : undefined,
          tags: {
            environment: this.environment,
            ...payload?.tags,
          },
          contexts: {
            app: {
              type: "app",
            },
            ...payload?.contexts,
          },
          extra: payload?.extra,
          fingerprint: payload?.fingerprint,
          user: payload?.userId
            ? {
                id: payload.userId,
              }
            : undefined,
        }),
      });

      const data = await response.json() as any;

      if (!response.ok) {
        return {
          success: false,
          error: data.error || "Failed to capture exception",
        };
      }

      return {
        success: true,
        eventId: data.event_id,
      };
    } catch (error) {
      console.error("Failed to send error to Sentry:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Capture a message
   */
  async captureMessage(
    message: string,
    level: "fatal" | "error" | "warning" | "info" | "debug" = "info"
  ): Promise<ErrorResponse> {
    if (!this.dsn) {
      return { success: false, error: "Sentry not configured" };
    }

    try {
      const response = await fetch(this.getIngestUrl(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_id: this.generateUUID(),
          timestamp: new Date().toISOString(),
          level,
          message,
          tags: {
            environment: this.environment,
          },
        }),
      });

      const data = await response.json() as any;

      if (!response.ok) {
        return {
          success: false,
          error: data.error || "Failed to capture message",
        };
      }

      return {
        success: true,
        eventId: data.event_id,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Track a transaction (performance monitoring)
   */
  async trackTransaction(transaction: SentryTransaction): Promise<ErrorResponse> {
    if (!this.dsn) {
      return { success: false, error: "Sentry not configured" };
    }

    try {
      const response = await fetch(this.getIngestUrl(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_id: this.generateUUID(),
          timestamp: new Date().toISOString(),
          type: "transaction",
          transaction: transaction.name,
          start_timestamp: new Date().getTime() / 1000,
          timestamp: (new Date().getTime() + transaction.duration) / 1000,
          spans: [
            {
              op: transaction.operation,
              description: transaction.name,
              start_timestamp:
                new Date().getTime() / 1000,
              timestamp:
                (new Date().getTime() + transaction.duration) / 1000,
              status: transaction.status,
            },
          ],
          tags: {
            environment: this.environment,
            ...transaction.tags,
          },
        }),
      });

      const data = await response.json() as any;

      if (!response.ok) {
        return {
          success: false,
          error: data.error || "Failed to track transaction",
        };
      }

      return {
        success: true,
        eventId: data.event_id,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Set user context
   */
  setUserContext(userId: string, email?: string, username?: string): void {
    // In production, use Sentry SDK directly
    // This is a placeholder for documentation
    console.log(`Sentry: Set user context - ${userId}`);
  }

  /**
   * Add breadcrumb
   */
  addBreadcrumb(message: string, category: string = "user-action"): void {
    // In production, use Sentry SDK directly
    console.log(`Sentry breadcrumb [${category}]: ${message}`);
  }

  /**
   * Get ingest URL from DSN
   */
  private getIngestUrl(): string {
    // Parse DSN to construct ingest URL
    // Format: https://<key>@<host>/api/<project_id>/store/
    const dsnMatch = this.dsn.match(
      /https:\/\/([a-f0-9]+)@([a-z0-9.-]+)\/(\d+)/
    );

    if (!dsnMatch) {
      throw new Error("Invalid Sentry DSN");
    }

    const [, key, host, projectId] = dsnMatch;
    return `https://${host}/api/${projectId}/store/?sentry_key=${key}&sentry_version=7`;
  }

  /**
   * Generate UUID v4
   */
  private generateUUID(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  /**
   * Parse stack trace into Sentry format
   */
  private parseStackTrace(
    stack: string
  ): Array<{
    filename: string;
    function: string;
    lineno: number;
    colno: number;
  }> {
    const frames: Array<{
      filename: string;
      function: string;
      lineno: number;
      colno: number;
    }> = [];

    const lines = stack.split("\n");
    for (const line of lines) {
      const match = line.match(/at\s+(.+?)\s+\((.+?):(\d+):(\d+)\)/);
      if (match) {
        const [, func, filename, lineno, colno] = match;
        frames.push({
          filename,
          function: func || "unknown",
          lineno: parseInt(lineno, 10),
          colno: parseInt(colno, 10),
        });
      }
    }

    return frames;
  }

  /**
   * Track API errors
   */
  async trackApiError(
    method: string,
    url: string,
    statusCode: number,
    errorMessage: string,
    userId?: string
  ): Promise<ErrorResponse> {
    return this.captureException(new Error(errorMessage), {
      level: statusCode >= 500 ? "error" : "warning",
      tags: {
        method,
        url,
        status_code: statusCode.toString(),
        type: "api_error",
      },
      contexts: {
        http: {
          method,
          url,
          status_code: statusCode,
        },
      },
      userId,
    });
  }

  /**
   * Track payment errors
   */
  async trackPaymentError(
    errorMessage: string,
    provider: string,
    orderId?: string,
    userId?: string
  ): Promise<ErrorResponse> {
    return this.captureException(new Error(errorMessage), {
      level: "error",
      tags: {
        payment_provider: provider,
        type: "payment_error",
      },
      extra: {
        order_id: orderId,
      },
      userId,
    });
  }

  /**
   * Track course/enrollment errors
   */
  async trackEnrollmentError(
    errorMessage: string,
    courseId: string,
    userId?: string
  ): Promise<ErrorResponse> {
    return this.captureException(new Error(errorMessage), {
      level: "error",
      tags: {
        course_id: courseId,
        type: "enrollment_error",
      },
      userId,
    });
  }
}

// Singleton instance
let sentryInstance: SentryService | null = null;

export const getSentryService = (): SentryService => {
  if (!sentryInstance) {
    sentryInstance = new SentryService();
  }
  return sentryInstance;
};

export default SentryService;
