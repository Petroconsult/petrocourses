/**
 * Example: How to Use Integrations in Orchestrators
 * This shows the pattern for connecting services to business logic
 */

// ============================================
// PAYMENT ORCHESTRATOR EXAMPLE
// ============================================

import { getStripeService } from '@/integrations/stripe';
import { getResendService } from '@/integrations/resend';
import { getS3Service } from '@/integrations/s3';
import { getPostHogService } from '@/integrations/posthog';
import { getSentryService } from '@/integrations/sentry';
import { retryWithBackoff } from '@/utils/integration-helpers';

/**
 * Example: Process a course enrollment payment
 * Connects:
 * - Stripe (payment processing)
 * - Resend (confirmation email)
 * - PostHog (analytics)
 * - Sentry (error tracking)
 */
export async function processEnrollmentPayment(
  userId: string,
  courseId: string,
  amount: number,
  paymentMethodId: string
) {
  const stripe = getStripeService();
  const email = getResendService();
  const analytics = getPostHogService();
  const sentry = getSentryService();

  try {
    // Step 1: Process payment with Stripe
    console.log('💳 Processing payment...');
    const paymentIntent = await retryWithBackoff(
      () => stripe.createPaymentIntent(amount, { courseId, userId }),
      3
    );

    if (!paymentIntent.success) {
      throw new Error(`Payment failed: ${paymentIntent.error}`);
    }

    // Step 2: Send confirmation email
    console.log('📧 Sending confirmation email...');
    const emailResult = await email.sendEnrollmentConfirmation(
      userId,
      'Advanced Petroleum Engineering',
      'advanced-petroleum'
    );

    if (!emailResult.success) {
      console.warn('Email delivery failed, but payment succeeded');
    }

    // Step 3: Track analytics event
    console.log('📊 Logging analytics...');
    await analytics.trackPaymentCompleted(
      userId,
      amount,
      'USD',
      paymentIntent.data?.id
    );

    // Step 4: Return success
    return {
      success: true,
      paymentId: paymentIntent.data?.id,
      message: 'Enrollment successful!',
    };
  } catch (error) {
    // Step 5: Track error
    console.error('❌ Payment processing failed:', error);
    await sentry.trackPaymentError(
      error instanceof Error ? error.message : 'Unknown error',
      'stripe',
      courseId,
      userId
    );

    throw error;
  }
}

// ============================================
// BOOKING ORCHESTRATOR EXAMPLE
// ============================================

import { getCalendlyService } from '@/integrations/calendly';
import { getTwilioService } from '@/integrations/twilio';
import { getFirebaseService } from '@/integrations/firebase';

/**
 * Example: Create and confirm a booking
 * Connects:
 * - Calendly (scheduling)
 * - Resend (email confirmation)
 * - Twilio (SMS reminder)
 * - Firebase (push notification)
 */
export async function createAndConfirmBooking(
  userId: string,
  expertId: string,
  selectedTimeSlot: string,
  phoneNumber: string
) {
  const calendly = getCalendlyService();
  const email = getResendService();
  const sms = getTwilioService();
  const push = getFirebaseService();

  try {
    // Step 1: Create booking in calendar
    const booking = await calendly.createBooking({
      calendly_user_id: expertId,
      event_type_uuid: 'advisory-session',
      invitee_email: 'user@petrocourses.com',
      invitee_name: 'John Doe',
      scheduled_event_start_time: selectedTimeSlot,
    });

    if (!booking.success) {
      throw new Error('Failed to create calendar booking');
    }

    // Step 2: Send confirmation email
    await email.sendBookingConfirmation(
      'user@petrocourses.com',
      'Dr. Smith',
      '2025-02-15',
      '2:00 PM',
      booking.data?.id
    );

    // Step 3: Send SMS reminder
    const formattedPhone = getTwilioService.formatPhoneNumber(phoneNumber);
    await sms.sendBookingReminderSms(
      formattedPhone,
      'Dr. Smith',
      '2025-02-15',
      '2:00 PM'
    );

    // Step 4: Send push notification
    const deviceTokens = await getDeviceTokensForUser(userId);
    for (const token of deviceTokens) {
      await push.sendBookingNotification(token, 'Dr. Smith', '2025-02-15');
    }

    return { success: true, bookingId: booking.data?.id };
  } catch (error) {
    await sentry.captureException(error, {
      level: 'error',
      userId,
      tags: { type: 'booking_error' },
    });
    throw error;
  }
}

// ============================================
// COURSE COMPLETION & CERTIFICATION EXAMPLE
// ============================================

import { getS3Service as s3 } from '@/integrations/s3';

/**
 * Example: Generate and deliver certificate
 * Connects:
 * - S3 (certificate storage)
 * - Resend (email delivery)
 * - PostHog (analytics)
 * - Firebase (push notification)
 */
export async function completeCourseAndIssueCertificate(
  userId: string,
  courseId: string
) {
  const storage = s3();
  const email = getResendService();
  const analytics = getPostHogService();
  const push = getFirebaseService();

  try {
    // Step 1: Generate certificate PDF
    console.log('📜 Generating certificate...');
    const certificateBuffer = await generateCertificatePdf(
      userId,
      courseId
    );

    // Step 2: Store certificate in S3
    console.log('💾 Storing certificate...');
    const uploadResult = await storage.uploadCertificate(
      userId,
      courseId,
      certificateBuffer
    );

    if (!uploadResult.success) {
      throw new Error('Failed to store certificate');
    }

    // Step 3: Send certificate via email
    console.log('📧 Sending certificate...');
    const certificateUrl = uploadResult.data?.url;
    await email.send({
      to: { email: 'user@example.com' },
      subject: 'Your Course Completion Certificate',
      html: `<p>Congratulations! <a href="${certificateUrl}">Download your certificate</a></p>`,
    });

    // Step 4: Track completion
    console.log('📊 Recording completion...');
    await analytics.trackCourseCompleted(
      userId,
      courseId,
      'Advanced Petroleum',
      30 // days
    );

    // Step 5: Send push notification
    const deviceTokens = await getDeviceTokensForUser(userId);
    for (const token of deviceTokens) {
      await push.sendCompletionNotification(
        token,
        'Advanced Petroleum Engineering'
      );
    }

    return {
      success: true,
      certificateUrl,
      message: 'Certificate issued and sent!',
    };
  } catch (error) {
    await sentry.captureException(error, {
      userId,
      tags: { type: 'certification_error' },
    });
    throw error;
  }
}

// ============================================
// CHATBOT ORCHESTRATOR EXAMPLE
// ============================================

import { getOpenAIService } from '@/integrations/openai';

/**
 * Example: Chatbot response generation
 * Connects:
 * - OpenAI (LLM service)
 * - PostHog (analytics)
 * - Sentry (error tracking)
 */
export async function generateChatbotResponse(
  userId: string,
  courseId: string,
  question: string,
  conversationHistory: any[]
) {
  const openai = getOpenAIService();
  const analytics = getPostHogService();
  const sentry = getSentryService();

  try {
    // Step 1: Get course context
    const courseContext = await getCourseContext(courseId);

    // Step 2: Generate response
    console.log('🤖 Generating response...');
    const response = await openai.answerCourseQuestion(
      question,
      courseContext,
      conversationHistory
    );

    if (!response.success) {
      throw new Error('Failed to generate response');
    }

    // Step 3: Track interaction
    await analytics.capture(userId, {
      event: 'Chatbot Used',
      properties: {
        course_id: courseId,
        question_length: question.length,
      },
    });

    return {
      success: true,
      message: response.message,
      tokens: response.tokens,
    };
  } catch (error) {
    await sentry.captureException(error, {
      userId,
      contexts: { chatbot: { courseId, question } },
    });
    throw error;
  }
}

// ============================================
// ANALYTICS & REPORTING EXAMPLE
// ============================================

/**
 * Example: Generate revenue report
 * Connects:
 * - PostHog (analytics data)
 * - S3 (store report)
 * - Resend (send to admin)
 */
export async function generateRevenueReport(startDate: Date, endDate: Date) {
  const analytics = getPostHogService();
  const storage = s3();
  const email = getResendService();

  try {
    // Step 1: Get payment events from PostHog
    const payments = await analytics.getEvents('Payment Completed', {
      dateRange: { from: startDate, to: endDate },
    });

    // Step 2: Generate report
    const report = generateReportPdf(payments, startDate, endDate);

    // Step 3: Store report in S3
    const uploadResult = await storage.upload({
      key: `reports/revenue-${startDate.toISOString()}.pdf`,
      body: report,
      contentType: 'application/pdf',
      isPublic: false,
    });

    // Step 4: Send to admin
    const reportUrl = uploadResult.data?.url;
    await email.send({
      to: 'admin@petrocourses.com',
      subject: `Revenue Report: ${startDate.toDateString()} - ${endDate.toDateString()}`,
      html: `<p>Report: <a href="${reportUrl}">Download</a></p>`,
    });

    return {
      success: true,
      reportUrl,
      totalRevenue: calculateTotal(payments),
    };
  } catch (error) {
    await sentry.captureException(error, {
      level: 'error',
      tags: { type: 'reporting_error' },
    });
    throw error;
  }
}

// ============================================
// INTEGRATION PATTERN SUMMARY
// ============================================

/*
PATTERN:

1. Import services you need
   import { getServiceName } from '@/integrations';

2. Get singleton instances
   const service = getServiceName();

3. Handle success/failure
   if (response.success) {
     // Use response.data
   } else {
     // Handle response.error
   }

4. Track errors
   await sentry.captureException(error, { context });

5. Track analytics
   await analytics.trackEvent(userId, event);

KEY PRINCIPLES:

✅ Use try-catch for error handling
✅ Always await promises
✅ Check response.success before accessing data
✅ Log meaningful context
✅ Track analytics for business intelligence
✅ Report errors to Sentry
✅ Use retry logic for critical operations
✅ Batch operations when possible

TESTING PATTERN:

// Mock integration
jest.mock('@/integrations/resend', () => ({
  getResendService: jest.fn(() => ({
    send: jest.fn().mockResolvedValue({ success: true }),
  })),
}));

// Use in test
const result = await processEnrollmentPayment(userId, courseId, 100, 'pm_id');
expect(result.success).toBe(true);
*/
