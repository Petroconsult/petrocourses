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

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
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
      link: "/training/courses",
      featured: true
    },
    {
      icon: <TargetIcon />,
      title: "Advisory Services",
      description: "Expert guidance sessions for strategic career and organizational decisions",
      link: "/advisory/book",
      featured: false
    },
    {
      icon: <BriefcaseIcon />,
      title: "Consultancy",
      description: "Comprehensive consulting for organizational development and training implementation",
      link: "/consultancy/book",
      featured: false
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
    <div className="bg-black text-white min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10 bg-black">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80" 
            alt="Professional studying on PetroCourses platform"
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
        </div>
        
        {/* Floating orbs */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-orange-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl animate-float-delayed"></div>
        
        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 py-32 md:py-40 lg:py-48 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Eyebrow text */}
            <div className={`inline-block mb-6 transition-all duration-1000 delay-100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30">
                Empowering Energy Professionals
              </div>
            </div>
            
            {/* Main headline */}
            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6 transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <span className="block text-white">
                Master Your Craft.
              </span>
              <span className="block text-white mt-2">
                Elevate Your{' '}
                <span className="text-orange-500">Career.</span>
              </span>
            </h1>
            
            {/* Supporting text */}
            <p className={`text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              Professional training, expert advisory, and strategic consultancy—all in one platform designed for the energy sector.
            </p>
            
            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 justify-center mt-10 transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <Link
                href="/training/courses"
                className="group inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-10 py-4 rounded-lg font-semibold hover:bg-orange-50 transition-all shadow-lg hover:shadow-xl hover:scale-105 transform duration-300"
              >
                Explore Training
                <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                  <ArrowRightIcon />
                </span>
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-10 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all border-2 border-white backdrop-blur-sm hover:scale-105 transform duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-fade-in-up animation-delay-1000">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-orange-500 rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-24 relative overflow-hidden bg-black">
        {/* Background decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-to-br from-orange-500/5 via-orange-600/3 to-transparent rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-block px-4 py-1 bg-orange-500/10 rounded-full text-sm font-medium mb-4 text-orange-500 border border-orange-500/20">
              Our Foundation
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Driven by Purpose
            </h2>
          </div>

          {/* Mission & Vision Grid */}
          <div className="grid lg:grid-cols-2 gap-12 mb-24">
            {/* Mission - Large Featured Card */}
            <div className="group relative bg-gradient-to-br from-orange-500/5 to-transparent border border-orange-500/20 p-12 rounded-2xl hover:border-orange-500/60 transition-all duration-500 h-full min-h-[320px] hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 animate-fade-in-up overflow-hidden">
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              
              <div className="relative">
                <div className="w-16 h-16 bg-orange-500/10 rounded-xl flex items-center justify-center mb-8 text-orange-500 group-hover:bg-orange-500/20 group-hover:scale-110 transition-all duration-500">
                  <TargetIcon />
                </div>
                <h3 className="text-3xl font-bold mb-6 text-white group-hover:text-orange-500 transition-colors duration-300">Our Mission</h3>
                <p className="text-white/70 leading-relaxed text-lg group-hover:text-white/90 transition-colors duration-300">
                  Transform how energy professionals develop their skills through accessible, quality-driven training powered by intelligent curriculum design and continuous improvement.
                </p>
              </div>
            </div>

            {/* Vision - Large Featured Card */}
            <div className="group relative bg-gradient-to-br from-orange-500/5 to-transparent border border-orange-500/20 p-12 rounded-2xl hover:border-orange-500/60 transition-all duration-500 h-full min-h-[320px] hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 animate-fade-in-up overflow-hidden" style={{ animationDelay: '100ms' }}>
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              
              <div className="relative">
                <div className="w-16 h-16 bg-orange-500/10 rounded-xl flex items-center justify-center mb-8 text-orange-500 group-hover:bg-orange-500/20 group-hover:scale-110 transition-all duration-500">
                  <ZapIcon />
                </div>
                <h3 className="text-3xl font-bold mb-6 text-white group-hover:text-orange-500 transition-colors duration-300">Our Vision</h3>
                <p className="text-white/70 leading-relaxed text-lg group-hover:text-white/90 transition-colors duration-300">
                  To be the industry-leading platform that seamlessly integrates training, certification, and strategic consultancy—creating measurable impact through thoughtful, user-centered design.
                </p>
              </div>
            </div>
          </div>

          {/* Core Values - Enhanced 2x2 Grid */}
          <div className="max-w-5xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-12 text-center animate-fade-in-up">Our Core Values</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, idx) => (
                <div
                  key={idx}
                  className="group relative bg-gradient-to-br from-orange-500/5 to-transparent border border-orange-500/20 p-10 rounded-xl hover:border-orange-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 animate-fade-in-up overflow-hidden"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {/* Top accent bar */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                  
                  <div className="relative flex items-start gap-6">
                    <div className="w-14 h-14 bg-orange-500/10 rounded-xl flex items-center justify-center flex-shrink-0 text-orange-500 group-hover:bg-orange-500/20 group-hover:scale-110 transition-all duration-500">
                      {value.icon}
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-bold text-white group-hover:text-orange-500 transition-colors duration-300">
                        {value.text}
                      </h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>

      {/* Core Services - Asymmetric Layout */}
      <section id="services" className="py-20 md:py-24 relative overflow-hidden bg-black">
        {/* Background decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-to-br from-orange-500/5 via-orange-600/3 to-transparent rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-block px-4 py-1 bg-orange-500/10 rounded-full text-sm font-medium mb-4 text-orange-500 border border-orange-500/20">
              What We Offer
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Integrated Service Suite
            </h2>
            <p className="text-white/60 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              From foundational training to strategic transformation, we support your entire professional development journey.
            </p>
          </div>

          {/* Asymmetric Grid: 1 large + 2 smaller */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Professional Training - Large Featured */}
            <Link href={services[0].link} className="lg:row-span-2">
              <div className="group relative bg-gradient-to-br from-orange-500/5 to-transparent border border-orange-500/20 p-12 rounded-2xl hover:border-orange-500/60 transition-all duration-500 h-full min-h-[400px] hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 animate-fade-in-up overflow-hidden">
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                
                <div className="relative h-full flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <div className="inline-block px-3 py-1 bg-orange-500/10 rounded-full text-xs font-medium text-orange-400 border border-orange-500/20">
                      FEATURED
                    </div>
                    <div className="text-6xl font-bold text-orange-500/10 group-hover:text-orange-500/20 transition-all duration-500">01</div>
                  </div>
                  
                  <div className="w-16 h-16 bg-orange-500/10 rounded-xl flex items-center justify-center mb-8 text-orange-500 group-hover:bg-orange-500/20 group-hover:scale-110 transition-all duration-500">
                    {services[0].icon}
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-6 text-white group-hover:text-orange-500 transition-colors duration-300">
                    {services[0].title}
                  </h3>
                  <p className="text-white/70 leading-relaxed text-lg mb-8 flex-grow group-hover:text-white/90 transition-colors duration-300">
                    {services[0].description}
                  </p>
                  
                  <div className="inline-flex items-center text-orange-500 font-semibold text-sm group-hover:gap-3 gap-2 transition-all duration-300">
                    Explore Programs
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Advisory Services - Compact */}
            <Link href={services[1].link}>
              <div className="group relative bg-gradient-to-br from-orange-500/5 to-transparent border border-orange-500/20 p-8 rounded-xl hover:border-orange-500/60 transition-all duration-500 h-full min-h-[180px] hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 animate-fade-in-up overflow-hidden" style={{ animationDelay: '100ms' }}>
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                
                <div className="relative h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center text-orange-500 group-hover:bg-orange-500/20 group-hover:scale-110 transition-all duration-500">
                      {services[1].icon}
                    </div>
                    <div className="text-4xl font-bold text-orange-500/10 group-hover:text-orange-500/20 transition-all duration-500">02</div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-orange-500 transition-colors duration-300">
                    {services[1].title}
                  </h3>
                  <p className="text-white/70 leading-relaxed text-sm mb-4 flex-grow group-hover:text-white/90 transition-colors duration-300">
                    {services[1].description}
                  </p>
                  
                  <div className="inline-flex items-center text-orange-500 font-medium text-sm transition-all duration-300">
                    Learn More
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300 ml-1">→</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Consultancy - Compact */}
            <Link href={services[2].link}>
              <div className="group relative bg-gradient-to-br from-orange-500/5 to-transparent border border-orange-500/20 p-8 rounded-xl hover:border-orange-500/60 transition-all duration-500 h-full min-h-[180px] hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 animate-fade-in-up overflow-hidden" style={{ animationDelay: '200ms' }}>
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                
                <div className="relative h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center text-orange-500 group-hover:bg-orange-500/20 group-hover:scale-110 transition-all duration-500">
                      {services[2].icon}
                    </div>
                    <div className="text-4xl font-bold text-orange-500/10 group-hover:text-orange-500/20 transition-all duration-500">03</div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-orange-500 transition-colors duration-300">
                    {services[2].title}
                  </h3>
                  <p className="text-white/70 leading-relaxed text-sm mb-4 flex-grow group-hover:text-white/90 transition-colors duration-300">
                    {services[2].description}
                  </p>
                  
                  <div className="inline-flex items-center text-orange-500 font-medium text-sm transition-all duration-300">
                    Learn More
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300 ml-1">→</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>

      {/* How It Works */}
      <section className="py-20 md:py-24 relative overflow-hidden bg-black">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24 animate-fade-in-up">
            <div className="inline-block px-4 py-1 bg-orange-500/10 rounded-full text-sm font-medium mb-4 text-orange-500 border border-orange-500/20">
              Your Journey
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              From Enrollment to Excellence
            </h2>
            <p className="text-white/60 text-lg md:text-xl max-w-3xl mx-auto">
              A seamless, intelligent workflow designed for measurable outcomes
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-16">
            {workflow.map((step, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-12 items-center animate-fade-in-up`}
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                {/* Number Badge */}
                <div className="flex-shrink-0">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl opacity-40 group-hover:opacity-60 blur transition-all duration-500"></div>
                    <div className="relative w-32 h-32 bg-black border-2 border-orange-500 rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <span className="text-5xl font-bold bg-gradient-to-br from-orange-400 to-orange-600 bg-clip-text text-transparent">
                        {step.number}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={`flex-1 ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'} text-center`}>
                  <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">
                    {step.title}
                  </h3>
                  <p className="text-base md:text-lg text-white/60 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>

      {/* Learning Philosophy */}
      <section className="py-20 md:py-24 relative overflow-hidden bg-black">
        {/* Background decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-to-br from-orange-500/5 via-orange-600/3 to-transparent rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-block px-4 py-1 bg-orange-500/10 rounded-full text-sm font-medium mb-4 text-orange-500 border border-orange-500/20">
              Our Approach
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Intelligent Learning Design
            </h2>
            <p className="text-white/60 text-lg md:text-xl max-w-3xl mx-auto">
              Domain-driven architecture enabling measurable, outcome-focused education
            </p>
          </div>

          {/* 4-column Grid for Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group relative bg-gradient-to-br from-orange-500/5 to-transparent border border-orange-500/20 p-8 rounded-xl hover:border-orange-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 animate-fade-in-up overflow-hidden"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                
                <div className="relative">
                  <div className="w-14 h-14 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6 text-orange-500 group-hover:bg-orange-500/20 group-hover:scale-110 transition-all duration-500">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-3 text-white group-hover:text-orange-500 transition-colors duration-300">{feature.title}</h3>
                  <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>

      {/* Platform Architecture */}
      <section className="py-20 md:py-24 relative overflow-hidden bg-black">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-block px-4 py-1 bg-orange-500/10 rounded-full text-sm font-medium mb-4 text-orange-500 border border-orange-500/20">
              Technology
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Built for Scale,<br />Designed for Impact
            </h2>
          </div>
          
          <div className="space-y-12 text-white/70 leading-relaxed text-lg md:text-xl">
            <p className="text-xl md:text-2xl leading-relaxed animate-fade-in-up animation-delay-100">
              PetroCourses is built on a <span className="text-orange-500 font-semibold">domain-driven architecture</span> that separates concerns and enables measurable outcomes. Our platform orchestrates training, enrollment, certification, and consulting as integrated workflows—not isolated features.
            </p>
            
            <p className="text-lg md:text-xl animate-fade-in-up animation-delay-200">
              We believe assessment should be <span className="text-orange-500 font-semibold">tied to actual learning</span>, not arbitrary scoring. Audio-based completion tracking automatically certifies professionals when they've truly mastered the material, while self-assessed quizzes validate understanding and reinforce key concepts.
            </p>
            
            <p className="text-lg md:text-xl animate-fade-in-up animation-delay-300">
              Our approach combines <span className="text-orange-500 font-semibold">structured progression</span> (enforced lesson sequencing ensures mastery) with <span className="text-orange-500 font-semibold">personalized pacing</span> (learn when you want, where you want). Every workflow is logged, auditable, and designed for reliability at scale.
            </p>
            
            <div className="mt-16 p-12 md:p-16 border-2 border-orange-500/30 rounded-3xl bg-gradient-to-br from-orange-500/5 to-transparent relative overflow-hidden group hover:border-orange-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10 animate-fade-in-up animation-delay-500">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <p className="text-xl md:text-2xl text-center font-semibold text-white leading-relaxed relative z-10">
                From initial enrollment through certification and beyond, every interaction is designed with intent—to deliver real skills, real credentials, and real impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>

      {/* Who We Serve - Final Section */}
      <section className="py-20 md:py-24 pb-24 md:pb-32 relative overflow-hidden bg-black">
        {/* Background decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-to-br from-orange-500/5 via-orange-600/3 to-transparent rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="inline-block px-4 py-1 bg-orange-500/10 rounded-full text-sm font-medium mb-4 text-orange-500 border border-orange-500/20">
              Our Community
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Who We Serve
            </h2>
            <p className="text-white/60 text-lg md:text-xl max-w-3xl mx-auto">
              Supporting energy professionals at every stage of their career journey
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
            {useCases.map((useCase, idx) => (
              <div
                key={idx}
                className="group relative bg-gradient-to-br from-orange-500/5 to-transparent border border-orange-500/20 p-10 md:p-12 rounded-2xl hover:border-orange-500/60 transition-all duration-500 h-full hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 animate-fade-in-up overflow-hidden"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                
                <div className="relative">
                  <div className="w-16 h-16 bg-orange-500/10 rounded-xl flex items-center justify-center mb-8 text-orange-500 group-hover:bg-orange-500/20 group-hover:scale-110 transition-all duration-500">
                    <UsersIcon />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-5 text-white group-hover:text-orange-500 transition-colors duration-300">
                    {useCase.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed text-lg group-hover:text-white/90 transition-colors duration-300">
                    {useCase.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -30px) scale(1.1); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, 30px) scale(1.05); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
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
        
        .animation-delay-500 {
          animation-delay: 500ms;
        }
        
        .animation-delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  );
}