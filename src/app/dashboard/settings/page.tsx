'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    courseReminders: true,
    weeklyDigest: true,
    marketingEmails: false,
    darkMode: true,
    twoFactor: true,
    publicProfile: false,
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Settings</h1>
        <p className="text-white/60">Manage your account preferences and notifications</p>
      </div>

      {/* Notification Settings */}
      <div className="bg-zinc-900/50 border border-white/10 rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/5 border-b border-white/10 p-6">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5.951-1.488 5.951 1.488a1 1 0 001.169-1.409l-7-14z" />
            </svg>
            <span>Notifications</span>
          </h2>
        </div>

        <div className="p-6 space-y-6">
          {/* Email Notifications */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-medium">Email Notifications</h3>
              <p className="text-sm text-white/60">Receive course updates and certificates via email</p>
            </div>
            <button
              onClick={() => handleToggle('emailNotifications')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.emailNotifications ? 'bg-orange-500' : 'bg-white/10'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* SMS Notifications */}
          <div className="flex items-center justify-between border-t border-white/10 pt-6">
            <div>
              <h3 className="text-white font-medium">SMS Notifications</h3>
              <p className="text-sm text-white/60">Receive important alerts via SMS</p>
            </div>
            <button
              onClick={() => handleToggle('smsNotifications')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.smsNotifications ? 'bg-orange-500' : 'bg-white/10'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.smsNotifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Course Reminders */}
          <div className="flex items-center justify-between border-t border-white/10 pt-6">
            <div>
              <h3 className="text-white font-medium">Course Reminders</h3>
              <p className="text-sm text-white/60">Get reminded about upcoming lessons and deadlines</p>
            </div>
            <button
              onClick={() => handleToggle('courseReminders')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.courseReminders ? 'bg-orange-500' : 'bg-white/10'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.courseReminders ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Weekly Digest */}
          <div className="flex items-center justify-between border-t border-white/10 pt-6">
            <div>
              <h3 className="text-white font-medium">Weekly Learning Digest</h3>
              <p className="text-sm text-white/60">Receive a summary of your learning progress every Sunday</p>
            </div>
            <button
              onClick={() => handleToggle('weeklyDigest')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.weeklyDigest ? 'bg-orange-500' : 'bg-white/10'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.weeklyDigest ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Marketing Emails */}
          <div className="flex items-center justify-between border-t border-white/10 pt-6">
            <div>
              <h3 className="text-white font-medium">Marketing Emails</h3>
              <p className="text-sm text-white/60">Receive special offers and promotional content</p>
            </div>
            <button
              onClick={() => handleToggle('marketingEmails')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.marketingEmails ? 'bg-orange-500' : 'bg-white/10'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.marketingEmails ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-zinc-900/50 border border-white/10 rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/5 border-b border-white/10 p-6">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span>Privacy & Security</span>
          </h2>
        </div>

        <div className="p-6 space-y-6">
          {/* Dark Mode */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-medium">Dark Mode</h3>
              <p className="text-sm text-white/60">Use dark theme for the platform</p>
            </div>
            <button
              onClick={() => handleToggle('darkMode')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.darkMode ? 'bg-orange-500' : 'bg-white/10'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Two Factor Authentication */}
          <div className="flex items-center justify-between border-t border-white/10 pt-6">
            <div>
              <h3 className="text-white font-medium">Two-Factor Authentication</h3>
              <p className="text-sm text-white/60">Add extra security to your account</p>
            </div>
            <button
              onClick={() => handleToggle('twoFactor')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.twoFactor ? 'bg-orange-500' : 'bg-white/10'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.twoFactor ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Public Profile */}
          <div className="flex items-center justify-between border-t border-white/10 pt-6">
            <div>
              <h3 className="text-white font-medium">Public Profile</h3>
              <p className="text-sm text-white/60">Allow others to see your profile and certificates</p>
            </div>
            <button
              onClick={() => handleToggle('publicProfile')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.publicProfile ? 'bg-orange-500' : 'bg-white/10'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.publicProfile ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Connected Accounts */}
      <div className="bg-zinc-900/50 border border-white/10 rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-500/10 to-green-600/5 border-b border-white/10 p-6">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            <span>Connected Accounts</span>
          </h2>
        </div>

        <div className="p-6 space-y-4">
          {['Google', 'LinkedIn', 'GitHub', 'Microsoft'].map((provider) => (
            <div key={provider} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white/60" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium">{provider}</p>
                  <p className="text-sm text-white/60">Connected</p>
                </div>
              </div>
              <button className="px-4 py-2 text-red-400 hover:text-red-300 font-medium text-sm">
                Disconnect
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Support */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
          <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18.343 6.343l-2.686-2.686A3 3 0 0010 3h-1a3 3 0 00-3 3v1H4a3 3 0 00-3 3v7a3 3 0 003 3h12a3 3 0 003-3v-7a3 3 0 00-3-3h-2V6a1 1 0 011 1v1h-4V6a1 1 0 011-1h.5a1 1 0 110-2h-.5a3 3 0 00-3 3v1H4a1 1 0 00-1 1v7a1 1 0 001 1h12a1 1 0 001-1v-7a1 1 0 00-1-1h-2v-1a3 3 0 003-3z" clipRule="evenodd" />
          </svg>
          <span>Need Help?</span>
        </h3>
        <p className="text-white/60 text-sm mb-4">
          Check out our support documentation or contact our customer support team.
        </p>
        <div className="flex gap-3">
          <button className="px-6 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg text-purple-400 font-medium transition-all duration-200 text-sm">
            View Documentation
          </button>
          <button className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-medium transition-all duration-200 text-sm">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
