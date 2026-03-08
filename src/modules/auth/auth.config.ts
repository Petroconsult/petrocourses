/**
 * Auth.js Configuration (using @auth/core)
 * Setup for Auth.js with multiple providers (Google, GitHub, LinkedIn, Microsoft)
 */

import type { AuthConfig } from "@auth/core";
import type { JWT } from "@auth/core/jwt";
import Google from "@auth/core/providers/google";
import GitHub from "@auth/core/providers/github";
import { loadOAuthProviders } from "@/integrations/oauth";
import type { AuthSession } from "./auth.types";

/**
 * Configure Auth.js providers based on available OAuth credentials
 */
function getConfiguredProviders() {
  const oauthProviders = loadOAuthProviders();
  const providers: AuthConfig["providers"] = [];

  // Map OAuth configurations to Auth.js providers
  for (const provider of oauthProviders) {
    switch (provider.id) {
      case "google":
        providers.push(
          Google({
            clientId: provider.clientId,
            clientSecret: provider.clientSecret,
          })
        );
        break;
      case "github":
        providers.push(
          GitHub({
            clientId: provider.clientId,
            clientSecret: provider.clientSecret,
          })
        );
        break;
      // LinkedIn and Microsoft require additional Auth.js provider imports
      // Add them when needed with: LinkedIn({ clientId, clientSecret })
      // and: Microsoft({ clientId, clientSecret })
    }
  }

  return providers;
}

export const authConfig: AuthConfig = {
  providers: getConfiguredProviders(),
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
    verifyRequest: "/auth/verify-email",
    newUser: "/",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: AuthSession; token: JWT }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  events: {
    async signIn({ user, account, profile, isNewUser }: { user: any; account?: any; profile?: any; isNewUser?: boolean }) {
      console.log(`User signed in: ${user.email}, isNewUser: ${isNewUser ?? false}`);
      // TODO: Add database persistence for user on first sign-in
    },
    async signOut(params: { session?: any } | { token: JWT | null }) {
      if ('token' in params) {
        console.log(`User signed out: ${params.token?.email}`);
      }
      // TODO: Add any cleanup logic needed on sign-out
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
};

export default authConfig;
