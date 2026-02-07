/**
 * Integration Initialization & Setup
 * Run on application startup
 */

import { initializeIntegrations } from '@/integrations';
import { ERROR_TRACKING_CONFIG } from '@/lib/integrations-config';

/**
 * Initialize all integrations on app startup
 * Call this from your root layout or app initialization
 */
export async function setupIntegrations() {
  try {
    // Initialize all services
    const success = await initializeIntegrations();

    if (!success) {
      console.warn(
        '⚠️  Some integrations failed to initialize. Check your environment variables.'
      );
    }

    // Initialize error tracking for development
    if (ERROR_TRACKING_CONFIG.DEBUG) {
      console.log('🔧 Running in development mode');
    }

    console.log('✓ Integration setup completed');
    return true;
  } catch (error) {
    console.error('✗ Critical error during integration setup:', error);
    throw error;
  }
}

/**
 * Validate required environment variables
 */
export function validateEnvironment(): {
  valid: boolean;
  missing: string[];
} {
  const required = [
    'DATABASE_URL',
    'NEXTAUTH_SECRET',
    'NEXT_PUBLIC_BASE_URL',
  ];

  const optional = [
    'RESEND_API_KEY',
    'MUX_TOKEN_ID',
    'OPENAI_API_KEY',
    'AWS_ACCESS_KEY_ID',
    'TWILIO_ACCOUNT_SID',
    'NEXT_PUBLIC_POSTHOG_KEY',
    'NEXT_PUBLIC_SENTRY_DSN',
    'FIREBASE_PROJECT_ID',
  ];

  const missing: string[] = [];

  // Check required variables
  for (const env of required) {
    if (!process.env[env]) {
      missing.push(env);
    }
  }

  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:', missing);
    return { valid: false, missing };
  }

  // Warn about missing optional integrations
  const missingOptional: string[] = [];
  for (const env of optional) {
    if (!process.env[env]) {
      missingOptional.push(env);
    }
  }

  if (missingOptional.length > 0) {
    console.warn(
      '⚠️  Some optional integrations are not configured:',
      missingOptional
    );
  }

  console.log('✓ Environment validation passed');
  return { valid: true, missing: [] };
}

/**
 * Get integration status
 */
export function getIntegrationStatus(): Record<string, boolean> {
  return {
    oauth: !!(
      process.env.AUTH_GOOGLE_ID ||
      process.env.AUTH_GITHUB_ID ||
      process.env.AUTH_LINKEDIN_ID ||
      process.env.AUTH_MICROSOFT_ID
    ),
    email: !!process.env.RESEND_API_KEY,
    video: !!process.env.MUX_TOKEN_ID,
    llm: !!process.env.OPENAI_API_KEY,
    storage: !!process.env.AWS_S3_BUCKET,
    sms: !!process.env.TWILIO_ACCOUNT_SID,
    analytics: !!process.env.NEXT_PUBLIC_POSTHOG_KEY,
    errorTracking: !!process.env.NEXT_PUBLIC_SENTRY_DSN,
    pushNotifications: !!process.env.FIREBASE_PROJECT_ID,
    payments: !!(
      process.env.STRIPE_SECRET_KEY ||
      process.env.RAZORPAY_KEY_ID ||
      process.env.PAYPAL_CLIENT_ID
    ),
    cms: !!process.env.SANITY_PROJECT_ID,
    booking: !!process.env.CALENDLY_API_KEY,
  };
}

export default {
  setupIntegrations,
  validateEnvironment,
  getIntegrationStatus,
};
