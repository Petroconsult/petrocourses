/**
 * OAuth Provider Integration
 * Abstracts OAuth configuration for Auth.js (NextAuth v5)
 * Supports: Google, GitHub, LinkedIn, Microsoft
 */

import type { AuthConfig } from "@auth/core";

export interface OAuthProvider {
  id: string;
  name: string;
  enabled: boolean;
  clientId: string;
  clientSecret: string;
}

/**
 * Load OAuth providers from environment variables
 * Expected env vars:
 * - AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET
 * - AUTH_GITHUB_ID, AUTH_GITHUB_SECRET
 * - AUTH_LINKEDIN_ID, AUTH_LINKEDIN_SECRET
 * - AUTH_MICROSOFT_ID, AUTH_MICROSOFT_SECRET
 */
export const loadOAuthProviders = (): OAuthProvider[] => {
  const providers: OAuthProvider[] = [];

  // Google
  if (process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET) {
    providers.push({
      id: "google",
      name: "Google",
      enabled: true,
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    });
  }

  // GitHub
  if (process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET) {
    providers.push({
      id: "github",
      name: "GitHub",
      enabled: true,
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    });
  }

  // LinkedIn
  if (process.env.AUTH_LINKEDIN_ID && process.env.AUTH_LINKEDIN_SECRET) {
    providers.push({
      id: "linkedin",
      name: "LinkedIn",
      enabled: true,
      clientId: process.env.AUTH_LINKEDIN_ID,
      clientSecret: process.env.AUTH_LINKEDIN_SECRET,
    });
  }

  // Microsoft
  if (process.env.AUTH_MICROSOFT_ID && process.env.AUTH_MICROSOFT_SECRET) {
    providers.push({
      id: "microsoft",
      name: "Microsoft",
      enabled: true,
      clientId: process.env.AUTH_MICROSOFT_ID,
      clientSecret: process.env.AUTH_MICROSOFT_SECRET,
    });
  }

  return providers;
};

/**
 * Get enabled OAuth providers for UI rendering
 */
export const getEnabledOAuthProviders = (): OAuthProvider[] => {
  return loadOAuthProviders().filter((p) => p.enabled);
};

/**
 * Check if a specific provider is enabled
 */
export const isOAuthProviderEnabled = (providerId: string): boolean => {
  return getEnabledOAuthProviders().some((p) => p.id === providerId);
};

/**
 * Get OAuth provider by ID
 */
export const getOAuthProvider = (providerId: string): OAuthProvider | null => {
  return getEnabledOAuthProviders().find((p) => p.id === providerId) || null;
};

export default {
  loadOAuthProviders,
  getEnabledOAuthProviders,
  isOAuthProviderEnabled,
  getOAuthProvider,
};
