'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import type { Session } from 'next-auth';

interface UserMenuProps {
  user: Session['user'];
  onSignOut: () => void;
}

export default function UserMenu({ user, onSignOut }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-white/10 transition-colors duration-200"
      >
        {user?.image && (
          <img
            src={user.image}
            alt={user.name || 'User'}
            className="w-8 h-8 rounded-full ring-2 ring-orange-500/50"
          />
        )}
        {!user?.image && (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-sm font-bold">
            {user?.name?.charAt(0) || 'U'}
          </div>
        )}
        <svg className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-zinc-900 border border-white/10 rounded-lg shadow-xl overflow-hidden">
          {/* User Info */}
          <div className="p-4 border-b border-white/10 bg-white/5">
            <p className="font-semibold text-white">{user?.name}</p>
            <p className="text-sm text-white/60">{user?.email}</p>
          </div>

          {/* Menu Links */}
          <div className="py-2">
            <Link
              href="/dashboard"
              className="block px-4 py-3 text-white hover:bg-white/5 transition-colors duration-200 flex items-center space-x-3"
              onClick={() => setIsOpen(false)}
            >
              <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 11l4-4m0 0l4 4m-4-4v4" />
              </svg>
              <span>Dashboard</span>
            </Link>

            <Link
              href="/dashboard/progress"
              className="block px-4 py-3 text-white hover:bg-white/5 transition-colors duration-200 flex items-center space-x-3"
              onClick={() => setIsOpen(false)}
            >
              <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>My Progress</span>
            </Link>

            <Link
              href="/dashboard/certificates"
              className="block px-4 py-3 text-white hover:bg-white/5 transition-colors duration-200 flex items-center space-x-3"
              onClick={() => setIsOpen(false)}
            >
              <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Certificates</span>
            </Link>

            <Link
              href="/dashboard/bookings"
              className="block px-4 py-3 text-white hover:bg-white/5 transition-colors duration-200 flex items-center space-x-3"
              onClick={() => setIsOpen(false)}
            >
              <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>My Bookings</span>
            </Link>

            <div className="border-t border-white/10 my-2" />

            <Link
              href="/dashboard/settings"
              className="block px-4 py-3 text-white hover:bg-white/5 transition-colors duration-200 flex items-center space-x-3"
              onClick={() => setIsOpen(false)}
            >
              <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Settings</span>
            </Link>

            <button
              onClick={() => {
                onSignOut();
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-white hover:bg-red-500/10 transition-colors duration-200 flex items-center space-x-3 text-red-400"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
