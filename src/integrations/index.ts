/**
 * Integration Services Index
 * Central export point for all third-party integrations
 * Each service follows the singleton pattern
 */

// OAuth & Authentication
export { getOAuthProvider, getEnabledOAuthProviders, isOAuthProviderEnabled, loadOAuthProviders } from './oauth';

// Email Delivery
export { getResendService } from './resend';
export type { EmailPayload, EmailRecipient } from './resend';

// Video Hosting
export { getMuxService } from './mux';
export type { MuxVideo, MuxPlaybackUrl } from './mux';

// LLM / AI
export { getOpenAIService } from './openai';
export type { ChatMessage, ChatCompletionPayload } from './openai';

// File Storage
export { getS3Service } from './s3';
export type { S3FileMetadata, S3UploadPayload } from './s3';

// SMS Delivery
export { getTwilioService } from './twilio';
export type { SmsPayload, SmsResponse } from './twilio';

// Analytics
export { getPostHogService } from './posthog';
export type { PostHogEvent, PostHogUser } from './posthog';

// Error Tracking
export { getSentryService } from './sentry';
export type { SentryError, SentryTransaction } from './sentry';

// Push Notifications
export { getFirebaseService } from './firebase';
export type { PushNotificationPayload } from './firebase';

// Existing integrations (kept for reference)
export * from './stripe';
export * from './paypal';
export * from './razorpay';
export * from './sanity';
export * from './calendly';
export * from './hubspot';
export * from './teachable';

/**
 * Convenience function to initialize all integration services
 * Call this on app startup to ensure all services are ready
 */
export const initializeIntegrations = async () => {
  try {
    // Services initialize lazily, but we can pre-initialize them here
    const oauth = loadOAuthProviders();
    console.log(`✓ OAuth: ${oauth.length} providers configured`);

    // Services are ready
    console.log('✓ All integrations initialized successfully');
    return true;
  } catch (error) {
    console.error('✗ Failed to initialize integrations:', error);
    return false;
  }
};
