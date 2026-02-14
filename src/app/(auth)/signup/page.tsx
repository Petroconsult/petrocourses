'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SignupForm from '@/components/forms/SignupForm';

// Icon Components
const UserPlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="8.5" cy="7" r="4"/>
    <line x1="20" y1="8" x2="20" y2="14"/>
    <line x1="23" y1="11" x2="17" y2="11"/>
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
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
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="#1877F2" className="w-5 h-5">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export default function SignupPage() {
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
                  <UserPlusIcon />
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
                  Start Your<br />Journey
                </h1>
                <p className="text-zinc-400 text-xl leading-relaxed max-w-lg">
                  Join thousands of professionals advancing their careers and achieving their goals.
                </p>
              </div>

              {/* Features List - More spacious */}
              <div className="space-y-8">
                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center flex-shrink-0 text-orange-500 group-hover:border-orange-500/30 transition-colors duration-300">
                    <RocketIcon />
                  </div>
                  <div className="pt-1">
                    <h3 className="text-white font-semibold mb-2 text-lg">Quick Setup</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">Get started in less than 2 minutes</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center flex-shrink-0 text-orange-500 group-hover:border-orange-500/30 transition-colors duration-300">
                    <UsersIcon />
                  </div>
                  <div className="pt-1">
                    <h3 className="text-white font-semibold mb-2 text-lg">Join the Community</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">Connect with like-minded professionals</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center flex-shrink-0 text-orange-500 group-hover:border-orange-500/30 transition-colors duration-300">
                    <ShieldIcon />
                  </div>
                  <div className="pt-1">
                    <h3 className="text-white font-semibold mb-2 text-lg">100% Secure</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">Your data is protected and encrypted</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} lg:sticky lg:top-24`}>
              <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 backdrop-blur-sm max-h-[calc(100vh-12rem)] overflow-y-auto scrollbar-hide">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
                  <p className="text-zinc-400 text-sm">Fill in your details to get started</p>
                </div>

                <SignupForm />

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-zinc-800"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-3 bg-zinc-900 text-zinc-500">Or sign up with</span>
                  </div>
                </div>

                {/* OAuth Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-sm font-medium hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-200 flex items-center justify-center gap-2">
                    <GoogleIcon />
                    <span>Google</span>
                  </button>
                  <button className="px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-sm font-medium hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-200 flex items-center justify-center gap-2">
                    <FacebookIcon />
                    <span>Facebook</span>
                  </button>
                </div>

                {/* Sign In Link */}
                <div className="mt-8 pt-6 border-t border-zinc-800">
                  <p className="text-zinc-500 text-sm text-center">
                    Already have an account?{' '}
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
                <span>Secure • Fast • Free</span>
              </div>

              {/* Footer Links */}
              <div className="mt-6 text-center text-zinc-600 text-xs">
                <p>By signing up, you agree to our{' '}
                  <Link href="/terms" className="text-zinc-500 hover:text-orange-400 transition-colors">Terms of Service</Link>
                  {' '}and{' '}
                  <Link href="/privacy" className="text-zinc-500 hover:text-orange-400 transition-colors">Privacy Policy</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}