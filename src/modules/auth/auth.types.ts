/**
 * Authentication Types
 */

export interface AuthUser {
  id: string;
  email: string;
  name?: string | null;
  image?: string | null;
  emailVerified?: Date | null;
}

export interface AuthSession {
  user?: AuthUser;
  expires: string;
  iat?: number;
  exp?: number;
}

export interface AuthProviderConfig {
  id: string;
  name: string;
  type: string;
  options?: Record<string, any>;
}
