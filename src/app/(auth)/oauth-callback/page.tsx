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

        await new Promise((resolve) => setTimeout(resolve, 1500));

        setStatus('success');
        setMessage('Sign in successful!');

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
    <div className="bg-black text-white min-h-screen relative overflow-hidden flex items-center justify-center px-6">

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative w-full max-w-sm text-center page-fade">

        {/* ── PROCESSING ──────────────────────────────────────────────── */}
        {status === 'processing' && (
          <div className="space-y-8">
            {/* Spinner ring */}
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-full border border-white/8" />
              <div className="absolute inset-0 rounded-full border-t border-orange-500 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-orange-500">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeWidth="2"/>
                  <path strokeWidth="2" strokeLinecap="round" d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="block w-6 h-px bg-orange-500" />
                <span className="text-orange-500 text-xs font-bold uppercase tracking-[0.25em]">
                  Authenticating
                </span>
                <span className="block w-6 h-px bg-orange-500" />
              </div>
              <h2 className="text-3xl font-black tracking-tight mb-3">
                Completing<br />
                <span className="text-orange-500">Sign In.</span>
              </h2>
              <p className="text-white/40 text-sm leading-relaxed">
                Please wait while we verify your credentials…
              </p>
            </div>

            {/* Progress dots */}
            <div className="flex items-center justify-center gap-2">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* ── SUCCESS ─────────────────────────────────────────────────── */}
        {status === 'success' && (
          <div className="space-y-8 success-fade">
            {/* Check icon in card-style box */}
            <div className="w-20 h-20 mx-auto border border-white/8 rounded-2xl bg-white/[0.02] flex items-center justify-center text-orange-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div>
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="block w-6 h-px bg-orange-500" />
                <span className="text-orange-500 text-xs font-bold uppercase tracking-[0.25em]">
                  Verified
                </span>
                <span className="block w-6 h-px bg-orange-500" />
              </div>
              <h2 className="text-3xl font-black tracking-tight mb-3">
                You're In.<br />
                <span className="text-orange-500">Welcome Back.</span>
              </h2>
              <p className="text-white/40 text-sm leading-relaxed">
                Redirecting to your dashboard…
              </p>
            </div>

            {/* Thin progress bar */}
            <div className="w-full h-px bg-white/8 rounded-full overflow-hidden">
              <div className="h-full bg-orange-500 progress-bar" />
            </div>
          </div>
        )}

        {/* ── ERROR ───────────────────────────────────────────────────── */}
        {status === 'error' && (
          <div className="space-y-8 error-fade">
            {/* X icon */}
            <div className="w-20 h-20 mx-auto border border-white/8 rounded-2xl bg-white/[0.02] flex items-center justify-center text-white/40">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>

            <div>
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="block w-6 h-px bg-white/20" />
                <span className="text-white/30 text-xs font-bold uppercase tracking-[0.25em]">
                  Failed
                </span>
                <span className="block w-6 h-px bg-white/20" />
              </div>
              <h2 className="text-3xl font-black tracking-tight mb-3">
                Sign In<br />
                <span className="text-white/40">Failed.</span>
              </h2>
              <p className="text-white/40 text-sm leading-relaxed mb-8">
                {message}
              </p>

              <a
                href="/login"
                className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-400 text-black font-bold px-8 py-3.5 rounded transition-colors duration-200 text-sm"
              >
                Back to Sign In
                <span className="text-base leading-none">→</span>
              </a>
            </div>
          </div>
        )}

      </div>

      <style jsx>{`
        .page-fade {
          opacity: 0;
          transform: translateY(16px);
          animation: pageFadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .success-fade {
          opacity: 0;
          animation: pageFadeUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .error-fade {
          opacity: 0;
          animation: pageFadeUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes pageFadeUp {
          to { opacity: 1; transform: translateY(0); }
        }
        .progress-bar {
          width: 0%;
          animation: progressFill 1.4s ease-out forwards;
        }
        @keyframes progressFill {
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}