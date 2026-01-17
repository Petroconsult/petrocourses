'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-black text-white relative z-50 border-b border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded flex items-center justify-center font-bold text-xl transition-transform duration-200 group-hover:scale-105">
              <span className="relative z-10">PC</span>
            </div>
            <div>
              <div className="font-bold text-xl tracking-tight transition-colors duration-300 group-hover:text-orange-500">Petrocourse</div>
              <div className="text-xs text-white/60">Training & Consulting Excellence</div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            <Link 
              href="/" 
              className="px-5 py-2.5 hover:text-orange-500 transition-colors duration-200 relative group font-medium"
            >
              <span>Home</span>
              <span className="absolute bottom-1 left-5 right-5 h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
            </Link>
            <Link 
              href="/training" 
              className="px-5 py-2.5 hover:text-orange-500 transition-colors duration-200 relative group font-medium"
            >
              <span>Training</span>
              <span className="absolute bottom-1 left-5 right-5 h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
            </Link>
            <Link 
              href="/training/courses" 
              className="px-5 py-2.5 hover:text-orange-500 transition-colors duration-200 relative group font-medium"
            >
              <span>Courses</span>
              <span className="absolute bottom-1 left-5 right-5 h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
            </Link>
            <Link 
              href="/about" 
              className="px-5 py-2.5 hover:text-orange-500 transition-colors duration-200 relative group font-medium"
            >
              <span>About</span>
              <span className="absolute bottom-1 left-5 right-5 h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
            </Link>
            <Link 
              href="/contact" 
              className="px-5 py-2.5 hover:text-orange-500 transition-colors duration-200 relative group font-medium"
            >
              <span>Contact</span>
              <span className="absolute bottom-1 left-5 right-5 h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
            </Link>
            <Link
              href="/training/enroll"
              className="ml-6 bg-orange-500 px-8 py-2.5 rounded font-semibold transition-all duration-200 hover:bg-orange-600 hover:scale-[1.02]"
            >
              Enroll Now
            </Link>
          </nav>

          <button
            className="lg:hidden p-2 hover:bg-white/5 rounded transition-colors duration-200 border border-white/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <nav className="lg:hidden py-6 border-t border-white/10">
            <div className="flex flex-col space-y-1">
              <Link 
                href="/" 
                className="px-4 py-3 hover:bg-white/5 hover:text-orange-500 transition-all duration-200 rounded font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/training" 
                className="px-4 py-3 hover:bg-white/5 hover:text-orange-500 transition-all duration-200 rounded font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Training
              </Link>
              <Link 
                href="/training/courses" 
                className="px-4 py-3 hover:bg-white/5 hover:text-orange-500 transition-all duration-200 rounded font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Courses
              </Link>
              <Link 
                href="/about" 
                className="px-4 py-3 hover:bg-white/5 hover:text-orange-500 transition-all duration-200 rounded font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="px-4 py-3 hover:bg-white/5 hover:text-orange-500 transition-all duration-200 rounded font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/training/enroll"
                className="mx-4 mt-4 bg-orange-500 px-6 py-3 rounded transition-all duration-200 font-semibold text-center hover:bg-orange-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Enroll Now
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}