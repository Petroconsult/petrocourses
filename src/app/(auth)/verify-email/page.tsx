'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import VerifyEmailForm from '@/components/forms/VerifyEmailForm';

// Icon Components
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
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

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const features = [
  {
    icon: <ShieldCheckIcon />,
    title: 'Account Security',
    desc: 'Verify your email to fully secure your account',
  },
  {
    icon: <ClockIcon />,
    title: 'Valid for 24 Hours',
    desc: 'Your verification code expires after 24 hours',
  },
  {
    icon: <AlertCircleIcon />,
    title: 'Check Spam Folder',
    desc: 'Email might be in your spam or junk folder',
  },
];

const tips = [
  'Check your spam or junk folder if you do not see the email',
  'Verification code expires in 24 hours',
  'You can request a new code if needed',
];

export default function VerifyEmailPage() {
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Vertical centre divider — desktop decorative */}
      <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 w-px bg-white/[0.06] pointer-events-none" />

      <div className="relative min-h-screen flex items-center justify-center px-6 md:px-12 py-20">
        <div className="w-full max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* ── LEFT COLUMN ─────────────────────────────────────────── */}
            <div className="page-fade" style={{ animationDelay: '0ms' }}>

              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-10">
                <span className="block w-8 h-px bg-orange-500" />
                <span className="text-orange-500 text-xs font-bold uppercase tracking-[0.25em]">
                  Email Verification
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.02] mb-6">
                Verify Your<br />
                <span className="text-orange-500">Email.</span>
              </h1>

              <p className="text-white/50 text-lg leading-relaxed max-w-sm mb-16">
                We've sent a verification code to your email address. Enter it below to activate your account.
              </p>

              {/* Feature list */}
              <div className="space-y-7">
                {features.map((f, i) => (
                  <div
                    key={f.title}
                    className="flex items-start gap-5 group page-fade"
                    style={{ animationDelay: `${(i + 1) * 100}ms` }}
                  >
                    <div className="flex-shrink-0 w-11 h-11 border border-white/8 rounded-xl flex items-center justify-center text-orange-500 bg-white/[0.02] group-hover:border-orange-500/40 group-hover:bg-white/[0.04] transition-all duration-300">
                      {f.icon}
                    </div>
                    <div className="pt-1">
                      <p className="font-bold text-white text-sm mb-0.5">{f.title}</p>
                      <p className="text-white/40 text-xs leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Support link — desktop */}
              <div className="hidden lg:block mt-20 pt-8 border-t border-white/8">
                <p className="text-white/40 text-sm">
                  Having trouble?{' '}
                  <Link
                    href="/support"
                    className="text-orange-500 hover:text-orange-400 font-semibold transition-colors duration-200"
                  >
                    Contact Support →
                  </Link>
                </p>
              </div>
            </div>

            {/* ── RIGHT COLUMN — FORM ──────────────────────────────────── */}
            <div
              className="page-fade lg:sticky lg:top-24"
              style={{ animationDelay: '200ms' }}
            >
              {/* Main card */}
              <div className="border border-white/8 rounded-2xl overflow-hidden bg-white/[0.02]">

                {/* Card header */}
                <div className="px-8 py-6 border-b border-white/8 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-black text-white">Enter Verification Code</h2>
                    <p className="text-white/40 text-xs mt-0.5">Check your inbox for the 6-digit code</p>
                  </div>
                  <div className="w-9 h-9 bg-orange-500/10 border border-orange-500/20 rounded-lg flex items-center justify-center text-orange-500">
                    <MailIcon />
                  </div>
                </div>

                {/* Form body */}
                <div className="px-8 py-8">
                  <VerifyEmailForm />

                  {/* Support link */}
                  <div className="mt-7 pt-6 border-t border-white/8 text-center">
                    <p className="text-white/30 text-xs">
                      Need help?{' '}
                      <Link
                        href="/support"
                        className="text-white/50 hover:text-orange-400 font-medium transition-colors duration-200"
                      >
                        Contact Support
                      </Link>
                    </p>
                  </div>
                </div>

                {/* Card footer */}
                <div className="px-8 py-5 border-t border-white/8 bg-white/[0.01] flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-1.5 text-white/25 text-xs">
                    <ShieldIcon />
                    <span>256-bit SSL Encryption</span>
                  </div>
                  <p className="text-white/25 text-xs">
                    <Link href="/terms" className="text-white/40 hover:text-orange-400 transition-colors duration-200">
                      Terms
                    </Link>{' '}
                    &amp;{' '}
                    <Link href="/privacy" className="text-white/40 hover:text-orange-400 transition-colors duration-200">
                      Privacy
                    </Link>
                  </p>
                </div>
              </div>

              {/* Quick tips card */}
              <div className="mt-4 border border-white/8 rounded-2xl bg-white/[0.02] px-6 py-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="block w-4 h-px bg-orange-500" />
                  <span className="text-orange-500 text-[10px] font-bold uppercase tracking-[0.2em]">
                    Quick Tips
                  </span>
                </div>
                <ul className="space-y-2.5">
                  {tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded border border-white/8 bg-white/[0.03] flex items-center justify-center text-[9px] font-bold text-white/30">
                        {i + 1}
                      </span>
                      <p className="text-white/40 text-xs leading-relaxed">{tip}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support link — mobile */}
              <p className="lg:hidden mt-6 text-center text-white/40 text-sm">
                Having trouble?{' '}
                <Link
                  href="/support"
                  className="text-orange-500 hover:text-orange-400 font-semibold transition-colors duration-200"
                >
                  Contact Support →
                </Link>
              </p>
            </div>

          </div>
        </div>
      </div>

      <style jsx>{`
        .page-fade {
          opacity: 0;
          transform: translateY(20px);
          animation: pageFadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes pageFadeUp {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}