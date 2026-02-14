'use client';

import { useState } from 'react';
import Link from 'next/link';
import { validateEmail, validatePhone } from '@/utils/formHelpers';

interface SignupFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export default function SignupForm() {
  const [formData, setFormData] = useState<SignupFormData>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [focused, setFocused] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms';
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
        // Redirect to verify email or login
        window.location.href = '/verify-email';
      }, 2000);
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
        <h3 className="text-2xl font-bold text-white mb-2">Account Created!</h3>
        <p className="text-zinc-400">Redirecting to email verification...</p>
      </div>
    );
  }

  const PasswordStrength = () => {
    if (!formData.password) return null;
    const strength = formData.password.length >= 12 ? 'strong' : 
                    formData.password.length >= 8 ? 'medium' : 'weak';
    return (
      <div className="mt-2 text-xs flex items-center gap-2">
        <div className="flex gap-1 flex-1">
          <div className={`h-1 flex-1 rounded-full transition-colors ${strength === 'weak' || strength === 'medium' || strength === 'strong' ? 'bg-orange-500' : 'bg-zinc-800'}`}></div>
          <div className={`h-1 flex-1 rounded-full transition-colors ${strength === 'medium' || strength === 'strong' ? 'bg-orange-500' : 'bg-zinc-800'}`}></div>
          <div className={`h-1 flex-1 rounded-full transition-colors ${strength === 'strong' ? 'bg-orange-500' : 'bg-zinc-800'}`}></div>
        </div>
        <span className={strength === 'strong' ? 'text-green-400' : strength === 'medium' ? 'text-orange-400' : 'text-red-400'}>
          {strength === 'strong' ? 'Strong' : strength === 'medium' ? 'Medium' : 'Weak'}
        </span>
      </div>
    );
  };

  const Field = ({ 
    id, 
    name, 
    label, 
    type = 'text',
    isPassword = false,
    showPassword: show = false,
    setShowPassword = () => {}
  }: any) => {
    const value = formData[name as keyof SignupFormData];
    const stringValue = typeof value === 'string' ? value : '';
    
    return (
      <div className="relative">
        <label 
          htmlFor={id} 
          className={`absolute left-4 transition-all duration-200 pointer-events-none font-medium ${
            focused === id || stringValue
              ? '-top-2.5 text-xs bg-gradient-to-r from-zinc-900 via-black to-zinc-900 px-2 text-orange-400' 
              : 'top-4 text-sm text-zinc-400'
          }`}
        >
          {label}
        </label>
        <div className="relative">
          <input
            type={isPassword ? (show ? 'text' : 'password') : type}
            id={id}
            name={name}
            value={stringValue}
            onChange={handleChange}
            onFocus={() => setFocused(id)}
            onBlur={() => setFocused('')}
            className={`w-full bg-zinc-900/50 backdrop-blur-sm border rounded-xl px-4 py-3.5 ${isPassword ? 'pr-12' : ''} text-white text-sm focus:outline-none transition-all duration-200 ${
              errors[name] 
                ? 'border-red-500/60 focus:border-red-500 focus:bg-red-500/5' 
                : 'border-zinc-800 focus:border-orange-500/60 focus:bg-orange-500/5'
            }`}
          />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            {show ? (
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
        )}
      </div>
      {errors[name] && (
        <p className="mt-2 text-xs text-red-400 flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {errors[name]}
        </p>
      )}
    </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 w-full">
      <Field id="fullName" name="fullName" label="Full Name" />
      <Field id="email" name="email" label="Email Address" type="email" />
      <Field id="phone" name="phone" label="Phone Number" type="tel" />
      
      <Field 
        id="password" 
        name="password" 
        label="Password" 
        isPassword
        showPassword={showPassword}
        setShowPassword={setShowPassword}
      />
      <PasswordStrength />

      <Field 
        id="confirmPassword" 
        name="confirmPassword" 
        label="Confirm Password" 
        isPassword
        showPassword={showConfirmPassword}
        setShowPassword={setShowConfirmPassword}
      />

      {/* Terms Agreement */}
      <div className="pt-2">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="w-4 h-4 mt-0.5 bg-zinc-900 border border-zinc-700 rounded-md text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/30 cursor-pointer flex-shrink-0"
          />
          <span className="text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors leading-relaxed">
            I agree to the{' '}
            <Link href="/terms" className="text-orange-400 hover:text-orange-300 font-medium">
              Terms of Service
            </Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-orange-400 hover:text-orange-300 font-medium">
              Privacy Policy
            </Link>
          </span>
        </label>
        {errors.agreeToTerms && (
          <p className="mt-2 text-xs text-red-400 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.agreeToTerms}
          </p>
        )}
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
            Creating Account...
          </>
        ) : (
          'Create Account'
        )}
      </button>

      {/* Sign In Link */}
      <p className="text-center text-zinc-400 text-sm pt-4">
        Already have an account?{' '}
        <Link href="/login" className="text-orange-400 hover:text-orange-300 font-semibold transition-colors">
          Sign in
        </Link>
      </p>
    </form>
  );
}