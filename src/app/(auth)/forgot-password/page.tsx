'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ForgotPasswordForm from '@/components/forms/ForgotPasswordForm';

// Icon Components
const LockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const ArrowLeftIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12 19 5 12 12 5"/>
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

export default function ForgotPasswordPage() {
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
                  Reset Your<br />Password
                </h1>
                <p className="text-zinc-400 text-xl leading-relaxed max-w-lg">
                  Enter your email address and we'll send you instructions to reset your password.
                </p>
              </div>

              {/* Features List - More spacious */}
              <div className="space-y-8">
                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center flex-shrink-0 text-orange-500 group-hover:border-orange-500/30 transition-colors duration-300">
                    <MailIcon />
                  </div>
                  <div className="pt-1">
                    <h3 className="text-white font-semibold mb-2 text-lg">Email Verification</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">Secure reset link sent to your registered email</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center flex-shrink-0 text-orange-500 group-hover:border-orange-500/30 transition-colors duration-300">
                    <ClockIcon />
                  </div>
                  <div className="pt-1">
                    <h3 className="text-white font-semibold mb-2 text-lg">Time-Limited Link</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">Reset link expires after 1 hour for security</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center flex-shrink-0 text-orange-500 group-hover:border-orange-500/30 transition-colors duration-300">
                    <ShieldIcon />
                  </div>
                  <div className="pt-1">
                    <h3 className="text-white font-semibold mb-2 text-lg">Secure Process</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">End-to-end encryption protects your data</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} lg:sticky lg:top-24`}>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 backdrop-blur-sm">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">Enter Your Email</h2>
                  <p className="text-zinc-400 text-sm">We'll send you reset instructions</p>
                </div>

                <ForgotPasswordForm />

                <div className="mt-8 pt-8 border-t border-zinc-800">
                  <p className="text-zinc-500 text-sm text-center">
                    Need help?{' '}
                    <Link 
                      href="/support" 
                      className="text-orange-500 hover:text-orange-400 transition-colors duration-300 font-medium"
                    >
                      Contact Support
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