'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Certificate {
  id: string;
  course: string;
  issuedDate: string;
  completionDate: string;
  certificateUrl: string;
}

export default function CertificatesPage() {
  const [certificates] = useState<Certificate[]>([
    {
      id: 'cert_1',
      course: 'HSE Training & Compliance',
      issuedDate: '2026-01-15',
      completionDate: '2026-01-10',
      certificateUrl: '#',
    },
    {
      id: 'cert_2',
      course: 'Oil & Gas Industry Fundamentals',
      issuedDate: '2025-12-20',
      completionDate: '2025-12-15',
      certificateUrl: '#',
    },
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Certificates</h1>
        <p className="text-white/60">
          Showcase your achievements and professional credentials earned through successful course completion.
        </p>
      </div>

      {/* Certificates Grid */}
      {certificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/20 rounded-lg overflow-hidden hover:border-orange-500/40 transition-all duration-300 group"
            >
              {/* Certificate Preview */}
              <div className="aspect-video bg-gradient-to-br from-orange-600 to-orange-700 relative overflow-hidden flex items-center justify-center p-6">
                <div className="text-center space-y-2">
                  <svg className="w-16 h-16 mx-auto text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <p className="font-semibold text-white text-sm">Certificate of Completion</p>
                </div>
              </div>

              {/* Certificate Info */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2">{cert.course}</h3>
                <div className="space-y-2 mb-6 text-sm text-white/60">
                  <p>
                    <span className="text-white/80">Completed:</span> {new Date(cert.completionDate).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="text-white/80">Issued:</span> {new Date(cert.issuedDate).toLocaleDateString()}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30 rounded-lg text-orange-500 font-medium transition-all duration-200 text-sm">
                    View Certificate
                  </button>
                  <button className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-medium transition-all duration-200 text-sm">
                    Download
                  </button>
                </div>

                {/* Share */}
                <button className="w-full mt-3 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white font-medium transition-all duration-200 text-sm flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C9.589 12.938 10 11.966 10 11V5c0-1.657-1.343-3-3-3S4 3.343 4 5v6c0 .966.411 1.938 1.316 2.342m0 0h0m9.316-6.342c.905.404 1.316 1.376 1.316 2.342v6c0 1.657-1.343 3-3 3s-3-1.343-3-3v-1.317m0 0h0" />
                  </svg>
                  <span>Share on LinkedIn</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-12 text-center">
          <svg className="w-16 h-16 mx-auto text-white/20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-bold text-white mb-2">No Certificates Yet</h3>
          <p className="text-white/60 mb-6 max-w-sm mx-auto">
            Complete your first course to earn a certificate and showcase your professional achievements.
          </p>
          <Link
            href="/training/courses"
            className="inline-block px-6 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold transition-all duration-200"
          >
            Start Learning
          </Link>
        </div>
      )}

      {/* Certificate Tips */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
          <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18.243 3.579A2 2 0 0016.97 3H3.03a2 2 0 00-1.272.579m16.485 0a2 2 0 01.578 1.271v11.3a2 2 0 01-.579 1.272M3.03 3a2 2 0 00-1.272.579m0 0a2 2 0 01-.578 1.271v11.3a2 2 0 01.579 1.272m0 0A2 2 0 003.03 17h13.94a2 2 0 001.272-.579m0 0a2 2 0 00.579-1.272V4.85a2 2 0 00-.579-1.272" clipRule="evenodd" />
          </svg>
          <span>Tips for Certificate Success</span>
        </h3>
        <ul className="space-y-2 text-white/70 text-sm">
          <li className="flex items-start space-x-3">
            <span className="text-blue-500 font-bold">→</span>
            <span>Complete all course modules and lessons to be eligible for certification</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-blue-500 font-bold">→</span>
            <span>Take and attempt all quizzes - they help reinforce learning but don't affect eligibility</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-blue-500 font-bold">→</span>
            <span>Share your certificates on LinkedIn to boost your professional profile</span>
          </li>
          <li className="flex items-start space-x-3">
            <span className="text-blue-500 font-bold">→</span>
            <span>Combine multiple certificates to showcase comprehensive expertise</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
