'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import UserMenu from './UserMenu';
import NotificationBell from './NotificationBell';
import { getEnabledOAuthProviders } from '@/integrations';
import { getPostHogService } from '@/integrations';
import { NAV_ITEMS } from '@/config/navigation';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const { data: session, status } = useSession();
  const [oauthProviders, setOauthProviders] = useState<any[]>([]);
  const analytics = getPostHogService();

  useEffect(() => {
    const providers = getEnabledOAuthProviders();
    setOauthProviders(providers);
  }, []);

  // Hero visibility tracking
  useEffect(() => {
    const hero = typeof document !== 'undefined' ? document.getElementById('page-hero') : null;

    if (hero && 'IntersectionObserver' in window) {
      const obs = new IntersectionObserver(
        (entries) => entries.forEach((entry) => setIsHeroVisible(entry.isIntersecting)),
        { root: null, threshold: 0.1 }
      );
      obs.observe(hero);
      return () => obs.disconnect();
    }

    const onScroll = () => setIsHeroVisible(window.scrollY < 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close Get Started dropdown when clicking outside
  useEffect(() => {
    if (!isGetStartedOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#get-started-menu')) {
        setIsGetStartedOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isGetStartedOpen]);

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
          <nav className="hidden lg:flex items-center space-x-2">
            {NAV_ITEMS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="relative group px-6 py-3 font-medium tracking-wide text-sm text-white/90 hover:text-orange-500 transition-colors duration-200"
              >
                {label}
                <span className="absolute bottom-1.5 left-6 right-6 h-0.5 bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full"></span>
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center space-x-3 md:space-x-4">
            {status === 'authenticated' && <NotificationBell />}

            {status === 'loading' && <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />}

            {status === 'unauthenticated' && (
              <div id="get-started-menu" className="relative hidden lg:block">
                <button
                  onClick={() => setIsGetStartedOpen(!isGetStartedOpen)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-black border border-orange-500 text-white font-medium rounded transition-colors duration-200 hover:bg-orange-500 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                  aria-expanded={isGetStartedOpen}
                  aria-haspopup="true"
                >
                  Get Started
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isGetStartedOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isGetStartedOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-zinc-900 border border-white/10 rounded-lg shadow-xl overflow-hidden z-50">
                    {oauthProviders.length > 0 ? (
                      <div className="p-3 border-b border-white/10">
                        <p className="text-xs text-white/50 uppercase tracking-widest font-semibold mb-2">Sign In with</p>
                        <div className="space-y-1.5">
                          {oauthProviders.map((provider) => (
                            <button
                              key={provider.id}
                              onClick={() => {
                                handleSignIn(provider.id);
                                setIsGetStartedOpen(false);
                              }}
                              className="w-full px-3 py-2 text-sm text-white bg-white/5 hover:bg-orange-500/20 border border-white/10 hover:border-orange-500/30 rounded transition-all duration-200 text-left"
                            >
                              {provider.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href="/login"
                        onClick={() => setIsGetStartedOpen(false)}
                        className="flex items-center px-4 py-3 text-sm text-white hover:bg-orange-500/10 hover:text-orange-400 transition-colors duration-200"
                      >
                        Sign In
                      </Link>
                    )}
                    <Link
                      href="/signup"
                      onClick={() => setIsGetStartedOpen(false)}
                      className="flex items-center px-4 py-3 text-sm text-white hover:bg-orange-500/10 hover:text-orange-400 transition-colors duration-200"
                    >
                      Create Account
                    </Link>
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
          <nav className="lg:hidden py-4 border-t border-white/10">
            <div className="flex flex-col space-y-1">
              {NAV_ITEMS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="px-4 py-3 hover:bg-white/5 hover:text-orange-500 transition-all duration-200 rounded font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}

              {/* Mobile: Get Started section */}
              {status === 'unauthenticated' && (
                <div className="border-t border-white/10 mt-4 pt-4 space-y-2">
                  <p className="px-4 text-xs text-white/50 uppercase tracking-widest font-semibold">Get Started</p>
                  {oauthProviders.map((provider) => (
                    <button
                      key={provider.id}
                      onClick={() => {
                        handleSignIn(provider.id);
                        setIsMenuOpen(false);
                      }}
                      className="w-full px-4 py-2.5 text-sm text-white bg-black border border-orange-500 hover:bg-orange-500 rounded transition-all duration-200 text-left font-medium"
                    >
                      Sign in with {provider.name}
                    </button>
                  ))}
                  {oauthProviders.length === 0 && (
                    <Link
                      href="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full px-4 py-2.5 text-sm text-white bg-black border border-orange-500 hover:bg-orange-500 rounded transition-all duration-200 font-medium"
                    >
                      Sign In
                    </Link>
                  )}
                  <Link
                    href="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 hover:bg-white/5 hover:text-orange-500 transition-all duration-200 rounded font-medium"
                  >
                    Create Account
                  </Link>
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