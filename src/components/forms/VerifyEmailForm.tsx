'use client';

import { useState } from 'react';
import Link from 'next/link';
import { validateEmail } from '@/utils/formHelpers';

export default function VerifyEmailForm() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const verificationCode = code.join('');
    if (verificationCode.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setVerifyStatus('success');

      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);
    } catch (err) {
      setError('Invalid verification code. Please try again.');
      setVerifyStatus('error');
    } finally {
      setIsVerifying(false);
    }
  };

  if (verifyStatus === 'success') {
    return (
      <div className="text-center py-12 fade-in">
        <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 scale-in">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Email Verified!</h3>
        <p className="text-zinc-400">Completing setup... Redirecting to dashboard.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleVerify} className="space-y-8 w-full">
      {/* Verification Code Inputs */}
      <div>
        <label className="block text-sm font-medium text-zinc-400 mb-4">
          Enter the 6-digit code sent to your email
        </label>
        <div className="flex gap-3 justify-center mb-4">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-14 h-14 bg-zinc-900/50 border border-zinc-800 rounded-lg text-white text-2xl font-semibold text-center focus:outline-none focus:border-orange-500/60 focus:bg-orange-500/5 transition-all duration-200"
              autoFocus={index === 0}
            />
          ))}
        </div>
        {error && (
          <p className="text-xs text-red-400 flex items-center gap-1.5 justify-center">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isVerifying || code.join('').length !== 6}
        className={`w-full px-6 py-3.5 rounded-xl font-semibold transition-all duration-200 text-white flex items-center justify-center gap-2 ${
          isVerifying || code.join('').length !== 6
            ? 'bg-orange-500/50 cursor-not-allowed'
            : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 active:scale-[0.98] transform'
        }`}
      >
        {isVerifying ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Verifying...
          </>
        ) : (
          'Verify Email'
        )}
      </button>

      {/* Resend Code */}
      <div className="text-center">
        <p className="text-zinc-400 text-sm mb-3">Didn't receive the code?</p>
        <button
          type="button"
          className="text-orange-400 hover:text-orange-300 font-semibold text-sm transition-colors"
        >
          Resend Code
        </button>
      </div>
    </form>
  );
}