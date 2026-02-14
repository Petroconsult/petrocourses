'use client';

import { useState } from 'react';
import Link from 'next/link';
import { validateEmail } from '@/utils/formHelpers';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');
  const [focused, setFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus('success');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="text-center py-12 space-y-6 fade-in">
        <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-500/30">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Check Your Email</h3>
          <p className="text-white/70 mb-1">We've sent password reset instructions to:</p>
          <p className="text-orange-400 font-medium text-sm">{email}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-white/60 text-sm space-y-2">
          <p>• Check your inbox for an email from us</p>
          <p>• Click the reset link in the email</p>
          <p>• Create your new password</p>
          <p>• Your link will expire in 24 hours</p>
        </div>
        <div className="space-y-3 pt-4">
          <button
            onClick={() => {
              setSubmitStatus('idle');
              setEmail('');
            }}
            className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/30"
          >
            Send Another Email
          </button>
          <Link
            href="/login"
            className="block px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-semibold text-white hover:bg-white/10 transition-all duration-200 text-center"
          >
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      <div className="relative">
        <label 
          htmlFor="email" 
          className={`absolute left-4 transition-all duration-200 pointer-events-none font-medium ${
            focused || email 
              ? '-top-2.5 text-xs bg-gradient-to-r from-zinc-900 via-black to-zinc-900 px-2 text-orange-400' 
              : 'top-4 text-sm text-zinc-400'
          }`}
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full bg-zinc-900/50 backdrop-blur-sm border rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none transition-all duration-200 ${
            error 
              ? 'border-red-500/60 focus:border-red-500 focus:bg-red-500/5' 
              : 'border-zinc-800 focus:border-orange-500/60 focus:bg-orange-500/5'
          }`}
        />
        {error && (
          <p className="mt-2 text-xs text-red-400 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
      </div>

      <p className="text-zinc-400 text-sm text-center leading-relaxed">
        Enter your email address and we'll send you a link to reset your password.
      </p>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 text-white flex items-center justify-center gap-2 ${
          isSubmitting
            ? 'bg-orange-500/50 cursor-not-allowed'
            : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 active:scale-[0.98] transform'
        }`}
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Sending...
          </>
        ) : (
          'Send Reset Link'
        )}
      </button>

      <Link
        href="/login"
        className="block text-center text-orange-400 hover:text-orange-300 font-medium text-sm transition-colors"
      >
        Back to Login
      </Link>
    </form>
  );
}