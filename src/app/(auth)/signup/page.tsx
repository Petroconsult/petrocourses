'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SignupForm from '@/components/forms/SignupForm';

// Icon Components
const UserPlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="8.5" cy="7" r="4"/>
    <line x1="20" y1="8" x2="20" y2="14"/>
    <line x1="23" y1="11" x2="17" y2="11"/>
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

const RocketIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="#1877F2" className="w-4 h-4">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const features = [
  {
    icon: <RocketIcon />,
    title: 'Quick Setup',
    desc: 'Get started in less than 2 minutes',
  },
  {
    icon: <UsersIcon />,
    title: 'Join the Community',
    desc: 'Connect with like-minded professionals',
  },
  {
    icon: <ShieldIcon />,
    title: '100% Secure',
    desc: 'Your data is protected and encrypted',
  },
];

export default function SignupPage() {
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">

      {/* Grid texture — matches TrainingPage */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Vertical divider line — desktop decorative */}
      <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 w-px bg-white/[0.06] pointer-events-none" />

      <div className="relative min-h-screen flex items-center justify-center px-6 md:px-12 py-20">
        <div className="w-full max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* ── LEFT COLUMN ─────────────────────────────────────────── */}
            <div
              className="page-fade"
              style={{ animationDelay: '0ms' }}
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-10">
                <span className="block w-8 h-px bg-orange-500" />
                <span className="text-orange-500 text-xs font-bold uppercase tracking-[0.25em]">
                  Create Account
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.02] mb-6">
                Start Your<br />
                <span className="text-orange-500">Journey.</span>
              </h1>

              <p className="text-white/50 text-lg leading-relaxed max-w-sm mb-16">
                Join thousands of professionals advancing their careers in oil &amp; gas.
              </p>

              {/* Feature list */}
              <div className="space-y-7">
                {features.map((f, i) => (
                  <div
                    key={f.title}
                    className="flex items-start gap-5 group page-fade"
                    style={{ animationDelay: `${(i + 1) * 100}ms` }}
                  >
                    {/* Icon box */}
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

              {/* Already have account — desktop */}
              <div className="hidden lg:block mt-20 pt-8 border-t border-white/8">
                <p className="text-white/40 text-sm">
                  Already have an account?{' '}
                  <Link
                    href="/login"
                    className="text-orange-500 hover:text-orange-400 font-semibold transition-colors duration-200"
                  >
                    Sign In →
                  </Link>
                </p>
              </div>
            </div>

            {/* ── RIGHT COLUMN — FORM ──────────────────────────────────── */}
            <div
              className="page-fade lg:sticky lg:top-24"
              style={{ animationDelay: '200ms' }}
            >
              {/* Card */}
              <div className="border border-white/8 rounded-2xl overflow-hidden bg-white/[0.02]">

                {/* Card header strip */}
                <div className="px-8 py-6 border-b border-white/8 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-black text-white">Create Account</h2>
                    <p className="text-white/40 text-xs mt-0.5">Fill in your details to get started</p>
                  </div>
                  <div className="w-9 h-9 bg-orange-500/10 border border-orange-500/20 rounded-lg flex items-center justify-center text-orange-500">
                    <UserPlusIcon />
                  </div>
                </div>

                {/* Form body */}
                <div className="px-8 py-8 max-h-[60vh] overflow-y-auto">
                  <SignupForm />

                  {/* Divider */}
                  <div className="relative my-7">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/8" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="px-4 bg-black text-white/30 text-xs uppercase tracking-widest">
                        or continue with
                      </span>
                    </div>
                  </div>

                  {/* OAuth */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: <GoogleIcon />, label: 'Google' },
                      { icon: <FacebookIcon />, label: 'Facebook' },
                    ].map((p) => (
                      <button
                        key={p.label}
                        className="flex items-center justify-center gap-2.5 px-4 py-3 border border-white/8 rounded-xl text-white text-sm font-medium bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-200"
                      >
                        {p.icon}
                        <span>{p.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Card footer */}
                <div className="px-8 py-5 border-t border-white/8 bg-white/[0.01] flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-1.5 text-white/25 text-xs">
                    <ShieldIcon />
                    <span>Secure · Fast · Free</span>
                  </div>
                  <p className="text-white/25 text-xs">
                    By signing up you agree to our{' '}
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

              {/* Already have account — mobile */}
              <p className="lg:hidden mt-6 text-center text-white/40 text-sm">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="text-orange-500 hover:text-orange-400 font-semibold transition-colors duration-200"
                >
                  Sign In →
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