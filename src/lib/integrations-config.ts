/**
 * Integration Configuration Constants
 * Centralized configuration for all third-party services
 */

// ============================================
// EMAIL CONFIGURATION
// ============================================
export const EMAIL_CONFIG = {
  FROM: process.env.RESEND_FROM_EMAIL || 'noreply@petrocourses.com',
  SUPPORT_EMAIL: 'support@petrocourses.com',
  ADMIN_EMAIL: 'admin@petrocourses.com',
  TEMPLATES: {
    WELCOME: 'welcome',
    ENROLLMENT: 'enrollment-confirmation',
    PASSWORD_RESET: 'password-reset',
    VERIFICATION: 'email-verification',
    PAYMENT: 'payment-receipt',
    BOOKING: 'booking-confirmation',
  },
} as const;

// ============================================
// VIDEO CONFIGURATION
// ============================================
export const VIDEO_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024 * 1024, // 5GB
  SUPPORTED_FORMATS: ['mp4', 'mov', 'webm', 'mkv'],
  THUMBNAIL_TIME: 0, // seconds
  PLAYBACK_POLICY: 'public' as const,
  ENCODING_TIER: 'baseline' as const,
} as const;

// ============================================
// STORAGE CONFIGURATION
// ============================================
export const STORAGE_CONFIG = {
  BUCKET: process.env.AWS_S3_BUCKET || '',
  REGION: process.env.AWS_REGION || 'us-east-1',
  PATHS: {
    COURSES: 'courses',
    USERS: 'users',
    CERTIFICATES: 'certificates',
    RESOURCES: 'resources',
  },
  SIGNED_URL_EXPIRY: 3600, // 1 hour
  MAX_UPLOAD_SIZE: 500 * 1024 * 1024, // 500MB
  ALLOWED_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'image/jpeg',
    'image/png',
    'image/gif',
  ],
} as const;

// ============================================
// SMS CONFIGURATION
// ============================================
export const SMS_CONFIG = {
  FROM: process.env.TWILIO_PHONE_NUMBER || '',
  COUNTRY_CODE: '+1',
  MAX_LENGTH: 160,
  TEMPLATES: {
    BOOKING_REMINDER: 'booking-reminder',
    ENROLLMENT: 'enrollment-confirmation',
    PAYMENT: 'payment-confirmation',
    OTP: 'otp-verification',
    COURSE_REMINDER: 'course-reminder',
    CERTIFICATION: 'certification-completion',
  },
} as const;

// ============================================
// ANALYTICS CONFIGURATION
// ============================================
export const ANALYTICS_CONFIG = {
  SAMPLE_RATE: parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE || '0.1'),
  EVENTS: {
    SIGNUP: 'User Signup',
    ENROLLMENT: 'Course Enrolled',
    PAYMENT: 'Payment Completed',
    COMPLETION: 'Course Completed',
    LESSON_VIEW: 'Lesson Viewed',
    BOOKING: 'Booking Created',
    QUIZ: 'Quiz Attempted',
    CERTIFICATE: 'Certificate Downloaded',
    SUPPORT: 'Support Ticket Created',
  },
  BATCH_SIZE: 50,
  FLUSH_INTERVAL: 30000, // 30 seconds
} as const;

// ============================================
// ERROR TRACKING CONFIGURATION
// ============================================
export const ERROR_TRACKING_CONFIG = {
  ENVIRONMENT: process.env.NODE_ENV || 'development',
  DEBUG: process.env.NODE_ENV === 'development',
  ATTACH_STACKTRACE: true,
  CAPTURE_RATE: 1.0,
  ERROR_TYPES: {
    API: 'api_error',
    PAYMENT: 'payment_error',
    ENROLLMENT: 'enrollment_error',
    AUTH: 'auth_error',
    DATABASE: 'database_error',
  },
} as const;

// ============================================
// PUSH NOTIFICATION CONFIGURATION
// ============================================
export const PUSH_CONFIG = {
  PRIORITY: 'high' as const,
  TTL: 86400, // 24 hours
  TOPICS: {
    ANNOUNCEMENTS: 'announcements',
    COURSES: 'courses',
    BOOKINGS: 'bookings',
    PAYMENTS: 'payments',
    SUPPORT: 'support',
  },
  NOTIFICATION_TYPES: {
    ENROLLMENT: 'enrollment',
    PAYMENT: 'payment',
    BOOKING: 'booking',
    COMPLETION: 'completion',
    REMINDER: 'reminder',
  },
} as const;

// ============================================
// OAUTH CONFIGURATION
// ============================================
export const OAUTH_CONFIG = {
  PROVIDERS: ['google', 'github', 'linkedin', 'microsoft'] as const,
  SCOPES: {
    google: ['openid', 'profile', 'email'],
    github: ['user:email'],
    linkedin: ['r_basicprofile', 'r_emailaddress'],
    microsoft: ['openid', 'profile', 'email'],
  },
  REDIRECT_PATH: '/oauth-callback',
} as const;

// ============================================
// LLM CONFIGURATION
// ============================================
export const LLM_CONFIG = {
  MODEL: 'gpt-4-turbo',
  EMBEDDING_MODEL: 'text-embedding-3-small',
  TEMPERATURE: 0.7,
  MAX_TOKENS: 1000,
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  FUNCTIONS: {
    CHATBOT: 'course-qna',
    SUMMARIZATION: 'content-summarization',
    QUIZ_GENERATION: 'quiz-generation',
  },
} as const;

// ============================================
// RATE LIMITING
// ============================================
export const RATE_LIMITS = {
  API: {
    REQUESTS_PER_MINUTE: 60,
    REQUESTS_PER_HOUR: 1000,
  },
  EMAIL: {
    PER_USER_PER_DAY: 20,
    GLOBAL_PER_MINUTE: 100,
  },
  SMS: {
    PER_USER_PER_DAY: 5,
    GLOBAL_PER_MINUTE: 50,
  },
  UPLOAD: {
    PER_USER_PER_DAY: 50,
    FILE_SIZE_LIMIT: STORAGE_CONFIG.MAX_UPLOAD_SIZE,
  },
} as const;

// ============================================
// TIMEOUT CONFIGURATION
// ============================================
export const TIMEOUTS = {
  EMAIL: 10000,
  SMS: 5000,
  PAYMENT: 30000,
  VIDEO: 60000,
  LLM: 30000,
  STORAGE: 30000,
  DATABASE: 30000,
} as const;

// ============================================
// RETRY CONFIGURATION
// ============================================
export const RETRY_CONFIG = {
  MAX_ATTEMPTS: 3,
  BACKOFF_MULTIPLIER: 2,
  INITIAL_DELAY: 1000, // milliseconds
  MAX_DELAY: 30000,
} as const;
