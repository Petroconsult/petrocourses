#!/usr/bin/env node

/**
 * Integration Services Quick Reference
 * Copy/paste imports and usage for each integration
 */

// ============================================
// OAUTH
// ============================================
import { getOAuthProvider, getEnabledOAuthProviders, isOAuthProviderEnabled } from '@/integrations';

// Usage:
const providers = getEnabledOAuthProviders();
const google = getOAuthProvider('google');
const hasGithub = isOAuthProviderEnabled('github');

// ============================================
// EMAIL (Resend)
// ============================================
import { getResendService } from '@/integrations';

const email = getResendService();
await email.sendWelcomeEmail('user@example.com', 'John');
await email.sendEnrollmentConfirmation('user@example.com', 'Python 101', 'python-101');
await email.sendPasswordResetEmail('user@example.com', 'token123');
await email.sendVerificationEmail('user@example.com', 'verify-token');
await email.sendPaymentReceipt('user@example.com', 99.99, 'USD', 'ORD-123');
await email.sendBookingConfirmation('user@example.com', 'Dr. Smith', '2025-02-15', '2:00 PM', 'BOOK-123');

// ============================================
// VIDEO (Mux)
// ============================================
import { getMuxService } from '@/integrations';

const video = getMuxService();
const muxUpload = await video.createUpload({ filename: 'lesson.mp4' });
const videoData = await video.getVideo('video-id');
const playback = await video.getPlaybackUrl('playback-id');
const thumbnail = video.getThumbnailUrl('playback-id', { time: 10, width: 320 });
const signed = await video.createSignedUrl('playback-id', 3600);
await video.deleteVideo('video-id');

// ============================================
// AI/LLM (OpenAI)
// ============================================
import { getOpenAIService } from '@/integrations';

const llm = getOpenAIService();
const chat = await llm.chat({
  messages: [{ role: 'user', content: 'Hello!' }],
  temperature: 0.7,
  max_tokens: 500
});
const embedding = await llm.getEmbedding({ text: 'Sample text' });
const answer = await llm.answerCourseQuestion(question, context, history);
const quiz = await llm.generateQuizQuestion(lessonContent);
const summary = await llm.summarizeContent(content);

// ============================================
// FILE STORAGE (AWS S3)
// ============================================
import { getS3Service } from '@/integrations';

const s3 = getS3Service();
const s3Upload = await s3.upload({
  key: 'courses/course-1/material.pdf',
  contentType: 'application/pdf',
  body: buffer,
  isPublic: false
});
const s3Url = s3.generateSignedUrl({ key: 'file.pdf', expiresIn: 3600 });
await s3.delete('file.pdf');
const courseRes = await s3.uploadCourseResource(courseId, 'doc.pdf', buffer, 'application/pdf');
const avatar = await s3.uploadUserAvatar(userId, 'avatar.jpg', buffer);
const cert = await s3.uploadCertificate(userId, courseId, buffer);

// ============================================
// SMS (Twilio)
// ============================================
import { getTwilioService } from '@/integrations';

const sms = getTwilioService();
await sms.sendSms({ to: '+1234567890', body: 'Hello!' });
await sms.sendBookingReminderSms('+1234567890', 'Dr. Smith', '2025-02-15', '2:00 PM');
await sms.sendEnrollmentSms('+1234567890', 'Python 101');
await sms.sendPaymentConfirmationSms('+1234567890', 99.99, 'USD', 'ORD-123');
await sms.sendOtpSms('+1234567890', '123456');
await sms.sendCourseReminderSms('+1234567890', 'Python 101');
await sms.sendCertificationSms('+1234567890', 'Python 101');

// Static helpers:
const formatted = getTwilioService.formatPhoneNumber('1234567890', '+1');
const valid = getTwilioService.validatePhoneNumber('+12345678901');

// ============================================
// ANALYTICS (PostHog)
// ============================================
import { getPostHogService } from '@/integrations';

const analytics = getPostHogService();
await analytics.capture(userId, { event: 'Custom Event', properties: { ... } });
await analytics.identify(userId, { email, name, role, ... });
await analytics.trackSignup(userId, email);
await analytics.trackCourseEnrollment(userId, courseId, title, price);
await analytics.trackPaymentCompleted(userId, amount, currency, orderId);
await analytics.trackCourseCompleted(userId, courseId, title, durationDays);
await analytics.trackLessonView(userId, courseId, lessonId, title);
await analytics.trackBookingCreated(userId, bookingId, expertName, serviceType);
await analytics.trackQuizAttempt(userId, courseId, quizId, score, passed);
await analytics.trackCertificateDownload(userId, courseId, title);
await analytics.trackSupportTicketCreated(userId, ticketId, category);
const flag = await analytics.getFeatureFlag(userId, 'flagName');

// ============================================
// ERROR TRACKING (Sentry)
// ============================================
import { getSentryService } from '@/integrations';

const sentry = getSentryService();
await sentry.captureException(error, {
  level: 'error',
  tags: { component: 'payment' },
  userId: 'user-123'
});
await sentry.captureMessage('Info message', 'info');
await sentry.trackTransaction({
  name: 'Database Query',
  operation: 'db.query',
  duration: 250,
  status: 'ok'
});
sentry.setUserContext(userId, email, username);
sentry.addBreadcrumb('User clicked button', 'user-action');
await sentry.trackApiError('POST', '/api/payment', 500, 'Error message', userId);
await sentry.trackPaymentError('Declined', 'stripe', orderId, userId);
await sentry.trackEnrollmentError('Course full', courseId, userId);

// ============================================
// PUSH NOTIFICATIONS (Firebase)
// ============================================
import { getFirebaseService } from '@/integrations';

const push = getFirebaseService();
await push.sendPushNotification(deviceToken, {
  title: 'Course Enrolled',
  body: 'You enrolled in a new course!',
  data: { courseId: 'course-123' }
});
await push.sendTopicNotification('announcements', {
  title: 'New Course',
  body: 'Check out our new course!'
});
await push.subscribeToTopic(deviceToken, 'courses');
await push.sendEnrollmentNotification(deviceToken, 'Python 101');
await push.sendPaymentNotification(deviceToken, 99.99, 'USD');
await push.sendBookingNotification(deviceToken, 'Dr. Smith', '2025-02-15');
await push.sendCompletionNotification(deviceToken, 'Python 101');
await push.sendReminderNotification(deviceToken, 'Complete your lesson!');
await push.broadcastNotification('all-users', { title: 'Announcement', body: 'Important update' });

// ============================================
// UTILITIES & HELPERS
// ============================================
import {
  retryWithBackoff,
  withTimeout,
  RateLimiter,
  isValidEmail,
  isValidPhoneNumber,
  parseApiError,
  generateRequestId,
  maskSensitiveData,
  formatDuration,
  IntegrationLogger,
  buildQueryString,
  waitFor,
  batchArray
} from '@/utils/integration-helpers';

// Retry
const result = await retryWithBackoff(() => apiCall(), 3, 1000, 30000, 2);

// Timeout
const data = await withTimeout(promise, 5000, 'Timeout!');

// Rate limiting
const limiter = new RateLimiter(100, 60000);
if (limiter.canMakeRequest()) { ... }
const remaining = limiter.getRemainingRequests();

// Validation
isValidEmail('user@example.com');
isValidPhoneNumber('+12345678901');

// Error parsing
const error = parseApiError(err);

// Utilities
const id = generateRequestId();
const masked = maskSensitiveData({ password: 'secret' }, ['password']);
const duration = formatDuration(5000);  // "5.00s"

// Logging
const logger = new IntegrationLogger('MyService');
logger.info('Message', data);

// Query string
const qs = buildQueryString({ page: 1, limit: 10 });

// Wait
await waitFor(() => condition, 5000);

// Batch
const batches = batchArray(array, 10);

// ============================================
// CONFIGURATION
// ============================================
import {
  EMAIL_CONFIG,
  VIDEO_CONFIG,
  STORAGE_CONFIG,
  SMS_CONFIG,
  ANALYTICS_CONFIG,
  ERROR_TRACKING_CONFIG,
  PUSH_CONFIG,
  OAUTH_CONFIG,
  LLM_CONFIG,
  RATE_LIMITS,
  TIMEOUTS,
  RETRY_CONFIG
} from '@/lib/integrations-config';

// ============================================
// SETUP & VALIDATION
// ============================================
import {
  setupIntegrations,
  validateEnvironment,
  getIntegrationStatus
} from '@/lib/integration-setup';

await setupIntegrations();
const validation = validateEnvironment();
const status = getIntegrationStatus();

// ============================================
// TYPES
// ============================================
import type {
  ServiceResponse,
  ServiceConfig,
  OAuthProvider,
  AuthUser,
  EmailTemplate,
  SendEmailRequest,
  PaymentIntent,
  PaymentWebhook,
  CourseProgress,
  LessonCompletion,
  VideoUploadRequest,
  VideoAsset,
  FileUploadRequest,
  StoredFile,
  NotificationPayload,
  NotificationChannel,
  Booking,
  AnalyticsEvent,
  ConversionFunnel,
  ErrorReport,
  IntegrationStatus,
  HealthCheck,
  ServiceHealth,
  ApiRequest,
  ApiResponse
} from '@/types/integrations';

// ============================================
// INITIALIZATION (in layout.tsx)
// ============================================
import { validateEnvironment, getIntegrationStatus } from '@/lib/integration-setup';

// In root layout or startup
validateEnvironment();
if (process.env.NODE_ENV === 'development') {
  console.log('Integration Status:', getIntegrationStatus());
}

// ============================================
// EXAMPLE: Complete Flow (Payment + Notifications)
// ============================================

async function completeCheckout(userId: string, courseId: string, amount: number) {
  const stripe = require('@/integrations').getStripeService?.();
  const email = require('@/integrations').getResendService();
  const sms = require('@/integrations').getTwilioService();
  const push = require('@/integrations').getFirebaseService();
  const analytics = require('@/integrations').getPostHogService();
  const sentry = require('@/integrations').getSentryService();

  try {
    // Process payment
    const payment = await stripe.createPaymentIntent(amount, { courseId, userId });
    if (!payment.success) throw new Error('Payment failed');

    // Send email
    await email.sendPaymentReceipt('user@example.com', amount, 'USD', payment.data.id);

    // Send SMS
    await sms.sendPaymentConfirmationSms('+1234567890', amount, 'USD', payment.data.id);

    // Send push notification
    await push.sendPaymentNotification(deviceToken, amount, 'USD');

    // Track analytics
    await analytics.trackPaymentCompleted(userId, amount, 'USD', payment.data.id);

    return { success: true, paymentId: payment.data.id };
  } catch (error) {
    // Track error
    await sentry.trackPaymentError(error.message, 'stripe', courseId, userId);
    throw error;
  }
}

// ============================================
// Export all for convenience
// ============================================
export {
  // Services
  getOAuthProvider,
  getResendService,
  getMuxService,
  getOpenAIService,
  getS3Service,
  getTwilioService,
  getPostHogService,
  getSentryService,
  getFirebaseService,
  // Utilities
  retryWithBackoff,
  RateLimiter,
  IntegrationLogger,
  // Setup
  validateEnvironment,
  getIntegrationStatus,
  // Config
  EMAIL_CONFIG,
  VIDEO_CONFIG,
  STORAGE_CONFIG,
  // Types
  type ServiceResponse,
  type EmailPayload,
  type PushNotificationPayload,
};
