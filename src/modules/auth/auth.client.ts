/**
 * Client-side auth utilities for @auth/nextjs
 * Provides useSession hook and auth helper functions
 */

'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * Mock useSession hook for development
 * In production, use the actual @auth/nextjs useSession
 */
export function useSession() {
  const [session, setSession] = useState<any>(null);
  const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');

  useEffect(() => {
    // Fetch session from server
    const fetchSession = async () => {
      try {
        const response = await fetch('/api/auth/session');
        const data = await response.json();
        setSession(data);
        setStatus(data ? 'authenticated' : 'unauthenticated');
      } catch (error) {
        setStatus('unauthenticated');
      }
    };

    fetchSession();
  }, []);

  return {
    data: session,
    status,
    update: async () => {
      // Implement session update logic
    },
  };
}

/**
 * Sign in function
 */
export const signIn = async (provider: string, options?: any) => {
  try {
    const response = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provider, ...options }),
    });
    return await response.json();
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
};

/**
 * Sign out function
 */
export const signOut = async (options?: any) => {
  try {
    await fetch('/api/auth/signout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(options || {}),
    });
    // Redirect to home page
    window.location.href = '/';
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
};

export default {
  useSession,
  signIn,
  signOut,
};
