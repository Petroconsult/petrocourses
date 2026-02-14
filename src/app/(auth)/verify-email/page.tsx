'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import VerifyEmailForm from '@/components/forms/VerifyEmailForm';

// Icon Components
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const ShieldCheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const AlertCircleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);

const InfoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="16" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
);

export default function VerifyEmailPage() {
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
                  <MailIcon />
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
                  Verify Your<br />Email
                </h1>
                <p className="text-zinc-400 text-xl leading-relaxed max-w-lg">
                  We've sent a verification code to your email address. Enter it below to activate your account.
                </p>
              </div>

              {/* Features List - More spacious */}
              <div className="space-y-8">
                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center flex-shrink-0 text-orange-500 group-hover:border-orange-500/30 transition-colors duration-300">
                    <ShieldCheckIcon />
                  </div>
                  <div className="pt-1">
                    <h3 className="text-white font-semibold mb-2 text-lg">Account Security</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">Verify your email to secure your account</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center flex-shrink-0 text-orange-500 group-hover:border-orange-500/30 transition-colors duration-300">
                    <ClockIcon />
                  </div>
                  <div className="pt-1">
                    <h3 className="text-white font-semibold mb-2 text-lg">Valid for 24 Hours</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">Code expires after 24 hours for security</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center flex-shrink-0 text-orange-500 group-hover:border-orange-500/30 transition-colors duration-300">
                    <AlertCircleIcon />
                  </div>
                  <div className="pt-1">
                    <h3 className="text-white font-semibold mb-2 text-lg">Check Spam Folder</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">Email might be in spam or junk folder</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} lg:sticky lg:top-24`}>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 backdrop-blur-sm">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">Enter Verification Code</h2>
                  <p className="text-zinc-400 text-sm">Check your inbox for the code</p>
                </div>

                <VerifyEmailForm />

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

              {/* Info Card */}
              <div className="mt-6 bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-5">
                <div className="flex items-center gap-2 text-orange-500 font-semibold mb-3 text-sm">
                  <InfoIcon />
                  <span>Quick Tips</span>
                </div>
                <div className="space-y-2 text-zinc-400 text-xs leading-relaxed">
                  <p>• Check your spam/junk folder if you don't see the email</p>
                  <p>• Verification code expires in 24 hours</p>
                  <p>• You can request another code if needed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}