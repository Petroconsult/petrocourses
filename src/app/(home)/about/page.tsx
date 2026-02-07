"use client";
import React, { useState } from 'react';
import Link from 'next/link';

// Icon Components
const GraduationCapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

const TargetIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="6"/>
    <circle cx="12" cy="12" r="2"/>
  </svg>
);

const ZapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const AwardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <circle cx="12" cy="8" r="7"/>
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
  </svg>
);

const TrendingUpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
);

const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <circle cx="12" cy="12" r="10"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);

const BookOpenIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);

const BriefcaseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 7v-2a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
  </svg>
);

const StepsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M3 4v16h18V4m-5 0h0m0 16h0"/>
    <line x1="8" y1="4" x2="8" y2="20"/>
    <line x1="16" y1="4" x2="16" y2="20"/>
  </svg>
);

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  // Core services offered by platform
  const services = [
    {
      icon: <BookOpenIcon />,
      title: "Professional Training",
      description: "Self-paced, structured courses with audio-based tracking and automatic certification",
      link: "/training/courses"
    },
    {
      icon: <TargetIcon />,
      title: "Advisory Services",
      description: "Expert guidance sessions for strategic career and organizational decisions",
      link: "/advisory/book"
    },
    {
      icon: <BriefcaseIcon />,
      title: "Consultancy",
      description: "Comprehensive consulting for organizational development and training implementation",
      link: "/consultancy/book"
    }
  ];

  // Curriculum features
  const features = [
    {
      icon: <GraduationCapIcon />,
      title: "Audio-Based Progression",
      description: "Complete lessons through immersive audio content with automatic progress tracking"
    },
    {
      icon: <AwardIcon />,
      title: "Auto-Issued Certificates",
      description: "Earn credentials automatically upon 100% course completion - no manual review needed"
    },
    {
      icon: <StepsIcon />,
      title: "Enforced Sequencing",
      description: "Follow a structured learning path - complete lessons in order for mastery"
    },
    {
      icon: <CheckCircleIcon />,
      title: "Self-Assessed Quizzes",
      description: "Validate learning through single-attempt quizzes with immediate feedback"
    }
  ];

  // Platform values
  const values = [
    { icon: <CheckCircleIcon />, text: "Quality-Driven Content" },
    { icon: <UsersIcon />, text: "User-Centered Design" },
    { icon: <TrendingUpIcon />, text: "Continuous Improvement" },
    { icon: <ZapIcon />, text: "Accessibility & Inclusivity" }
  ];

  // Orchestrated workflow
  const workflow = [
    { 
      number: "01", 
      title: "Explore & Enroll", 
      desc: "Browse curated courses and enroll in your chosen program" 
    },
    { 
      number: "02", 
      title: "Learn at Your Pace", 
      desc: "Follow structured lessons with audio-based progress tracking" 
    },
    { 
      number: "03", 
      title: "Complete Assessment", 
      desc: "Self-assess through guided quizzes designed for mastery" 
    },
    { 
      number: "04", 
      title: "Get Certified", 
      desc: "Auto-receive certificates upon 100% course completion" 
    },
    { 
      number: "05", 
      title: "Grow & Consult", 
      desc: "Access advisory sessions and consultancy for implementation" 
    }
  ];

  // Corporate use cases
  const useCases = [
    {
      title: "Individual Professionals",
      desc: "Advance your petroleum engineering career with industry-recognized certifications"
    },
    {
      title: "Corporate Teams",
      desc: "Upskill entire teams with customized training and certification programs"
    },
    {
      title: "Organizations",
      desc: "Strategic consulting to implement training initiatives and organizational development"
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-zinc-800">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 py-32 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-6 px-5 py-2 border border-orange-500/30 rounded-full">
              <span className="text-orange-500 text-sm font-semibold tracking-wide uppercase">Domain-Driven Learning Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
              <span className={`block transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                Training, Advisory & Consultancy
              </span>
              <span className={`block text-orange-500 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                For Energy Professionals
              </span>
            </h1>
            
            <p className="text-lg text-zinc-400 mb-12 leading-relaxed max-w-3xl mx-auto">
              A unified platform delivering structured training programs, expert advisory sessions, and strategic consultancy services—all orchestrated through a modern, curriculum-driven architecture with automatic certification and measurable impact.
            </p>

            <div className="flex flex-wrap gap-6 justify-center">
              <Link
                href="/training/courses"
                className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all hover:scale-105 duration-300"
              >
                Explore Training
              </Link>
              <Link
                href="/advisory/book"
                className="px-8 py-3 border border-orange-500/50 text-orange-400 font-semibold rounded-lg hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300"
              >
                Book Advisory
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Our Service Offerings</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">An integrated suite of services to support your professional development journey</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <Link key={idx} href={service.link}>
              <div className="group relative bg-gradient-to-br from-orange-500/5 to-transparent border border-orange-500/20 p-8 rounded-xl hover:border-orange-500/60 transition-all duration-500 h-full hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                <div className="relative">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-6 text-orange-500 group-hover:bg-orange-500/20 group-hover:scale-110 transition-all duration-500">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-orange-500 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300 text-sm">
                    {service.description}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="font-semibold text-sm">Learn More</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-zinc-800">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="group relative bg-gradient-to-br from-orange-500/5 to-transparent border border-orange-500/20 p-8 rounded-xl hover:border-orange-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
            <div className="relative">
              <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-6 text-orange-500 group-hover:bg-orange-500/20 group-hover:scale-110 transition-all duration-500">
                <TargetIcon />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-white group-hover:text-orange-500 transition-colors duration-300">Our Mission</h2>
              <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                Transform how energy professionals develop their skills through accessible, quality-driven training powered by intelligent curriculum design and continuous improvement.
              </p>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-orange-500/5 to-transparent border border-orange-500/20 p-8 rounded-xl hover:border-orange-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
            <div className="relative">
              <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-6 text-orange-500 group-hover:bg-orange-500/20 group-hover:scale-110 transition-all duration-500">
                <ZapIcon />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-white group-hover:text-orange-500 transition-colors duration-300">Our Vision</h2>
              <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                To be the industry-leading platform that seamlessly integrates training, certification, and strategic consultancy—creating measurable impact through thoughtful, user-centered design.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Philosophy */}
      <section className="bg-black py-20 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Curriculum Philosophy</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Domain-driven architecture enabling intelligent, measurable learning outcomes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group relative bg-gradient-to-br from-orange-500/5 to-transparent border border-orange-500/20 p-7 rounded-xl hover:border-orange-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                <div className="relative">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-5 text-orange-500 group-hover:bg-orange-500/20 group-hover:scale-110 transition-all duration-500">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white group-hover:text-orange-500 transition-colors duration-300">{feature.title}</h3>
                  <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Orchestrated Journey */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-zinc-800">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Your Learning Journey</h2>
          <p className="text-zinc-400 text-lg">From enrollment to certification, powered by intelligent orchestration</p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
          
          <div className="grid md:grid-cols-5 gap-8 relative">
            {workflow.map((step, idx) => (
              <div key={idx} className="text-center group">
                <div className="relative inline-block mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-2xl font-bold text-black group-hover:scale-110 transition-all duration-500 shadow-lg shadow-orange-500/25">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2 text-white group-hover:text-orange-500 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="border-t border-zinc-800 bg-black py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Our Core Values</h2>
            <p className="text-zinc-400 text-lg">Principles that guide our platform development and user experience</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <div
                key={idx}
                className="group relative bg-gradient-to-br from-orange-500/5 to-transparent border border-orange-500/20 p-7 rounded-xl hover:border-orange-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                <div className="relative">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-5 text-orange-500 group-hover:bg-orange-500/20 group-hover:scale-110 transition-all duration-500">
                    {value.icon}
                  </div>
                  <h3 className="font-bold text-lg text-white group-hover:text-orange-500 transition-colors duration-300">
                    {value.text}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-zinc-800">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Who We Serve</h2>
          <p className="text-zinc-400 text-lg">Meeting the learning needs of energy industry professionals at every level</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {useCases.map((useCase, idx) => (
            <div
              key={idx}
              className="group relative bg-gradient-to-br from-orange-500/5 to-transparent border border-orange-500/20 p-8 rounded-xl hover:border-orange-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-6 text-orange-500 group-hover:bg-orange-500/20 group-hover:scale-110 transition-all duration-500">
                  <UsersIcon />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-orange-500 transition-colors duration-300">
                  {useCase.title}
                </h3>
                <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                  {useCase.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Platform Architecture */}
      <section className="bg-black py-20 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Built for Scalability</h2>
            </div>
            
            <div className="space-y-6 text-zinc-400 leading-relaxed text-lg">
              <p>
                PetroCourses is built on a <span className="text-orange-500 font-semibold">domain-driven architecture</span> that separates concerns and enables measurable outcomes. Our platform orchestrates training, enrollment, certification, and consulting as integrated workflows—not isolated features.
              </p>
              
              <p>
                We believe assessment should be <span className="text-orange-500 font-semibold">tied to actual learning</span>, not arbitrary scoring. Audio-based completion tracking automatically certifies professionals when they've truly mastered the material, while self-assessed quizzes validate understanding and reinforce key concepts.
              </p>
              
              <p>
                Our approach combines <span className="text-orange-500 font-semibold">structured progression</span> (enforced lesson sequencing ensures mastery) with <span className="text-orange-500 font-semibold">personalized pacing</span> (learn when you want, where you want). Every workflow is logged, auditable, and designed for reliability at scale.
              </p>
              
              <div className="mt-12 p-8 border border-orange-500/30 rounded-lg bg-orange-500/5">
                <p className="text-lg text-center font-semibold text-white">
                  From initial enrollment through certification and beyond, every interaction is designed with intent—to deliver real skills, real credentials, and real impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-zinc-800 py-20 bg-black">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                Ready to Transform Your Career?
              </h2>
              <p className="text-xl text-zinc-400 mb-8">
                Start with training, continue with advisory, and scale with consultancy. Your professional development journey begins here.
              </p>
              <div className="space-y-4">
                <Link
                  href="/training/courses"
                  className="block px-8 py-4 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-all duration-300 text-center hover:scale-105"
                >
                  Explore Courses
                </Link>
                <Link
                  href="/advisory/book"
                  className="block px-8 py-4 border border-orange-500/50 text-orange-400 font-bold rounded-lg hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300 text-center"
                >
                  Schedule Advisory Session
                </Link>
              </div>
            </div>

            <div className="space-y-6">
              <div className="group relative bg-gradient-to-br from-orange-500/5 to-transparent border border-orange-500/20 p-6 rounded-lg hover:border-orange-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-lg transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                <div className="relative">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-500 transition-colors duration-300">Training Programs</h3>
                  <p className="text-zinc-400 text-sm group-hover:text-zinc-300 transition-colors duration-300">Structured, audio-based learning with automatic certification</p>
                </div>
              </div>
              
              <div className="group relative bg-gradient-to-br from-orange-500/5 to-transparent border border-orange-500/20 p-6 rounded-lg hover:border-orange-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-lg transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                <div className="relative">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-500 transition-colors duration-300">Expert Advisory</h3>
                  <p className="text-zinc-400 text-sm group-hover:text-zinc-300 transition-colors duration-300">One-on-one sessions with industry veterans and strategists</p>
                </div>
              </div>
              
              <div className="group relative bg-gradient-to-br from-orange-500/5 to-transparent border border-orange-500/20 p-6 rounded-lg hover:border-orange-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-lg transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                <div className="relative">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-500 transition-colors duration-300">Strategic Consultancy</h3>
                  <p className="text-zinc-400 text-sm group-hover:text-zinc-300 transition-colors duration-300">Organizational transformation and implementation support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}