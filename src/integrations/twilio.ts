/**
 * Twilio Integration
 * Service for sending SMS and other communications
 * Docs: https://www.twilio.com
 */

export interface SmsPayload {
  to: string; // Phone number
  body: string;
  from?: string;
}

export interface SmsResponse {
  success: boolean;
  messageId?: string;
  status?: string;
  error?: string;
}

export interface WhatsAppPayload {
  to: string; // Phone number
  message: string;
  mediaUrl?: string;
}

export interface TwilioResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Twilio client wrapper
 * Requires: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER
 */
class TwilioService {
  private accountSid: string;
  private authToken: string;
  private phoneNumber: string;
  private baseUrl = "https://api.twilio.com";

  constructor() {
    this.accountSid = process.env.TWILIO_ACCOUNT_SID || "";
    this.authToken = process.env.TWILIO_AUTH_TOKEN || "";
    this.phoneNumber = process.env.TWILIO_PHONE_NUMBER || "";

    if (!this.accountSid || !this.authToken || !this.phoneNumber) {
      console.warn("Twilio credentials not fully configured");
    }
  }

  /**
   * Get authorization header for Twilio API
   */
  private getAuthHeader(): string {
    const credentials = `${this.accountSid}:${this.authToken}`;
    const encoded = Buffer.from(credentials).toString("base64");
    return `Basic ${encoded}`;
  }

  /**
   * Send an SMS
   */
  async sendSms(payload: SmsPayload): Promise<SmsResponse> {
    if (!this.accountSid || !this.authToken || !this.phoneNumber) {
      return { success: false, error: "Twilio not configured" };
    }

    try {
      const formData = new URLSearchParams({
        To: payload.to,
        From: payload.from || this.phoneNumber,
        Body: payload.body,
      });

      const response = await fetch(
        `${this.baseUrl}/2010-04-01/Accounts/${this.accountSid}/Messages.json`,
        {
          method: "POST",
          headers: {
            Authorization: this.getAuthHeader(),
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        }
      );

      const data = await response.json() as any;

      if (!response.ok) {
        return {
          success: false,
          error: data.message || "Failed to send SMS",
        };
      }

      return {
        success: true,
        messageId: data.sid,
        status: data.status,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Send booking reminder SMS
   */
  async sendBookingReminderSms(
    phoneNumber: string,
    expertName: string,
    date: string,
    time: string
  ): Promise<SmsResponse> {
    const message = `Hi! This is a reminder for your booking with ${expertName} on ${date} at ${time}. Looking forward to speaking with you!`;
    return this.sendSms({
      to: phoneNumber,
      body: message,
    });
  }

  /**
   * Send enrollment confirmation SMS
   */
  async sendEnrollmentSms(
    phoneNumber: string,
    courseTitle: string
  ): Promise<SmsResponse> {
    const message = `Welcome to PetroCourses! You've successfully enrolled in "${courseTitle}". Start learning: ${process.env.NEXT_PUBLIC_BASE_URL}/training/learning`;
    return this.sendSms({
      to: phoneNumber,
      body: message,
    });
  }

  /**
   * Send payment confirmation SMS
   */
  async sendPaymentConfirmationSms(
    phoneNumber: string,
    amount: number,
    currency: string,
    orderId: string
  ): Promise<SmsResponse> {
    const message = `Payment received! Amount: ${currency} ${amount}. Order ID: ${orderId}. Thank you for your purchase on PetroCourses.`;
    return this.sendSms({
      to: phoneNumber,
      body: message,
    });
  }

  /**
   * Send OTP (One-Time Password) for authentication
   */
  async sendOtpSms(phoneNumber: string, otp: string): Promise<SmsResponse> {
    const message = `Your PetroCourses verification code is: ${otp}. Do not share this with anyone.`;
    return this.sendSms({
      to: phoneNumber,
      body: message,
    });
  }

  /**
   * Send course reminder SMS
   */
  async sendCourseReminderSms(
    phoneNumber: string,
    courseTitle: string
  ): Promise<SmsResponse> {
    const message = `Reminder: You have an active course "${courseTitle}" on PetroCourses. Continue learning: ${process.env.NEXT_PUBLIC_BASE_URL}/training/learning`;
    return this.sendSms({
      to: phoneNumber,
      body: message,
    });
  }

  /**
   * Send certificate completion SMS
   */
  async sendCertificationSms(
    phoneNumber: string,
    courseTitle: string
  ): Promise<SmsResponse> {
    const message = `Congratulations! You've completed "${courseTitle}" on PetroCourses. Download your certificate: ${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/certificates`;
    return this.sendSms({
      to: phoneNumber,
      body: message,
    });
  }

  /**
   * Format phone number to E.164 format
   * Handles various formats and converts to +1234567890
   */
  static formatPhoneNumber(phone: string, countryCode: string = "+1"): string {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, "");

    // If already has country code prefix
    if (phone.startsWith("+")) {
      return phone;
    }

    // Add country code if not present
    if (cleaned.length === 10) {
      return `${countryCode}${cleaned}`;
    }

    if (cleaned.length === 11 && cleaned.startsWith("1")) {
      return `+${cleaned}`;
    }

    // Return as-is if already formatted
    return `${countryCode}${cleaned}`;
  }

  /**
   * Validate phone number format
   */
  static validatePhoneNumber(phone: string): boolean {
    const e164Pattern = /^\+[1-9]\d{1,14}$/;
    return e164Pattern.test(phone);
  }
}

// Singleton instance
let twilioInstance: TwilioService | null = null;

export const getTwilioService = (): TwilioService => {
  if (!twilioInstance) {
    twilioInstance = new TwilioService();
  }
  return twilioInstance;
};

export default TwilioService;
