/**
 * Resend Email Integration
 * Service for sending transactional emails via Resend
 * Docs: https://resend.com
 */

export interface EmailRecipient {
  email: string;
  name?: string;
}

export interface EmailPayload {
  to: EmailRecipient | EmailRecipient[];
  from?: string;
  subject: string;
  html?: string;
  text?: string;
  replyTo?: string;
  cc?: EmailRecipient[];
  bcc?: EmailRecipient[];
}

export interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Resend client wrapper
 * Initialize with API key from environment: RESEND_API_KEY
 */
class ResendService {
  private apiKey: string;
  private baseUrl = "https://api.resend.com";
  private fromEmail: string;

  constructor() {
    this.apiKey = process.env.RESEND_API_KEY || "";
    this.fromEmail = process.env.RESEND_FROM_EMAIL || "noreply@petrocourses.com";

    if (!this.apiKey) {
      console.warn("RESEND_API_KEY not configured");
    }
  }

  /**
   * Send an email
   */
  async send(payload: EmailPayload): Promise<EmailResponse> {
    if (!this.apiKey) {
      return {
        success: false,
        error: "Resend API key not configured",
      };
    }

    try {
      const response = await fetch(`${this.baseUrl}/emails`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: payload.from || this.fromEmail,
          to: Array.isArray(payload.to)
            ? payload.to.map((r) => r.email).join(",")
            : payload.to.email,
          subject: payload.subject,
          html: payload.html,
          text: payload.text,
          reply_to: payload.replyTo,
          cc: payload.cc?.map((r) => r.email).join(","),
          bcc: payload.bcc?.map((r) => r.email).join(","),
        }),
      });

      const data = await response.json() as any;

      if (!response.ok) {
        return {
          success: false,
          error: data.message || "Failed to send email",
        };
      }

      return {
        success: true,
        messageId: data.id,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }

  /**
   * Send welcome email
   */
  async sendWelcomeEmail(
    email: string,
    name: string
  ): Promise<EmailResponse> {
    return this.send({
      to: { email, name },
      subject: "Welcome to PetroCourses",
      html: `<h1>Welcome, ${name}!</h1><p>We're excited to have you on PetroCourses.</p>`,
    });
  }

  /**
   * Send enrollment confirmation
   */
  async sendEnrollmentConfirmation(
    email: string,
    courseTitle: string,
    courseName: string
  ): Promise<EmailResponse> {
    return this.send({
      to: { email },
      subject: `Enrollment Confirmed: ${courseTitle}`,
      html: `<h2>Course Enrollment Confirmed</h2><p>You have successfully enrolled in <strong>${courseTitle}</strong></p><p>Start learning: <a href="${process.env.NEXT_PUBLIC_BASE_URL}/training/learning/${courseName}">Access Course</a></p>`,
    });
  }

  /**
   * Send password reset email
   */
  async sendPasswordResetEmail(
    email: string,
    resetToken: string
  ): Promise<EmailResponse> {
    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password/${resetToken}`;
    return this.send({
      to: { email },
      subject: "Reset Your Password",
      html: `<h2>Password Reset Request</h2><p>Click the link below to reset your password:</p><p><a href="${resetLink}">Reset Password</a></p><p>This link expires in 24 hours.</p>`,
    });
  }

  /**
   * Send email verification
   */
  async sendVerificationEmail(
    email: string,
    verificationToken: string
  ): Promise<EmailResponse> {
    const verifyLink = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-email/${verificationToken}`;
    return this.send({
      to: { email },
      subject: "Verify Your Email Address",
      html: `<h2>Email Verification</h2><p>Click the link below to verify your email:</p><p><a href="${verifyLink}">Verify Email</a></p>`,
    });
  }

  /**
   * Send payment receipt
   */
  async sendPaymentReceipt(
    email: string,
    amount: number,
    currency: string,
    orderId: string
  ): Promise<EmailResponse> {
    return this.send({
      to: { email },
      subject: `Payment Receipt - Order #${orderId}`,
      html: `<h2>Payment Received</h2><p>Thank you for your payment of <strong>${currency} ${amount}</strong></p><p>Order ID: ${orderId}</p>`,
    });
  }

  /**
   * Send booking confirmation
   */
  async sendBookingConfirmation(
    email: string,
    expertName: string,
    date: string,
    time: string,
    bookingId: string
  ): Promise<EmailResponse> {
    return this.send({
      to: { email },
      subject: "Booking Confirmation",
      html: `<h2>Your Booking is Confirmed</h2><p>Expert: ${expertName}</p><p>Date: ${date}</p><p>Time: ${time}</p><p>Booking ID: ${bookingId}</p>`,
    });
  }
}

// Singleton instance
let resendInstance: ResendService | null = null;

export const getResendService = (): ResendService => {
  if (!resendInstance) {
    resendInstance = new ResendService();
  }
  return resendInstance;
};

export default ResendService;
