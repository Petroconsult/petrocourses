/**
 * Firebase Integration
 * Service for push notifications, real-time messaging, and other features
 * Docs: https://firebase.google.com
 */

export interface PushNotificationPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  sound?: string;
  tag?: string;
  color?: string;
  clickAction?: string;
  data?: Record<string, string>;
}

export interface FirebaseUser {
  uid: string;
  email: string;
  displayName?: string;
}

export interface PushNotificationResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

export interface FirebaseResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Firebase client wrapper
 * Requires: FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL
 */
class FirebaseService {
  private projectId: string;
  private privateKey: string;
  private clientEmail: string;
  private baseUrl = "https://fcm.googleapis.com";
  private accessToken: string = "";
  private tokenExpiry: number = 0;

  constructor() {
    this.projectId = process.env.FIREBASE_PROJECT_ID || "";
    this.privateKey = process.env.FIREBASE_PRIVATE_KEY || "";
    this.clientEmail = process.env.FIREBASE_CLIENT_EMAIL || "";

    if (!this.projectId || !this.privateKey || !this.clientEmail) {
      console.warn("Firebase credentials not fully configured");
    }
  }

  /**
   * Get Firebase access token
   */
  private async getAccessToken(): Promise<string> {
    // Check if token is still valid
    if (this.accessToken && this.tokenExpiry > Date.now()) {
      return this.accessToken;
    }

    try {
      const now = Math.floor(Date.now() / 1000);
      const exp = now + 3600; // 1 hour

      // Create JWT header and payload
      const header = {
        alg: "RS256",
        typ: "JWT",
      };

      const payload = {
        iss: this.clientEmail,
        scope: "https://www.googleapis.com/auth/firebase.messaging",
        aud: "https://oauth2.googleapis.com/token",
        exp,
        iat: now,
      };

      // Base64 encode header and payload
      const encodedHeader = Buffer.from(JSON.stringify(header)).toString(
        "base64url"
      );
      const encodedPayload = Buffer.from(JSON.stringify(payload)).toString(
        "base64url"
      );

      // Create signature (in production, use proper JWT library)
      const message = `${encodedHeader}.${encodedPayload}`;
      // Note: This is a placeholder - actual implementation requires crypto signing
      const signature = Buffer.from(message).toString("base64url");

      const jwt = `${message}.${signature}`;

      // Exchange JWT for access token
      const response = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
          assertion: jwt,
        }).toString(),
      });

      const data = await response.json() as any;

      if (!response.ok) {
        throw new Error(data.error_description || "Failed to get access token");
      }

      this.accessToken = data.access_token;
      this.tokenExpiry = Date.now() + data.expires_in * 1000;
      return this.accessToken;
    } catch (error) {
      console.error("Failed to get Firebase access token:", error);
      throw error;
    }
  }

  /**
   * Send push notification to a device
   */
  async sendPushNotification(
    deviceToken: string,
    payload: PushNotificationPayload
  ): Promise<PushNotificationResponse> {
    if (!this.projectId) {
      return { success: false, error: "Firebase not configured" };
    }

    try {
      const accessToken = await this.getAccessToken();

      const response = await fetch(
        `${this.baseUrl}/v1/projects/${this.projectId}/messages:send`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            message: {
              token: deviceToken,
              notification: {
                title: payload.title,
                body: payload.body,
                icon: payload.icon,
              },
              data: payload.data,
              android: {
                priority: "high",
                notification: {
                  sound: payload.sound || "default",
                  tag: payload.tag,
                  color: payload.color,
                  click_action: payload.clickAction,
                },
              },
              apns: {
                headers: {
                  "apns-priority": "10",
                },
              },
            },
          }),
        }
      );

      const data = await response.json() as any;

      if (!response.ok) {
        return {
          success: false,
          error: data.error?.message || "Failed to send notification",
        };
      }

      return {
        success: true,
        messageId: data.name,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Send push notification to multiple devices (topic)
   */
  async sendTopicNotification(
    topic: string,
    payload: PushNotificationPayload
  ): Promise<PushNotificationResponse> {
    if (!this.projectId) {
      return { success: false, error: "Firebase not configured" };
    }

    try {
      const accessToken = await this.getAccessToken();

      const response = await fetch(
        `${this.baseUrl}/v1/projects/${this.projectId}/messages:send`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            message: {
              topic,
              notification: {
                title: payload.title,
                body: payload.body,
              },
              data: payload.data,
            },
          }),
        }
      );

      const data = await response.json() as any;

      if (!response.ok) {
        return {
          success: false,
          error: data.error?.message || "Failed to send topic notification",
        };
      }

      return {
        success: true,
        messageId: data.name,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Subscribe device to topic
   */
  async subscribeToTopic(
    deviceToken: string,
    topic: string
  ): Promise<FirebaseResponse<null>> {
    if (!this.projectId) {
      return { success: false, error: "Firebase not configured" };
    }

    try {
      const accessToken = await this.getAccessToken();

      const response = await fetch(
        `${this.baseUrl}/iid/v1/${deviceToken}?to=/topics/${topic}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        return {
          success: false,
          error: `Failed to subscribe to topic: ${response.statusText}`,
        };
      }

      return { success: true, data: null };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Send enrollment notification
   */
  async sendEnrollmentNotification(
    deviceToken: string,
    courseTitle: string
  ): Promise<PushNotificationResponse> {
    return this.sendPushNotification(deviceToken, {
      title: "Course Enrolled",
      body: `You've successfully enrolled in ${courseTitle}`,
      clickAction: "FLUTTER_NOTIFICATION_CLICK",
      data: {
        type: "enrollment",
      },
    });
  }

  /**
   * Send payment confirmation notification
   */
  async sendPaymentNotification(
    deviceToken: string,
    amount: number,
    currency: string
  ): Promise<PushNotificationResponse> {
    return this.sendPushNotification(deviceToken, {
      title: "Payment Received",
      body: `Payment of ${currency} ${amount} has been processed`,
      clickAction: "FLUTTER_NOTIFICATION_CLICK",
      data: {
        type: "payment",
      },
    });
  }

  /**
   * Send booking confirmation notification
   */
  async sendBookingNotification(
    deviceToken: string,
    expertName: string,
    date: string
  ): Promise<PushNotificationResponse> {
    return this.sendPushNotification(deviceToken, {
      title: "Booking Confirmed",
      body: `Your booking with ${expertName} on ${date} is confirmed`,
      clickAction: "FLUTTER_NOTIFICATION_CLICK",
      data: {
        type: "booking",
      },
    });
  }

  /**
   * Send course completion notification
   */
  async sendCompletionNotification(
    deviceToken: string,
    courseTitle: string
  ): Promise<PushNotificationResponse> {
    return this.sendPushNotification(deviceToken, {
      title: "Course Completed!",
      body: `Congratulations! You've completed ${courseTitle}`,
      clickAction: "FLUTTER_NOTIFICATION_CLICK",
      data: {
        type: "completion",
      },
    });
  }

  /**
   * Send reminder notification
   */
  async sendReminderNotification(
    deviceToken: string,
    message: string
  ): Promise<PushNotificationResponse> {
    return this.sendPushNotification(deviceToken, {
      title: "Reminder",
      body: message,
      clickAction: "FLUTTER_NOTIFICATION_CLICK",
      data: {
        type: "reminder",
      },
    });
  }

  /**
   * Send broadcast to all users subscribed to a topic
   */
  async broadcastNotification(
    topic: string,
    payload: PushNotificationPayload
  ): Promise<PushNotificationResponse> {
    return this.sendTopicNotification(topic, payload);
  }
}

// Singleton instance
let firebaseInstance: FirebaseService | null = null;

export const getFirebaseService = (): FirebaseService => {
  if (!firebaseInstance) {
    firebaseInstance = new FirebaseService();
  }
  return firebaseInstance;
};

export default FirebaseService;
