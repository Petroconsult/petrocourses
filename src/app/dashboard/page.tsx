'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

// Graceful fallback for auth
let useSession: any = () => ({ data: null });
try {
  const auth = require('next-auth/react');
  useSession = auth.useSession;
} catch (e) {
  // Auth not configured
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    enrolledCourses: 3,
    certificatesEarned: 1,
    hoursCompleted: 24,
    upcomingBookings: 2,
  });

  return (
    <div className="space-y-12 bg-black text-white min-h-screen py-8">
      {/* Welcome Section */}
      <section className="relative overflow-hidden rounded-2xl group">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-orange-700 to-orange-900 opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        
        {/* Floating orbs */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-orange-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl animate-float-delayed"></div>
        
        <div className="relative p-12 md:p-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up">
              Welcome back, {session?.user?.name?.split(' ')[0]}! 👋
            </h1>
            <p className="text-lg text-white/95 max-w-2xl leading-relaxed animate-fade-in-up animation-delay-100">
              Keep up the momentum! You're making great progress on your learning journey. Continue exploring courses and earning certificates.
            </p>
          </div>
        </div>
      </section>

      {/* Key Stats */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            label="Enrolled Courses"
            value={stats.enrolledCourses}
            icon="📚"
            href="/dashboard/courses"
            index={0}
          />
          <StatCard
            label="Certificates Earned"
            value={stats.certificatesEarned}
            icon="🏆"
            href="/dashboard/certificates"
            index={1}
          />
          <StatCard
            label="Hours Completed"
            value={stats.hoursCompleted}
            icon="⏱️"
            href="/dashboard/progress"
            index={2}
          />
          <StatCard
            label="Upcoming Sessions"
            value={stats.upcomingBookings}
            icon="📅"
            href="/dashboard/bookings"
            index={3}
          />
        </div>
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-up">
        {/* Continue Learning */}
        <div className="group relative bg-gradient-to-br from-orange-500/5 to-transparent border border-orange-500/20 p-8 rounded-xl hover:border-orange-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold group-hover:text-orange-400 transition-colors duration-300">Continue Learning</h3>
              <svg className="w-8 h-8 text-orange-500 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m0 0h6" />
              </svg>
            </div>
            <p className="text-white/60 text-base mb-6 group-hover:text-white/90 transition-colors duration-300">Resume your course and earn that certificate</p>
            <Link
              href="/dashboard/courses"
              className="inline-block px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/20"
            >
              View Courses →
            </Link>
          </div>
        </div>

        {/* Book Advisory Session */}
        <div className="group relative bg-gradient-to-br from-blue-500/5 to-transparent border border-blue-500/20 p-8 rounded-xl hover:border-blue-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold group-hover:text-blue-400 transition-colors duration-300">Book Advisory</h3>
              <svg className="w-8 h-8 text-blue-500 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-white/60 text-base mb-6 group-hover:text-white/90 transition-colors duration-300">Get 1-on-1 guidance from industry experts</p>
            <Link
              href="/advisory/book"
              className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/20"
            >
              Schedule Now →
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="animate-fade-in-up animation-delay-200">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Your Recent Activity
          </h2>
          <p className="text-white/60">Stay on top of your learning progress</p>
        </div>
        <div className="relative bg-gradient-to-br from-orange-500/5 to-transparent border border-orange-500/10 rounded-xl p-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-50"></div>
          <div className="relative space-y-1">
            {[
              {
                type: 'course',
                title: 'Completed Module 3: Pipeline Operations',
                date: '2 days ago',
                icon: '✓',
                color: 'from-orange-500 to-orange-600'
              },
              {
                type: 'certificate',
                title: 'Earned HSE Training Certification',
                date: '1 week ago',
                icon: '🏆',
                color: 'from-yellow-500 to-yellow-600'
              },
              {
                type: 'booking',
                title: 'Attended Advisory Session with Dr. Smith',
                date: '2 weeks ago',
                icon: '📅',
                color: 'from-blue-500 to-blue-600'
              },
            ].map((activity, idx) => (
              <div key={idx} className="group flex items-center space-x-4 p-4 rounded-lg hover:bg-white/5 transition-all duration-300">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${activity.color} flex items-center justify-center text-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white group-hover:text-orange-400 transition-colors duration-300">{activity.title}</p>
                  <p className="text-xs text-white/50 mt-1">{activity.date}</p>
                </div>
                <svg className="w-5 h-5 text-white/30 group-hover:text-orange-500 transition-colors duration-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="animate-fade-in-up animation-delay-300">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Your Learning Path
          </h2>
          <p className="text-white/60">Track your progress across all courses</p>
        </div>
        <div className="space-y-6">
          <ProgressBar title="Oil & Gas Fundamentals" percentage={75} delay={0} color="from-orange-500 to-orange-600" />
          <ProgressBar title="Pipeline Operations" percentage={45} delay={100} color="from-blue-500 to-blue-600" />
          <ProgressBar title="HSE Training" percentage={100} delay={200} color="from-green-500 to-green-600" />
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value, icon, href, index }: { label: string; value: number | string; icon: string; href: string; index: number }) {
  return (
    <Link href={href}>
      <div 
        className="group relative bg-gradient-to-br from-orange-500/5 to-transparent border border-orange-500/20 p-8 rounded-xl hover:border-orange-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 animate-fade-in-up cursor-pointer"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
        <div className="relative">
          <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{icon}</div>
          <p className="text-white/60 text-sm mb-3 group-hover:text-white/80 transition-colors duration-300">{label}</p>
          <p className="text-4xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300">{value}</p>
        </div>
      </div>
    </Link>
  );
}

function ProgressBar({ title, percentage, delay = 0, color }: { title: string; percentage: number; delay?: number; color?: string }) {
  const gradientColor = color || 'from-orange-500 to-orange-600';
  
  return (
    <div 
      className="group animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative bg-gradient-to-br from-blue-500/5 to-transparent border border-blue-500/10 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <p className="font-semibold text-white text-lg group-hover:text-blue-400 transition-colors duration-300">{title}</p>
          <div className="flex items-center space-x-2">
            <p className="text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-blue-600 px-3 py-1 rounded-full">{percentage}%</p>
          </div>
        </div>
        <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden group-hover:bg-white/10 transition-colors duration-300">
          <div
            className={`bg-gradient-to-r ${gradientColor} h-3 rounded-full transition-all duration-500 relative overflow-hidden`}
            style={{ width: `${percentage}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
