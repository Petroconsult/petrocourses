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
        properties: { email: newsletterEmail, timestamp: new Date() },
      });
      const resend = getResendService();
      const result = await resend.sendWelcomeEmail(newsletterEmail, 'Petrocourse Subscriber');
      if (result.success) {
        setNewsletterStatus('success');
        setNewsletterMessage('Welcome aboard! Check your email for updates.');
        setNewsletterEmail('');
        setTimeout(() => { setNewsletterStatus('idle'); setNewsletterMessage(''); }, 4000);
      } else {
        throw new Error('Failed to subscribe');
      }
    } catch (error) {
      setNewsletterStatus('error');
      setNewsletterMessage('Failed to subscribe. Please try again.');
    }
  };

  const navColumns = [
    {
      heading: 'Explore',
      links: [
        { href: '/training', label: 'Training Programs' },
        { href: '/training/courses', label: 'All Courses' },
        { href: '/dashboard/certificates', label: 'My Certificates' },
        { href: '/about', label: 'About Us' },
      ],
    },
    {
      heading: 'Services',
      links: [
        { href: '/advisory', label: 'Advisory Services' },
        { href: '/training/courses', label: 'Training & Development' },
        { href: '/consultancy', label: 'Consultancy' },
        { href: '/advisory/book', label: 'Book a Session' },
      ],
    },
    {
      heading: 'Support',
      links: [
        { href: '/contact', label: 'Contact Us' },
        { href: '/support', label: 'Support Tickets' },
        { href: 'https://help.petrocourses.co.uk', label: 'Help Center' },
      ],
    },
  ];

  return (
    <footer className="bg-black text-white border-t border-white/8 relative overflow-hidden">

      {/* Grid texture — consistent with site */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">

        {/* ── NEWSLETTER ──────────────────────────────────────────────── */}
        <div className="py-16 border-b border-white/8">
          <div className="grid md:grid-cols-2 gap-10 items-end">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <span className="block w-8 h-px bg-orange-500" />
                <span className="text-orange-500 text-xs font-bold uppercase tracking-[0.25em]">
                  Newsletter
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight mb-3">
                Stay Ahead of the<br />
                <span className="text-orange-500">Industry.</span>
              </h2>
              <p className="text-white/40 text-sm leading-relaxed max-w-sm">
                Training updates, industry news, and professional development tips — straight to your inbox.
              </p>
            </div>

            <div>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 bg-white/[0.03] border border-white/8 rounded text-sm text-white placeholder-white/25 focus:outline-none focus:border-orange-500/60 focus:bg-white/[0.05] transition-all duration-200"
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === 'loading'}
                  className="px-7 py-3 bg-orange-500 hover:bg-orange-400 text-black font-bold text-sm rounded transition-colors duration-200 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {newsletterStatus === 'loading' ? 'Subscribing…' : 'Subscribe'}
                </button>
              </form>
              {newsletterMessage && (
                <p className={`text-xs mt-3 ${newsletterStatus === 'success' ? 'text-orange-400' : 'text-red-400'}`}>
                  {newsletterMessage}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ── MAIN GRID ───────────────────────────────────────────────── */}
        <div className="py-16 border-b border-white/8 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12">

          {/* Brand column */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded flex items-center justify-center font-bold text-base text-white">
                PC
              </div>
              <div>
                <div className="font-bold text-base tracking-tight group-hover:text-orange-500 transition-colors duration-200">
                  Petrocourse
                </div>
                <div className="text-[10px] text-white/40 uppercase tracking-wider">Training &amp; Consulting</div>
              </div>
            </Link>

            <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-8">
              Industry-leading petroleum training and advisory services for professionals worldwide.
            </p>

            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:info@petroconsultenergy.co.uk"
                  className="text-white/40 text-xs hover:text-orange-400 transition-colors duration-200 break-all"
                >
                  info@petroconsultenergy.co.uk
                </a>
              </li>
              <li>
                <a
                  href="tel:+441708755355"
                  className="text-white/40 text-xs hover:text-orange-400 transition-colors duration-200"
                >
                  +44 (0) 1708 755 355
                </a>
              </li>
              <li>
                <p className="text-white/30 text-xs leading-relaxed">
                  4 Holgate Court, Romford,<br />Essex, RM1 3JS, UK
                </p>
              </li>
            </ul>
          </div>

          {/* Nav columns */}
          {navColumns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-5">
                {col.heading}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/50 text-sm hover:text-orange-400 transition-colors duration-200 hover:translate-x-0.5 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── PAYMENT PARTNERS ────────────────────────────────────────── */}
        <div className="py-10 border-b border-white/8 flex flex-col sm:flex-row sm:items-center gap-6">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/25 flex-shrink-0">
            Secure Payments
          </span>
          <div className="flex flex-wrap gap-8 items-center">
            {/* Stripe */}
            <div className="opacity-30 hover:opacity-60 transition-opacity duration-200" title="Stripe">
              <svg className="h-6" viewBox="0 0 60 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M59.6 13.1c0-5.6-2.7-10-7.8-10-5.1 0-8.3 4.4-8.3 10 0 6.6 3.7 9.9 9 9.9 2.6 0 4.6-.6 6.1-1.4v-4.3c-1.5.8-3.2 1.2-5.4 1.2-2.1 0-4-.8-4.2-3.5h10.5c0-.3.1-1.2.1-1.9zm-10.6-2c0-2.6 1.6-3.7 2.9-3.7 1.2 0 2.7 1.1 2.7 3.7h-5.6zm-8.8-7.8c-2.1 0-3.5 1-4.2 1.7l-.3-1.3h-4.6v22.1l5.2-1.1V18c.8.5 1.9 1.2 3.8 1.2 3.8 0 7.3-3.1 7.3-10.1-.1-6.4-3.5-9.8-7.2-9.8zm-1.2 15.1c-1.3 0-2-.5-2.5-1.1V9.6c.5-.6 1.3-1.1 2.5-1.1 1.9 0 3.2 2.1 3.2 5.3 0 3.3-1.3 5.4-3.2 5.4zM27.9 3.5l5.2-1.1V0l-5.2 1.1v2.4zm0 1.8h5.2v17.5h-5.2V5.3zM18.9 7l-.4-1.7h-4.5v17.5h5.2V11.3c1.2-1.6 3.3-1.3 3.9-1.1V5.3c-.6-.2-3-.6-4.2 1.7zm-7.8-4L6 4.1v13.8c0 3.2 2.4 5.5 5.5 5.5 1.7 0 3-.3 3.7-.7v-4.3c-.7.3-4.1 1.3-4.1-1.9V9.2h4.1V5.3h-4.1V3z" fill="white"/>
              </svg>
            </div>
            {/* PayPal */}
            <div className="opacity-30 hover:opacity-60 transition-opacity duration-200" title="PayPal">
              <svg className="h-6" viewBox="0 0 100 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.237 8.455h8.13c3.197 0 5.418 2.053 5.418 5.013 0 3.658-2.72 6.29-6.542 6.29h-3.197c-.461 0-.793.332-.86.793l-.86 5.08c-.067.332-.265.664-.595.664H9.914c-.397 0-.661-.265-.595-.661l2.588-15.647c.066-.463.331-.794.793-.794l-.463.262z" fill="#169BD7"/>
                <path d="M35.461 8.455h8.13c3.197 0 5.418 2.053 5.418 5.013 0 3.658-2.72 6.29-6.542 6.29h-3.197c-.461 0-.793.332-.86.793l-.86 5.08c-.067.332-.265.664-.595.664h-3.816c-.397 0-.661-.265-.595-.661l2.588-15.647c.066-.463.331-.794.793-.794l.536.262z" fill="#253B80"/>
              </svg>
            </div>
          </div>
        </div>

        {/* ── BOTTOM BAR ──────────────────────────────────────────────── */}
        <div className="py-7 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} Petrocourse Training. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {[
              { href: '/privacy', label: 'Privacy Policy' },
              { href: '/terms', label: 'Terms of Service' },
              { href: '/cookies', label: 'Cookie Policy' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/25 text-xs hover:text-orange-400 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}