'use client';

import { useState } from 'react';
import Link from 'next/link';
import { validateEmail } from '@/utils/formHelpers';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [focused, setFocused] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      
      setTimeout(() => {
        // Redirect to dashboard or home
        window.location.href = '/dashboard';
      }, 1000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="text-center py-16 fade-in">
        <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 scale-in">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Welcome back!</h3>
        <p className="text-zinc-400">Redirecting to your dashboard...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      {/* Email Field */}
      <div className="relative">
        <label 
          htmlFor="email" 
          className={`absolute left-4 transition-all duration-200 pointer-events-none font-medium ${
            focused === 'email' || formData.email 
              ? '-top-2.5 text-xs bg-gradient-to-r from-zinc-900 via-black to-zinc-900 px-2 text-orange-400' 
              : 'top-4 text-sm text-zinc-400'
          }`}
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onFocus={() => setFocused('email')}
          onBlur={() => setFocused('')}
          className={`w-full bg-zinc-900/50 backdrop-blur-sm border rounded-xl px-4 py-3.5 text-white text-sm focus:outline-none transition-all duration-200 ${
            errors.email 
              ? 'border-red-500/60 focus:border-red-500 focus:bg-red-500/5' 
              : 'border-zinc-800 focus:border-orange-500/60 focus:bg-orange-500/5'
          }`}
        />
        {errors.email && (
          <p className="mt-2 text-xs text-red-400 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.email}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div className="relative">
        <label 
          htmlFor="password" 
          className={`absolute left-4 transition-all duration-200 pointer-events-none font-medium ${
            focused === 'password' || formData.password 
              ? '-top-2.5 text-xs bg-gradient-to-r from-zinc-900 via-black to-zinc-900 px-2 text-orange-400' 
              : 'top-4 text-sm text-zinc-400'
          }`}
        >
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onFocus={() => setFocused('password')}
            onBlur={() => setFocused('')}
            className={`w-full bg-zinc-900/50 backdrop-blur-sm border rounded-xl px-4 py-3.5 pr-12 text-white text-sm focus:outline-none transition-all duration-200 ${
              errors.password 
                ? 'border-red-500/60 focus:border-red-500 focus:bg-red-500/5' 
                : 'border-zinc-800 focus:border-orange-500/60 focus:bg-orange-500/5'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-4.753 4.753m7.858-1a3 3 0 00-4.242 0M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            )}
          </button>
        </div>
        {errors.password && (
          <p className="mt-2 text-xs text-red-400 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.password}
          </p>
        )}
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between pt-2">
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="w-4 h-4 bg-zinc-900 border border-zinc-700 rounded-md text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 cursor-pointer"
          />
          <span className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">Remember me</span>
        </label>
        <Link
          href="/forgot-password"
          className="text-sm text-orange-400 hover:text-orange-300 transition-colors font-medium"
        >
          Forgot password?
        </Link>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 text-white mt-8 flex items-center justify-center gap-2 ${
          isSubmitting
            ? 'bg-orange-500/50 cursor-not-allowed'
            : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 active:scale-[0.98] transform'
        }`}
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Signing in...
          </>
        ) : (
          'Sign In'
        )}
      </button>

      {/* Sign Up Link */}
      <p className="text-center text-zinc-400 text-sm pt-4">
        Don't have an account?{' '}
        <Link href="/signup" className="text-orange-400 hover:text-orange-300 font-semibold transition-colors">
          Create one
        </Link>
      </p>
    </form>
  );
}