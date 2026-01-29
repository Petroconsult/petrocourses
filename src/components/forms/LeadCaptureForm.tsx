'use client';

import { useState } from 'react';
import { LeadData } from '@/types/course';
import { validateEmail, validatePhone } from '@/utils/formHelpers';

export default function LeadCaptureForm() {
  const [formData, setFormData] = useState<LeadData>({
    fullName: '',
    email: '',
    phone: '',
    interest: '',
    company: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [focused, setFocused] = useState<string>('');

  const interests = [
    'Training Programs',
    'Consulting Services',
    'Corporate Training',
    'Certification Courses',
    'Custom Solutions',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.interest) {
      newErrors.interest = 'Please select your interest';
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
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          interest: '',
          company: '',
        });
        setSubmitStatus('idle');
      }, 3000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="text-center py-12 fade-in">
        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 scale-in">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h4 className="text-xl font-semibold text-white mb-2">Thank You!</h4>
        <p className="text-white/60 text-sm">We'll be in touch shortly with more information.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Full Name Field */}
      <div className="relative">
        <label 
          htmlFor="fullName" 
          className={`absolute left-3 transition-all duration-200 pointer-events-none ${
            focused === 'fullName' || formData.fullName 
              ? '-top-2 text-xs bg-black px-1.5 text-orange-400' 
              : 'top-3.5 text-sm text-white/40'
          }`}
        >
          Full Name <span className="text-orange-400">*</span>
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          onFocus={() => setFocused('fullName')}
          onBlur={() => setFocused('')}
          className={`w-full bg-black/40 border rounded-lg px-4 py-3.5 text-white text-sm focus:outline-none transition-colors duration-200 ${
            errors.fullName 
              ? 'border-red-400/60 focus:border-red-400' 
              : 'border-white/10 focus:border-orange-400/60'
          }`}
        />
        {errors.fullName && (
          <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.fullName}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div className="relative">
        <label 
          htmlFor="email" 
          className={`absolute left-3 transition-all duration-200 pointer-events-none ${
            focused === 'email' || formData.email 
              ? '-top-2 text-xs bg-black px-1.5 text-orange-400' 
              : 'top-3.5 text-sm text-white/40'
          }`}
        >
          Email Address <span className="text-orange-400">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onFocus={() => setFocused('email')}
          onBlur={() => setFocused('')}
          className={`w-full bg-black/40 border rounded-lg px-4 py-3.5 text-white text-sm focus:outline-none transition-colors duration-200 ${
            errors.email 
              ? 'border-red-400/60 focus:border-red-400' 
              : 'border-white/10 focus:border-orange-400/60'
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.email}
          </p>
        )}
      </div>

      {/* Phone Field */}
      <div className="relative">
        <label 
          htmlFor="phone" 
          className={`absolute left-3 transition-all duration-200 pointer-events-none ${
            focused === 'phone' || formData.phone 
              ? '-top-2 text-xs bg-black px-1.5 text-orange-400' 
              : 'top-3.5 text-sm text-white/40'
          }`}
        >
          Phone Number <span className="text-orange-400">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          onFocus={() => setFocused('phone')}
          onBlur={() => setFocused('')}
          className={`w-full bg-black/40 border rounded-lg px-4 py-3.5 text-white text-sm focus:outline-none transition-colors duration-200 ${
            errors.phone 
              ? 'border-red-400/60 focus:border-red-400' 
              : 'border-white/10 focus:border-orange-400/60'
          }`}
        />
        {errors.phone && (
          <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.phone}
          </p>
        )}
      </div>

      {/* Interest Dropdown */}
      <div className="relative">
        <label 
          htmlFor="interest" 
          className={`absolute left-3 transition-all duration-200 pointer-events-none ${
            focused === 'interest' || formData.interest 
              ? '-top-2 text-xs bg-black px-1.5 text-orange-400' 
              : 'top-3.5 text-sm text-white/40'
          }`}
        >
          I'm interested in <span className="text-orange-400">*</span>
        </label>
        <select
          id="interest"
          name="interest"
          value={formData.interest}
          onChange={handleChange}
          onFocus={() => setFocused('interest')}
          onBlur={() => setFocused('')}
          className={`w-full bg-black/40 border rounded-lg px-4 py-3.5 text-white text-sm focus:outline-none transition-colors duration-200 appearance-none cursor-pointer ${
            errors.interest 
              ? 'border-red-400/60 focus:border-red-400' 
              : 'border-white/10 focus:border-orange-400/60'
          }`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='rgba(251, 146, 60, 0.6)'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 0.75rem center',
            backgroundSize: '1.25rem'
          }}
        >
          <option value=""></option>
          {interests.map((interest) => (
            <option key={interest} value={interest}>
              {interest}
            </option>
          ))}
        </select>
        {errors.interest && (
          <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.interest}
          </p>
        )}
      </div>

      {/* Company Field (Optional) */}
      <div className="relative">
        <label 
          htmlFor="company" 
          className={`absolute left-3 transition-all duration-200 pointer-events-none ${
            focused === 'company' || formData.company 
              ? '-top-2 text-xs bg-black px-1.5 text-orange-400' 
              : 'top-3.5 text-sm text-white/40'
          }`}
        >
          Company <span className="text-white/20 text-xs">(Optional)</span>
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          onFocus={() => setFocused('company')}
          onBlur={() => setFocused('')}
          className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3.5 text-white text-sm focus:border-orange-400/60 focus:outline-none transition-colors duration-200"
        />
      </div>

      {/* Error Status Message */}
      {submitStatus === 'error' && (
        <div className="bg-red-500/10 border border-red-400/30 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <p className="text-xs text-red-300">Something went wrong. Please try again.</p>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3.5 px-6 rounded-lg transition-all duration-200 ${
          isSubmitting
            ? 'opacity-70 cursor-not-allowed'
            : 'hover:from-orange-600 hover:to-orange-700 hover:shadow-lg hover:shadow-orange-500/25'
        }`}
      >
        <span className="flex items-center justify-center gap-2">
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </>
          ) : (
            <>
              Get More Information
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </span>
      </button>

      {/* Privacy Note */}
      <p className="text-xs text-white/30 text-center leading-relaxed pt-1">
        By submitting, you agree to receive communications from us. We respect your privacy.
      </p>

      <style jsx>{`
        .fade-in {
          animation: fadeIn 0.4s ease-out;
        }
        
        .scale-in {
          animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(-8px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from { 
            transform: scale(0) rotate(-90deg); 
          }
          to { 
            transform: scale(1) rotate(0deg); 
          }
        }

        select option {
          background-color: #0a0a0a;
          color: white;
          padding: 10px;
        }
      `}</style>
    </form>
  );
}