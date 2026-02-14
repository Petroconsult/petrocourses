'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function OAuthCallbackPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'processing' | 'success' | 'error'>('processing');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const processCallback = async () => {
      try {
        const code = searchParams.get('code');
        const error = searchParams.get('error');

        if (error) {
          setStatus('error');
          setMessage(error === 'access_denied' ? 'Sign in was cancelled' : 'Authentication failed');
          return;
        }

        if (!code) {
          setStatus('error');
          setMessage('No authentication code received');
          return;
        }

        // Simulate API call to exchange code for token
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setStatus('success');
        setMessage('Sign in successful!');

        // Redirect to dashboard
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
      } catch (err) {
        setStatus('error');
        setMessage('An error occurred during sign in');
      }
    };

    processCallback();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        {status === 'processing' && (
          <>
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-orange-500/30 animate-pulse">
              <svg className="w-10 h-10 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Completing Sign In</h2>
              <p className="text-white/60">Please wait while we process your authentication...</p>
            </div>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-500/30 scale-in">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{message}</h2>
              <p className="text-white/60">Redirecting to your dashboard...</p>
            </div>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-red-500/30">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Sign In Failed</h2>
              <p className="text-white/60 mb-6">{message}</p>
              <a
                href="/login"
                className="inline-block px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30"
              >
                Back to Login
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
