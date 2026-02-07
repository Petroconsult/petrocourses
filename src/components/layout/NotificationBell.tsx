'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { getFirebaseService } from '@/integrations';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'payment' | 'booking' | 'course' | 'certificate' | 'message';
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const bellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mock notifications - in production, fetch from database
    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'Payment Received',
        message: 'Your payment for Advanced Petroleum has been processed',
        type: 'payment',
        read: false,
        createdAt: new Date(Date.now() - 3600000),
        actionUrl: '/dashboard/payments',
      },
      {
        id: '2',
        title: 'Course Started',
        message: 'Your course "Pipeline Operations" begins tomorrow',
        type: 'course',
        read: false,
        createdAt: new Date(Date.now() - 7200000),
        actionUrl: '/training/courses/pipeline-operations',
      },
      {
        id: '3',
        title: 'Booking Reminder',
        message: 'Your session with Dr. Smith is in 2 hours',
        type: 'booking',
        read: true,
        createdAt: new Date(Date.now() - 86400000),
        actionUrl: '/dashboard/bookings',
      },
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (bellRef.current && !bellRef.current.contains(event.target as Node)) {
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

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
    setUnreadCount(Math.max(0, unreadCount - 1));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return (
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'booking':
        return (
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'course':
        return (
          <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C6.228 6.228 2 10.392 2 15.5c0 5.289 4.226 9.5 10 9.5s10-4.211 10-9.5c0-5.108-4.228-9.247-10-9.247z" />
          </svg>
        );
      case 'certificate':
        return (
          <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        );
    }
  };

  return (
    <div className="relative" ref={bellRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-zinc-900 border border-white/10 rounded-lg shadow-xl">
          {/* Header */}
          <div className="p-4 border-b border-white/10 sticky top-0 bg-zinc-900">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">Notifications</h3>
              {unreadCount > 0 && (
                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
          </div>

          {/* Notification List */}
          {notifications.length > 0 ? (
            <div className="divide-y divide-white/5">
              {notifications.map((notification) => (
                <button
                  key={notification.id}
                  onClick={() => {
                    markAsRead(notification.id);
                    if (notification.actionUrl) {
                      window.location.href = notification.actionUrl;
                    }
                  }}
                  className={`w-full text-left px-4 py-4 hover:bg-white/5 transition-colors duration-200 ${
                    !notification.read ? 'bg-orange-500/10' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white">{notification.title}</p>
                      <p className="text-xs text-white/60 mt-1">{notification.message}</p>
                      <p className="text-xs text-white/40 mt-2">
                        {Math.floor((Date.now() - new Date(notification.createdAt).getTime()) / 60000)} minutes ago
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="flex-shrink-0 w-2 h-2 bg-orange-500 rounded-full mt-1" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <svg className="w-12 h-12 mx-auto text-white/20 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <p className="text-white/60 text-sm">No notifications yet</p>
            </div>
          )}

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-4 border-t border-white/10 bg-white/5">
              <Link
                href="/dashboard/notifications"
                className="text-center block text-orange-500 hover:text-orange-400 text-sm font-medium transition-colors duration-200"
              >
                View all notifications
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
