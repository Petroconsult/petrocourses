/**
 * Integration Types & Interfaces
 * Unified type definitions for all integrations
 */

// ============================================
// GENERIC SERVICE TYPES
// ============================================

export interface ServiceResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface ServiceConfig {
  enabled: boolean;
  apiKey?: string;
  secret?: string;
  host?: string;
  timeout?: number;
}

// ============================================
// AUTHENTICATION TYPES
// ============================================

export interface OAuthProvider {
  id: string;
  name: string;
  enabled: boolean;
  clientId: string;
  clientSecret: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  image?: string;
  emailVerified?: Date;
  provider?: string;
}

// ============================================
// EMAIL TYPES
// ============================================

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  html: string;
  variables: string[];
}

export interface SendEmailRequest {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  replyTo?: string;
}

// ============================================
// PAYMENT TYPES
// ============================================

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'succeeded' | 'failed' | 'canceled';
  provider: 'stripe' | 'paypal' | 'razorpay';
  createdAt: Date;
  metadata?: Record<string, string>;
}

export interface PaymentWebhook {
  provider: string;
  eventType: string;
  data: Record<string, any>;
  timestamp: Date;
}

// ============================================
// COURSE & ENROLLMENT TYPES
// ============================================

export interface CourseProgress {
  userId: string;
  courseId: string;
  completionPercentage: number;
  lessonsCompleted: number;
  lastAccessedAt: Date;
  enrolledAt: Date;
}

export interface LessonCompletion {
  userId: string;
  courseId: string;
  lessonId: string;
  completedAt: Date;
  timeSpent: number; // seconds
  quizScore?: number;
}

// ============================================
// VIDEO TYPES
// ============================================

export interface VideoUploadRequest {
  filename: string;
  courseId: string;
  title: string;
  duration?: number;
}

export interface VideoAsset {
  id: string;
  playbackId: string;
  status: 'preparing' | 'ready' | 'errored';
  duration?: number;
  thumbnail?: string;
  createdAt: Date;
}

// ============================================
// STORAGE TYPES
// ============================================

export interface FileUploadRequest {
  key: string;
  contentType: string;
  size: number;
  userId?: string;
  courseId?: string;
}

export interface StoredFile {
  key: string;
  url: string;
  size: number;
  contentType: string;
  uploadedAt: Date;
  expiresAt?: Date;
}

// ============================================
// NOTIFICATION TYPES
// ============================================

export interface NotificationPayload {
  type: string;
  title: string;
  message: string;
  userId?: string;
  metadata?: Record<string, any>;
}

export interface NotificationChannel {
  email?: boolean;
  sms?: boolean;
  push?: boolean;
  inApp?: boolean;
}

// ============================================
// BOOKING TYPES
// ============================================

export interface Booking {
  id: string;
  userId: string;
  expertId: string;
  serviceType: string;
  scheduledAt: Date;
  duration: number; // minutes
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: Date;
  notes?: string;
}

// ============================================
// ANALYTICS TYPES
// ============================================

export interface AnalyticsEvent {
  name: string;
  userId?: string;
  properties: Record<string, any>;
  timestamp: Date;
}

export interface ConversionFunnel {
  name: string;
  steps: string[];
  completionRate: number;
}

// ============================================
// ERROR TRACKING TYPES
// ============================================

export interface ErrorReport {
  id: string;
  message: string;
  stack?: string;
  context?: Record<string, any>;
  severity: 'fatal' | 'error' | 'warning' | 'info';
  userId?: string;
  timestamp: Date;
}

// ============================================
// INTEGRATION STATUS TYPES
// ============================================

export interface IntegrationStatus {
  oauth: boolean;
  email: boolean;
  video: boolean;
  llm: boolean;
  storage: boolean;
  sms: boolean;
  analytics: boolean;
  errorTracking: boolean;
  pushNotifications: boolean;
  payments: boolean;
  cms: boolean;
  booking: boolean;
}

export interface HealthCheck {
  status: 'healthy' | 'degraded' | 'offline';
  services: Record<string, ServiceHealth>;
  timestamp: Date;
}

export interface ServiceHealth {
  status: 'healthy' | 'degraded' | 'offline';
  lastChecked: Date;
  responseTime: number;
  error?: string;
}

// ============================================
// API REQUEST/RESPONSE TYPES
// ============================================

export interface ApiRequest<T> {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  headers?: Record<string, string>;
  body?: T;
  timeout?: number;
}

export interface ApiResponse<T> {
  status: number;
  headers: Record<string, string>;
  data: T;
}
