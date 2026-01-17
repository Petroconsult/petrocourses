'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-auto border-t border-orange-500/20 relative overflow-hidden">
      {/* Animated background effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/3 rounded-full blur-3xl animate-pulse-slow animation-delay-1000"></div>
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Company Info - Takes more space */}
          <div className="lg:col-span-4 animate-fade-in-up">
            <div className="flex items-center space-x-3 mb-6 group cursor-pointer">
              <div className="relative w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-700 rounded-lg flex items-center justify-center font-bold text-2xl shadow-lg group-hover:shadow-orange-500/50 transition-all duration-300 group-hover:scale-110">
                <span className="relative z-10">PC</span>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div>
                <div className="font-bold text-2xl tracking-tight group-hover:text-orange-500 transition-colors duration-300">Petrocourse</div>
                <div className="text-xs text-white/50 uppercase tracking-wider">Training</div>
              </div>
            </div>
            <p className="text-white/60 leading-relaxed mb-8 max-w-sm">
              Leading provider of petroleum and gas training and consulting services, delivering excellence globally.
            </p>
            
            {/* Newsletter Signup */}
            <div className="mb-8 group">
              <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">Stay Updated</h4>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-4 py-2.5 bg-black border border-orange-500/20 rounded-lg text-sm text-white placeholder-white/40 focus:outline-none focus:border-orange-500/60 transition-all duration-300"
                />
                <button className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg font-semibold text-sm hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 hover:scale-105 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-3">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group/social inline-flex items-center justify-center w-11 h-11 bg-black border border-orange-500/20 hover:bg-orange-500 hover:border-orange-500 rounded-lg transition-all duration-300 hover:scale-110 shadow-md hover:shadow-orange-500/30"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5 group-hover/social:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group/social inline-flex items-center justify-center w-11 h-11 bg-black border border-orange-500/20 hover:bg-orange-500 hover:border-orange-500 rounded-lg transition-all duration-300 hover:scale-110 shadow-md hover:shadow-orange-500/30"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5 group-hover/social:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group/social inline-flex items-center justify-center w-11 h-11 bg-black border border-orange-500/20 hover:bg-orange-500 hover:border-orange-500 rounded-lg transition-all duration-300 hover:scale-110 shadow-md hover:shadow-orange-500/30"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 group-hover/social:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group/social inline-flex items-center justify-center w-11 h-11 bg-black border border-orange-500/20 hover:bg-orange-500 hover:border-orange-500 rounded-lg transition-all duration-300 hover:scale-110 shadow-md hover:shadow-orange-500/30"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5 group-hover/social:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 animate-fade-in-up animation-delay-100">
            <h3 className="font-bold text-white mb-6 text-sm uppercase tracking-wider relative inline-block">
              Quick Links
               </h3>
            <ul className="space-y-4">
              {[
                { href: '/training', label: 'Training Programs' },
                { href: '/training/courses', label: 'All Courses' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-white/60 hover:text-orange-500 transition-all duration-300 inline-flex items-center group hover:translate-x-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity scale-0 group-hover:scale-100"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3 animate-fade-in-up animation-delay-200">
            <h3 className="font-bold text-white mb-6 text-sm uppercase tracking-wider relative inline-block">
              Services
             </h3>
            <ul className="space-y-4">
              {[
                { href: '/services/advisory', label: 'Advisory Services' },
                { href: '/services/upstream', label: 'Upstream E&P Consulting' },
                { href: '/services/consultancy', label: 'Consultancy Services' },
                { href: '/services/procurement', label: 'Procurement Services' },
                { href: '/services/project-management', label: 'Project Management' },
                { href: '/services/training', label: 'Training & Development' },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-white/60 hover:text-orange-500 transition-all duration-300 inline-flex items-center group hover:translate-x-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity scale-0 group-hover:scale-100"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 animate-fade-in-up animation-delay-300">
            <h3 className="font-bold text-white mb-6 text-sm uppercase tracking-wider relative inline-block">
              Get In Touch
              
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start group">
                <div className="flex-shrink-0 w-10 h-10 bg-black border border-orange-500/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-orange-500/10 group-hover:border-orange-500/40 transition-all group-hover:scale-110">
                  <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1 pt-1.5">
                  <a href="mailto:info@petroconsultenergy.co.uk" className="text-white/60 hover:text-orange-500 transition-colors duration-300 break-all relative inline-block group/link">
                    info@petroconsultenergy.co.uk
                    <span className="absolute bottom-0 left-0 w-full h-px bg-orange-500 scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </a>
                </div>
              </li>
              <li className="flex items-start group">
                <div className="flex-shrink-0 w-10 h-10 bg-black border border-orange-500/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-orange-500/10 group-hover:border-orange-500/40 transition-all group-hover:scale-110">
                  <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="flex-1 pt-1.5">
                  <a href="tel:+441708755355" className="text-white/60 hover:text-orange-500 transition-colors duration-300 relative inline-block group/link">
                    +44 (0) 1708 755 355
                    <span className="absolute bottom-0 left-0 w-full h-px bg-orange-500 scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </a>
                </div>
              </li>
              <li className="flex items-start group">
                <div className="flex-shrink-0 w-10 h-10 bg-black border border-orange-500/20 rounded-lg flex items-center justify-center mr-4 group-hover:bg-orange-500/10 group-hover:border-orange-500/40 transition-all group-hover:scale-110">
                  <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1 pt-1.5">
                  <span className="text-white/60 leading-relaxed">4 Holgate Court Western Road, Romford, Essex, RM1 3JS, United Kingdom</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-orange-500/20 mt-16 pt-8 animate-fade-in-up animation-delay-400">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/40 text-sm">
              &copy; {new Date().getFullYear()} Petrocourse Training. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm">
              {[
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/terms', label: 'Terms of Service' },
                { href: '/cookies', label: 'Cookie Policy' },
              ].map((link) => (
                <a 
                  key={link.href}
                  href={link.href} 
                  className="text-white/40 hover:text-orange-500 transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-full h-px bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animation-delay-100 {
          animation-delay: 100ms;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        
        .animation-delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </footer>
  );
}