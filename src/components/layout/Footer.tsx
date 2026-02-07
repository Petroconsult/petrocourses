'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { getResendService, getPostHogService } from '@/integrations';

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [newsletterMessage, setNewsletterMessage] = useState('');

  const analytics = getPostHogService();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterStatus('loading');

    try {
      await analytics.capture('newsletter_signup', {
        event: 'Newsletter Signup',
        properties: {
          email: newsletterEmail,
          timestamp: new Date(),
        },
      });

      const resend = getResendService();
      const result = await resend.sendWelcomeEmail(newsletterEmail, 'Petrocourse Subscriber');

      if (result.success) {
        setNewsletterStatus('success');
        setNewsletterMessage('✓ Welcome aboard! Check your email for updates.');
        setNewsletterEmail('');
        setTimeout(() => setNewsletterStatus('idle'), 3000);
      } else {
        throw new Error('Failed to subscribe');
      }
    } catch (error) {
      setNewsletterStatus('error');
      setNewsletterMessage('Failed to subscribe. Please try again.');
      console.error('Newsletter error:', error);
    }
  };

  return (
    <footer className="bg-black text-white mt-auto border-t border-orange-500/20 relative overflow-hidden">
      <div className="container mx-auto px-6 py-16 relative z-10">
        {/* Newsletter Section */}
        <div className="mb-16 pb-16 border-b border-orange-500/20">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Stay Updated with Latest Industry Insights</h2>
            <p className="text-white/60 mb-6">Get exclusive training updates, industry news, and professional development tips delivered to your inbox.</p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 bg-white/5 border border-orange-500/20 rounded-lg text-sm text-white placeholder-white/40 focus:outline-none focus:border-orange-500 focus:bg-white/10 transition-all duration-300"
              />
              <button 
                type="submit"
                disabled={newsletterStatus === 'loading'}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg font-semibold text-sm hover:from-orange-600 hover:to-orange-700 transition-all duration-300 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {newsletterStatus === 'loading' ? 'Subscribing...' : 'Subscribe Now'}
              </button>
            </form>
            {newsletterMessage && (
              <p className={`text-sm mt-3 ${newsletterStatus === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {newsletterMessage}
              </p>
            )}
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-16">
          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Explore</h3>
            <ul className="space-y-3">
              {[
                { href: '/training', label: 'Training Programs' },
                { href: '/training/courses', label: 'All Courses' },
                { href: '/dashboard/certificates', label: 'My Certificates' },
                { href: '/about', label: 'About Us' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 text-sm hover:text-orange-500 hover:translate-x-1 inline-block transition-all duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Services</h3>
            <ul className="space-y-3">
              {[
                { href: '/advisory', label: 'Advisory Services' },
                { href: '/training/courses', label: 'Training & Development' },
                { href: '/consultancy', label: 'Consultancy' },
                { href: '/advisory/book', label: 'Book a Session' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 text-sm hover:text-orange-500 hover:translate-x-1 inline-block transition-all duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Get In Touch</h3>
            <ul className="space-y-4">
              <li>
                <a href="mailto:info@petroconsultenergy.co.uk" className="text-white/60 text-sm hover:text-orange-500 transition-colors duration-300 break-all">
                  info@petroconsultenergy.co.uk
                </a>
              </li>
              <li>
                <a href="tel:+441708755355" className="text-white/60 text-sm hover:text-orange-500 transition-colors duration-300 inline-block">
                  +44 (0) 1708 755 355
                </a>
              </li>
              <li>
                <p className="text-white/60 text-sm">4 Holgate Court, Romford, Essex, RM1 3JS, UK</p>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-white mb-5 text-sm uppercase tracking-wider">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-white/60 text-sm hover:text-orange-500 hover:translate-x-1 inline-block transition-all duration-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-white/60 text-sm hover:text-orange-500 hover:translate-x-1 inline-block transition-all duration-300">
                  Support Tickets
                </Link>
              </li>
              <li>
                <a href="https://help.petrocourses.co.uk" target="_blank" rel="noopener noreferrer" className="text-white/60 text-sm hover:text-orange-500 hover:translate-x-1 inline-block transition-all duration-300">
                  Help Center
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Partners */}
        <div className="border-t border-orange-500/20 pt-12 mb-12">
          <p className="text-white/60 text-xs mb-6 uppercase tracking-widest font-semibold">Secure Payment Partners</p>
          <div className="flex flex-wrap gap-8 items-center">
            {/* Stripe Logo */}
            <div className="opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer" title="Stripe">
              <svg className="h-8" viewBox="0 0 60 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M59.6 13.1c0-5.6-2.7-10-7.8-10-5.1 0-8.3 4.4-8.3 10 0 6.6 3.7 9.9 9 9.9 2.6 0 4.6-.6 6.1-1.4v-4.3c-1.5.8-3.2 1.2-5.4 1.2-2.1 0-4-.8-4.2-3.5h10.5c0-.3.1-1.2.1-1.9zm-10.6-2c0-2.6 1.6-3.7 2.9-3.7 1.2 0 2.7 1.1 2.7 3.7h-5.6zm-8.8-7.8c-2.1 0-3.5 1-4.2 1.7l-.3-1.3h-4.6v22.1l5.2-1.1V18c.8.5 1.9 1.2 3.8 1.2 3.8 0 7.3-3.1 7.3-10.1-.1-6.4-3.5-9.8-7.2-9.8zm-1.2 15.1c-1.3 0-2-.5-2.5-1.1V9.6c.5-.6 1.3-1.1 2.5-1.1 1.9 0 3.2 2.1 3.2 5.3 0 3.3-1.3 5.4-3.2 5.4zM27.9 3.5l5.2-1.1V0l-5.2 1.1v2.4zm0 1.8h5.2v17.5h-5.2V5.3zM18.9 7l-.4-1.7h-4.5v17.5h5.2V11.3c1.2-1.6 3.3-1.3 3.9-1.1V5.3c-.6-.2-3-.6-4.2 1.7zm-7.8-4L6 4.1v13.8c0 3.2 2.4 5.5 5.5 5.5 1.7 0 3-.3 3.7-.7v-4.3c-.7.3-4.1 1.3-4.1-1.9V9.2h4.1V5.3h-4.1V3z" fill="white"/>
              </svg>
            </div>
            
            {/* PayPal Logo */}
            <div className="opacity-50 hover:opacity-100 transition-opacity duration-300 cursor-pointer" title="PayPal">
              <svg className="h-8" viewBox="0 0 100 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.237 8.455h8.13c3.197 0 5.418 2.053 5.418 5.013 0 3.658-2.72 6.29-6.542 6.29h-3.197c-.461 0-.793.332-.86.793l-.86 5.08c-.067.332-.265.664-.595.664H9.914c-.397 0-.661-.265-.595-.661l2.588-15.647c.066-.463.331-.794.793-.794l-.463.262z" fill="#169BD7"/>
                <path d="M35.461 8.455h8.13c3.197 0 5.418 2.053 5.418 5.013 0 3.658-2.72 6.29-6.542 6.29h-3.197c-.461 0-.793.332-.86.793l-.86 5.08c-.067.332-.265.664-.595.664h-3.816c-.397 0-.661-.265-.595-.661l2.588-15.647c.066-.463.331-.794.793-.794l.536.262z" fill="#169BD7"/>
                <path d="M56.487 13.005c-.397-.133-.793-.199-1.257-.199-1.851 0-3.098 1.058-3.098 2.918 0 1.19.793 1.917 2.107 1.917.463 0 .926-.066 1.323-.199l.199 2.853c-.529.133-1.19.265-1.984.265-3.23 0-5.337-1.984-5.337-4.969 0-4.036 2.985-6.815 7.026-6.815.794 0 1.521.133 2.049.332l-.028 3.897z" fill="#169BD7"/>
                <path d="M63.18 8.92c1.124 0 2.049.199 2.786.596l-.53 3.23c-.661-.331-1.388-.529-2.247-.529-1.058 0-1.851.397-1.851 1.19 0 .728.595 1.058 1.917 1.653 2.181.926 3.098 2.05 3.098 3.701 0 2.918-2.313 4.704-5.766 4.704-1.19 0-2.446-.265-3.23-.661l.529-3.296c.86.463 1.851.728 2.918.728 1.058 0 1.917-.397 1.917-1.257 0-.728-.529-1.124-1.917-1.719-1.984-.86-3.098-1.917-3.098-3.701 0-2.72 2.247-4.639 5.474-4.639z" fill="#169BD7"/>
                <path d="M75.395 8.92c1.124 0 2.049.199 2.786.596l-.53 3.23c-.661-.331-1.388-.529-2.247-.529-1.058 0-1.851.397-1.851 1.19 0 .728.595 1.058 1.917 1.653 2.181.926 3.098 2.05 3.098 3.701 0 2.918-2.313 4.704-5.766 4.704-1.19 0-2.446-.265-3.23-.661l.529-3.296c.86.463 1.851.728 2.918.728 1.058 0 1.917-.397 1.917-1.257 0-.728-.529-1.124-1.917-1.719-1.984-.86-3.098-1.917-3.098-3.701 0-2.72 2.247-4.639 5.474-4.639z" fill="#169BD7"/>
                <path d="M12.237 8.455h8.13c3.197 0 5.418 2.053 5.418 5.013 0 3.658-2.72 6.29-6.542 6.29h-3.197c-.461 0-.793.332-.86.793l-.86 5.08c-.067.332-.265.664-.595.664H9.914c-.397 0-.661-.265-.595-.661l2.588-15.647c.066-.463.331-.794.793-.794l-.463.262z" fill="#179BD7"/>
                <path d="M35.461 8.455h8.13c3.197 0 5.418 2.053 5.418 5.013 0 3.658-2.72 6.29-6.542 6.29h-3.197c-.461 0-.793.332-.86.793l-.86 5.08c-.067.332-.265.664-.595.664h-3.816c-.397 0-.661-.265-.595-.661l2.588-15.647c.066-.463.331-.794.793-.794l.536.262z" fill="#179BD7"/>
                <path d="M12.237 8.455h8.13c3.197 0 5.418 2.053 5.418 5.013 0 3.658-2.72 6.29-6.542 6.29h-3.197c-.461 0-.793.332-.86.793l-.86 5.08c-.067.332-.265.664-.595.664H9.914c-.397 0-.661-.265-.595-.661l2.588-15.647c.066-.463.331-.794.793-.794l-.463.262z" fill="#222D65"/>
                <path d="M35.461 8.455h8.13c3.197 0 5.418 2.053 5.418 5.013 0 3.658-2.72 6.29-6.542 6.29h-3.197c-.461 0-.793.332-.86.793l-.86 5.08c-.067.332-.265.664-.595.664h-3.816c-.397 0-.661-.265-.595-.661l2.588-15.647c.066-.463.331-.794.793-.794l.536.262z" fill="#253B80"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-orange-500/20 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/40">
            <p>&copy; {new Date().getFullYear()} Petrocourse Training. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/terms', label: 'Terms of Service' },
                { href: '/cookies', label: 'Cookie Policy' },
              ].map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className="hover:text-orange-500 transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}