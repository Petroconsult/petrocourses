/**
 * PostHog Integration
 * Service for product analytics and event tracking
 * Docs: https://posthog.com
 */

export interface EventProperties {
  [key: string]: any;
}

export interface UserProperties {
  email?: string;
  name?: string;
  role?: string;
  plan?: string;
  [key: string]: any;
}

export interface PostHogEvent {
  event: string;
  properties?: EventProperties;
  timestamp?: Date;
}

export interface PostHogUser {
  userId: string;
  properties: UserProperties;
}

export interface AnalyticsResponse {
  success: boolean;
  error?: string;
}

/**
 * PostHog client wrapper
 * Requires: NEXT_PUBLIC_POSTHOG_KEY, NEXT_PUBLIC_POSTHOG_HOST
 */
class PostHogService {
  private apiKey: string;
  private host: string;
  private projectId: string;

  constructor() {
    this.apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY || "";
    this.host =
      process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com";
    this.projectId = this.extractProjectId(this.apiKey);

    if (!this.apiKey) {
      console.warn("PostHog API key not configured");
    }
  }

  /**
   * Extract project ID from API key
   */
  private extractProjectId(apiKey: string): string {
    // PostHog keys are in format: phc_xxxxx
    return apiKey.split("_")[1] || "";
  }

  /**
   * Capture a custom event
   */
  async capture(
    userId: string,
    event: PostHogEvent
  ): Promise<AnalyticsResponse> {
    if (!this.apiKey) {
      return { success: false, error: "PostHog not configured" };
    }

    try {
      const response = await fetch(`${this.host}/capture/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: this.apiKey,
          event: event.event,
          properties: {
            distinct_id: userId,
            ...event.properties,
          },
          timestamp: event.timestamp?.toISOString() || new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        return {
          success: false,
          error: `Failed to capture event: ${response.statusText}`,
        };
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Identify a user
   */
  async identify(user: PostHogUser): Promise<AnalyticsResponse> {
    if (!this.apiKey) {
      return { success: false, error: "PostHog not configured" };
    }

    try {
      const response = await fetch(`${this.host}/capture/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: this.apiKey,
          event: "$identify",
          distinct_id: user.userId,
          properties: {
            $set: user.properties,
          },
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        return {
          success: false,
          error: `Failed to identify user: ${response.statusText}`,
        };
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Track user signup
   */
  async trackSignup(userId: string, email: string): Promise<AnalyticsResponse> {
    return this.capture(userId, {
      event: "User Signup",
      properties: {
        email,
        timestamp: new Date(),
      },
    });
  }

  /**
   * Track course enrollment
   */
  async trackCourseEnrollment(
    userId: string,
    courseId: string,
    courseTitle: string,
    price: number
  ): Promise<AnalyticsResponse> {
    return this.capture(userId, {
      event: "Course Enrolled",
      properties: {
        course_id: courseId,
        course_title: courseTitle,
        price,
        timestamp: new Date(),
      },
    });
  }

  /**
   * Track payment completion
   */
  async trackPaymentCompleted(
    userId: string,
    amount: number,
    currency: string,
    orderId: string
  ): Promise<AnalyticsResponse> {
    return this.capture(userId, {
      event: "Payment Completed",
      properties: {
        amount,
        currency,
        order_id: orderId,
        timestamp: new Date(),
      },
    });
  }

  /**
   * Track course completion
   */
  async trackCourseCompleted(
    userId: string,
    courseId: string,
    courseTitle: string,
    durationDays: number
  ): Promise<AnalyticsResponse> {
    return this.capture(userId, {
      event: "Course Completed",
      properties: {
        course_id: courseId,
        course_title: courseTitle,
        duration_days: durationDays,
        timestamp: new Date(),
      },
    });
  }

  /**
   * Track lesson view
   */
  async trackLessonView(
    userId: string,
    courseId: string,
    lessonId: string,
    lessonTitle: string
  ): Promise<AnalyticsResponse> {
    return this.capture(userId, {
      event: "Lesson Viewed",
      properties: {
        course_id: courseId,
        lesson_id: lessonId,
        lesson_title: lessonTitle,
        timestamp: new Date(),
      },
    });
  }

  /**
   * Track booking created
   */
  async trackBookingCreated(
    userId: string,
    bookingId: string,
    expertName: string,
    serviceType: string
  ): Promise<AnalyticsResponse> {
    return this.capture(userId, {
      event: "Booking Created",
      properties: {
        booking_id: bookingId,
        expert_name: expertName,
        service_type: serviceType,
        timestamp: new Date(),
      },
    });
  }

  /**
   * Track quiz attempt
   */
  async trackQuizAttempt(
    userId: string,
    courseId: string,
    quizId: string,
    score: number,
    passed: boolean
  ): Promise<AnalyticsResponse> {
    return this.capture(userId, {
      event: "Quiz Attempted",
      properties: {
        course_id: courseId,
        quiz_id: quizId,
        score,
        passed,
        timestamp: new Date(),
      },
    });
  }

  /**
   * Track certificate download
   */
  async trackCertificateDownload(
    userId: string,
    courseId: string,
    courseTitle: string
  ): Promise<AnalyticsResponse> {
    return this.capture(userId, {
      event: "Certificate Downloaded",
      properties: {
        course_id: courseId,
        course_title: courseTitle,
        timestamp: new Date(),
      },
    });
  }

  /**
   * Track support ticket creation
   */
  async trackSupportTicketCreated(
    userId: string,
    ticketId: string,
    category: string
  ): Promise<AnalyticsResponse> {
    return this.capture(userId, {
      event: "Support Ticket Created",
      properties: {
        ticket_id: ticketId,
        category,
        timestamp: new Date(),
      },
    });
  }

  /**
   * Get feature flag value (client-side)
   * In production, use PostHog SDK directly on client
   */
  async getFeatureFlag(userId: string, flagName: string): Promise<boolean> {
    // This is a placeholder - actual implementation should use PostHog SDK
    // For now, return false as default
    console.log(`Feature flag check: ${flagName} for user ${userId}`);
    return false;
  }
}

// Singleton instance
let posthogInstance: PostHogService | null = null;

export const getPostHogService = (): PostHogService => {
  if (!posthogInstance) {
    posthogInstance = new PostHogService();
  }
  return posthogInstance;
};

export default PostHogService;
