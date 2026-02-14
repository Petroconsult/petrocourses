'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
// Import with graceful fallback for @auth/nextjs setup
let useSession: any = () => ({ data: null, status: 'unauthenticated' });
let signIn: any = () => {};
let signOut: any = () => {};

try {
  const auth = require('next-auth/react');
  useSession = auth.useSession;
  signIn = auth.signIn;
  signOut = auth.signOut;
} catch (e) {
  // Auth not configured, provide no-ops
}

import UserMenu from './UserMenu';
import NotificationBell from './NotificationBell';
import SearchBar from './SearchBar';
import { getEnabledOAuthProviders } from '@/integrations';
import { getPostHogService } from '@/integrations';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [status, setStatus] = useState('unauthenticated');
  const [oauthProviders, setOauthProviders] = useState<any[]>([]);
  const analytics = getPostHogService();

  useEffect(() => {
    const providers = getEnabledOAuthProviders();
    setOauthProviders(providers);
  }, []);

  // Prefer IntersectionObserver on a hero section (id="page-hero").
  // If present, header will be dark while the hero is visible.
  // If not present, fallback to a lightweight scroll check.
  useEffect(() => {
    const hero = typeof document !== 'undefined' ? document.getElementById('page-hero') : null;

    if (hero && 'IntersectionObserver' in window) {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => setIsHeroVisible(entry.isIntersecting));
        },
        { root: null, threshold: 0.1 }
      );
      obs.observe(hero);
      return () => obs.disconnect();
    }

    // Fallback: treat top-of-page as hero-visible
    const onScroll = () => setIsHeroVisible(window.scrollY < 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // Set initial state
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSignIn = async (provider: string) => {
    await analytics.trackSignup(session?.user?.id || 'anonymous', session?.user?.email || '');
    if (signIn) signIn(provider, { callbackUrl: '/dashboard' });
  };

  const handleSignOut = async () => {
    await analytics.capture('user_logout', {
      event: 'User Logout',
      properties: {
        userId: session?.user?.id,
        email: session?.user?.email,
      },
    });
    if (signOut) signOut({ callbackUrl: '/' });
  };

  // Header logic:
  // - Black when at the top (hero visible)
  // - Semi-transparent with backdrop blur when scrolled past hero
  const headerBg = isHeroVisible
    ? 'bg-black'
    : 'bg-black/80 border-b border-white/10 backdrop-blur-sm';
  const logoScale = isHeroVisible ? 'scale-100' : 'scale-95';

  return (
    <header className={`text-white relative z-50 sticky top-0 transition-colors duration-300 ${headerBg}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group flex-shrink-0">
            <div className={`relative w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded flex items-center justify-center font-bold text-lg md:text-xl transition-transform duration-300 ${logoScale} group-hover:scale-105`}>
              <span className="relative z-10">PC</span>
            </div>
            <div className="hidden md:block">
              <div className="font-bold text-lg md:text-xl tracking-tight transition-colors duration-300 group-hover:text-orange-500">Petrocourse</div>
              <div className="text-xs text-white/60">Training & Consulting</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link 
              href="/" 
              className="px-5 py-2.5 hover:text-orange-500 transition-colors duration-200 relative group font-medium"
            >
              Home
              <span className="absolute bottom-1 left-5 right-5 h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
            </Link>
            <Link 
              href="/training" 
              className="px-5 py-2.5 hover:text-orange-500 transition-colors duration-200 relative group font-medium"
            >
              Training
              <span className="absolute bottom-1 left-5 right-5 h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
            </Link>
            <Link 
              href="/training/courses" 
              className="px-5 py-2.5 hover:text-orange-500 transition-colors duration-200 relative group font-medium"
            >
              Courses
              <span className="absolute bottom-1 left-5 right-5 h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
            </Link>
            <Link 
              href="/advisory" 
              className="px-5 py-2.5 hover:text-orange-500 transition-colors duration-200 relative group font-medium"
            >
              Advisory
              <span className="absolute bottom-1 left-5 right-5 h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
            </Link>
            <Link 
              href="/about" 
              className="px-5 py-2.5 hover:text-orange-500 transition-colors duration-200 relative group font-medium"
            >
              About
              <span className="absolute bottom-1 left-5 right-5 h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
            </Link>
          </nav>

          {/* Search Bar - Desktop Only */}
          <div className="hidden md:flex items-center flex-1 max-w-xs mx-4">
            <SearchBar />
          </div>

          {/* Right Side - Auth & Notifications */}
          <div className="flex items-center space-x-3 md:space-x-4">
            {/* Notification Bell - Only show if authenticated */}
            {status === 'authenticated' && (
              <NotificationBell />
            )}

            {/* Auth Section */}
            {status === 'loading' && (
              <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
            )}

            {status === 'unauthenticated' && (
              <div className="hidden lg:flex items-center space-x-2">
                <button
                  onClick={() => setIsAuthMenuOpen(!isAuthMenuOpen)}
                  className="relative group px-6 py-2.5 text-white hover:text-orange-500 transition-colors duration-200 font-medium"
                >
                  Sign In
                  <span className="absolute bottom-1 left-0 right-0 h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
                </button>

                {/* Auth Dropdown Menu */}
                {isAuthMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 bg-zinc-900 border border-white/10 rounded-lg shadow-xl overflow-hidden min-w-48">
                    <div className="p-4 border-b border-white/10">
                      <p className="text-xs text-white/60 uppercase tracking-widest font-semibold mb-3">Sign in with</p>
                      <div className="space-y-2">
                        {oauthProviders.map((provider) => (
                          <button
                            key={provider.id}
                            onClick={() => {
                              handleSignIn(provider.id);
                              setIsAuthMenuOpen(false);
                            }}
                            className="w-full px-4 py-2 text-sm text-white bg-white/5 hover:bg-orange-500/20 border border-white/10 hover:border-orange-500/30 rounded transition-all duration-200 text-left"
                          >
                            {provider.name}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="p-2">
                      <Link
                        href="/signup"
                        className="block px-4 py-2 text-sm text-white hover:bg-white/5 rounded transition-colors duration-200"
                      >
                        Create Account
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            {status === 'authenticated' && session?.user && (
              <UserMenu user={session.user} onSignOut={handleSignOut} />
            )}

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 hover:bg-white/5 rounded transition-colors duration-200 border border-transparent"
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
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-transparent">
            <div className="flex flex-col space-y-1">
              <SearchBar isMobile />
              
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
                href="/advisory" 
                className="px-4 py-3 hover:bg-white/5 hover:text-orange-500 transition-all duration-200 rounded font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Advisory
              </Link>
              <Link 
                href="/about" 
                className="px-4 py-3 hover:bg-white/5 hover:text-orange-500 transition-all duration-200 rounded font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>

              {status === 'unauthenticated' && (
                <div className="border-t border-white/10 mt-4 pt-4 space-y-2">
                  {oauthProviders.map((provider) => (
                    <button
                      key={provider.id}
                      onClick={() => {
                        handleSignIn(provider.id);
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-sm text-white bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/20 rounded transition-all duration-200"
                    >
                      Sign in with {provider.name}
                    </button>
                  ))}
                </div>
              )}

              {status === 'authenticated' && (
                <div className="border-t border-white/10 mt-4 pt-4 space-y-2">
                  <Link 
                    href="/dashboard" 
                    className="block px-4 py-3 hover:bg-white/5 hover:text-orange-500 transition-all duration-200 rounded font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/dashboard/profile" 
                    className="block px-4 py-3 hover:bg-white/5 hover:text-orange-500 transition-all duration-200 rounded font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-white/5 hover:text-orange-500 transition-all duration-200 rounded font-medium"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}