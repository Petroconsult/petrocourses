'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ResetPasswordForm from '@/components/forms/ResetPasswordForm';

// Icon Components
const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const KeyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

export default function ResetPasswordPage() {
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      {/* Main Content */}
      <div className="relative min-h-screen flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-6xl">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-20 items-start">
            {/* Left Column - Information */}
            <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="mb-16">
                {/* Icon Badge */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500/10 border border-orange-500/20 rounded-2xl mb-8">
                  <LockIcon />
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
                  Create New<br />Password
                </h1>
                <p className="text-zinc-400 text-xl leading-relaxed max-w-lg">
                  Choose a strong password to secure your account and protect your data.
                </p>
              </div>

              {/* Features List - More spacious */}
              <div className="space-y-8">
                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center flex-shrink-0 text-orange-500 group-hover:border-orange-500/30 transition-colors duration-300">
                    <KeyIcon />
                  </div>
                  <div className="pt-1">
                    <h3 className="text-white font-semibold mb-2 text-lg">Strong Protection</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">Use a combination of letters, numbers, and symbols</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center flex-shrink-0 text-orange-500 group-hover:border-orange-500/30 transition-colors duration-300">
                    <CheckCircleIcon />
                  </div>
                  <div className="pt-1">
                    <h3 className="text-white font-semibold mb-2 text-lg">Instant Access</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">Get back to your account immediately after reset</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center flex-shrink-0 text-orange-500 group-hover:border-orange-500/30 transition-colors duration-300">
                    <ShieldIcon />
                  </div>
                  <div className="pt-1">
                    <h3 className="text-white font-semibold mb-2 text-lg">Secure Process</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">Your password is encrypted end-to-end</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} lg:sticky lg:top-24`}>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 backdrop-blur-sm">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">Enter New Password</h2>
                  <p className="text-zinc-400 text-sm">Make sure it's strong and memorable</p>
                </div>

                <ResetPasswordForm />

                <div className="mt-8 pt-8 border-t border-zinc-800">
                  <p className="text-zinc-500 text-sm text-center">
                    Remember your password?{' '}
                    <Link 
                      href="/login" 
                      className="text-orange-500 hover:text-orange-400 transition-colors duration-300 font-medium"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="mt-6 flex items-center justify-center gap-2 text-zinc-600 text-xs">
                <ShieldIcon />
                <span>256-bit SSL Encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}