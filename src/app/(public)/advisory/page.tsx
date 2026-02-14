"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Icon Components
const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
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

const MessageSquareIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const AwardIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <circle cx="12" cy="8" r="7"/>
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const MapPinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const VideoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <polygon points="23 7 16 12 23 17 23 7"/>
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
  </svg>
);

const BarChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <line x1="12" y1="20" x2="12" y2="10"/>
    <line x1="18" y1="20" x2="18" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="16"/>
  </svg>
);

const LayersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
    <polyline points="2 17 12 22 22 17"/>
    <polyline points="2 12 12 17 22 12"/>
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 1v6m0 6v6m5.5-13.5l-4.24 4.24m-2.52 2.52L6.5 16.5m11 0l-4.24-4.24m-2.52-2.52L6.5 7.5"/>
  </svg>
);

const DatabaseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <ellipse cx="12" cy="5" rx="9" ry="3"/>
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
  </svg>
);

const ZapIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </svg>
);

const CompassIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <circle cx="12" cy="12" r="10"/>
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);

export default function AdvisoryServicesPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Comprehensive Advisory Service Offerings - Oil & Gas Focused
  const advisoryServices = [
    {
      id: 'technical',
      category: 'technical',
      title: "Drilling & Completion Advisory",
      description: "Navigate complex well design challenges with expert guidance from veteran drilling engineers. From unconventional completions to offshore operations, get strategic insights on optimizing drilling programs, managing NPT, and implementing best practices across diverse geological formations.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
      benefits: [
        "Well design optimization for shale, tight gas, and conventional plays",
        "Drilling efficiency improvements and NPT reduction strategies",
        "Completion design selection: hydraulic fracturing vs. conventional",
        "HSE risk assessment and incident prevention planning",
        "Technology evaluation: rotary steerable, MPD, automated drilling"
      ]
    },
    {
      id: 'reservoir',
      category: 'technical',
      title: "Reservoir Engineering & Simulation",
      description: "Maximize asset value through advanced reservoir characterization and simulation. Our advisors guide you through uncertainty quantification, history matching challenges, enhanced recovery screening, and developing robust field development plans that balance technical risk with economic returns.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
      benefits: [
        "Simulation model building and history matching best practices",
        "Decline curve analysis and reserves estimation methodologies",
        "Enhanced recovery (EOR/IOR) screening and pilot design",
        "Uncertainty analysis and probabilistic forecasting",
        "Integrated asset modeling and full-field optimization"
      ]
    },
    {
      id: 'production',
      category: 'technical',
      title: "Production Optimization & Surveillance",
      description: "Unlock hidden production potential through systematic surveillance and optimization. Learn proven methodologies for well performance analysis, artificial lift selection, facility debottlenecking, and implementing digital solutions that drive measurable production gains.",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&q=80",
      benefits: [
        "Well performance diagnostics and workover candidate selection",
        "Artificial lift system design: ESP, gas lift, beam pumps, PCP",
        "Production facility optimization and debottlenecking analysis",
        "Digital oilfield implementation: sensors, automation, analytics",
        "Water management and disposal strategies"
      ]
    },
    {
      id: 'career',
      category: 'career',
      title: "Career Strategy & Transition Planning",
      description: "Navigate your petroleum engineering career with confidence. Whether transitioning from operator to service company, moving into consulting, or pivoting toward renewables, get personalized guidance on positioning yourself for success in an evolving energy landscape.",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=80",
      benefits: [
        "Career path mapping: operator, service company, consulting, or energy transition",
        "Resume and LinkedIn optimization for petroleum engineering roles",
        "Interview preparation for technical and behavioral assessments",
        "Salary negotiation strategies and compensation benchmarking",
        "Building technical expertise in emerging areas (CCUS, hydrogen, geothermal)"
      ]
    },
    {
      id: 'leadership',
      category: 'leadership',
      title: "Technical Leadership & Team Management",
      description: "Develop the leadership skills needed to manage multidisciplinary petroleum engineering teams. From field operations to corporate technical departments, learn to balance technical excellence with people management in high-stakes environments.",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80",
      benefits: [
        "Transitioning from individual contributor to technical leader",
        "Managing field operations teams and rig-based personnel",
        "Cross-functional collaboration: geology, geophysics, facilities, commercial",
        "Conflict resolution in high-pressure operational environments",
        "Building and mentoring high-performing engineering teams"
      ]
    },
    {
      id: 'asset',
      category: 'strategy',
      title: "Asset Development & Economics",
      description: "Master the art of asset development planning and economic evaluation. Learn to construct compelling investment cases, optimize development strategies under price uncertainty, and navigate the complexities of reserves categorization and portfolio management.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
      benefits: [
        "Field development plan (FDP) construction and optimization",
        "Economic modeling: NPV, IRR, breakeven analysis under uncertainty",
        "Reserves classification (1P/2P/3P) and SEC compliance",
        "Risk analysis: Monte Carlo simulation, decision tree analysis",
        "Portfolio optimization and capital allocation frameworks"
      ]
    },
    {
      id: 'digital',
      category: 'strategy',
      title: "Digital Transformation & Analytics",
      description: "Lead digital initiatives in petroleum engineering. From implementing machine learning for production optimization to deploying digital twins for asset management, get strategic guidance on technology adoption that delivers measurable ROI.",
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80",
      benefits: [
        "Machine learning applications: predictive maintenance, decline forecasting",
        "Digital twin development for real-time asset optimization",
        "Data management and integration across legacy systems",
        "Change management for digital adoption in traditional organizations",
        "Technology vendor evaluation and ROI assessment"
      ]
    },
    {
      id: 'energy-transition',
      category: 'strategy',
      title: "Energy Transition Strategy",
      description: "Position yourself and your organization for the energy transition. Navigate CCUS, hydrogen, geothermal, and other emerging opportunities. Understand how petroleum engineering skills transfer and where to focus professional development.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
      benefits: [
        "Carbon capture utilization and storage (CCUS) project development",
        "Hydrogen production and storage utilizing petroleum infrastructure",
        "Geothermal energy development leveraging drilling expertise",
        "ESG strategy and emissions reduction roadmaps",
        "Skill translation from oil & gas to renewable energy sectors"
      ]
    }
  ];

  // Testimonials from petroleum engineers
  const testimonials = [
    {
      quote: "The reservoir simulation advisory helped me troubleshoot a stubborn history match that had been holding up our field development plan for months. Within three sessions, we identified the issue and got FID approval.",
      author: "Senior Reservoir Engineer",
      company: "Major Operator - Permian Basin",
      role: "Unconventional Development"
    },
    {
      quote: "Transitioning from a technical role to engineering management was challenging. The leadership advisory sessions gave me frameworks for managing cross-functional teams and navigating organizational politics while maintaining technical credibility.",
      author: "Engineering Manager",
      company: "International Oil Company",
      role: "Production Operations"
    },
    {
      quote: "I wanted to pivot into CCUS but didn't know where to start. The energy transition advisory mapped out exactly which skills from my reservoir engineering background were transferable and which new competencies I needed to develop.",
      author: "Lead Engineer",
      company: "Carbon Capture Startup",
      role: "Subsurface CO2 Storage"
    }
  ];

  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10">
        {/* Background with corporate office imagery */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1920&q=80" 
            alt="Modern corporate office environment"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black"></div>
        </div>
        
        {/* Floating orbs */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-orange-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl animate-float-delayed"></div>
        
        <div className="max-w-7xl mx-auto px-6 py-32 md:py-40 lg:py-48 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className={`inline-flex items-center gap-3 mb-8 px-5 py-2.5 bg-white/20 border border-white/30 rounded-full backdrop-blur-sm transition-all duration-1000 delay-100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <span className="text-white font-semibold text-sm tracking-wider">
                Industry Veterans • Technical Excellence • Proven Results
              </span>
            </div>
            
            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-8 transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <span className="block text-white">
                Petroleum Engineering
              </span>
              <span className="block text-white mt-2">
                Advisory{' '}
                <span className="text-orange-500">Excellence</span>
              </span>
            </h1>
            
            <p className={`text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              One-on-one technical advisory from drilling, reservoir, and production engineering veterans with 25+ years solving complex challenges across upstream oil & gas operations.
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <Link
                href="/advisory/book"
                className="group inline-flex items-center justify-center gap-2 bg-white text-orange-600 px-10 py-4 rounded-lg font-semibold hover:bg-orange-50 transition-all shadow-lg hover:shadow-xl hover:scale-105 transform duration-300"
              >
                Schedule Advisory Session
                <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                  <ArrowRightIcon />
                </span>
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center justify-center gap-2 bg-transparent text-white px-10 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all border-2 border-white backdrop-blur-sm hover:scale-105 transform duration-300"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in-up animation-delay-1000">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-orange-500 rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Advisory Services - Detailed Cards */}
      <section id="services" className="py-40 relative">
         <div className="max-w-7xl mx-auto px-6 relative">
          {/* Section Header */}
          <div className="text-center mb-32 animate-fade-in-up">
            <div className="inline-block px-4 py-1 bg-orange-500/10 rounded-full text-sm font-medium mb-6 text-orange-500 border border-orange-500/20">
              Expert Advisory Services
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Technical Guidance That Drives Results
            </h2>
            <p className="text-white/60 text-lg md:text-xl max-w-3xl mx-auto">
              Comprehensive advisory services across all petroleum engineering disciplines
            </p>
          </div>

          {/* Services Grid */}
          <div className="space-y-40">
            {advisoryServices.map((service, idx) => (
              <div
                key={service.id}
                className={`grid lg:grid-cols-2 gap-16 lg:gap-20 items-start animate-fade-in-up`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Image Column */}
                <div className={`${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="sticky top-32">
                    {/* Image Container */}
                    <div className="group relative overflow-hidden rounded-2xl mb-6">
                      <div className="aspect-[4/3] relative">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      </div>
                      <div className="absolute inset-0 border-2 border-orange-500/0 group-hover:border-orange-500/50 transition-all duration-500 rounded-2xl"></div>
                    </div>
                    
                    {/* CTA Button */}
                    <Link
                      href={`/advisory/book?service=${service.id}`}
                      className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 hover:scale-105 group w-full justify-center"
                    >
                      Book This Service
                      <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                        <ArrowRightIcon />
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Content Column */}
                <div className={`${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                  {/* Service Number Badge */}
                  <div className="inline-block mb-6">
                    <span className="text-orange-500 font-semibold text-sm tracking-wider uppercase">
                      Advisory Service {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-white leading-tight">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-12">
                    {service.description}
                  </p>
                  
                  {/* Benefits Section - Enhanced Structure */}
                  <div>
                    <h4 className="text-xl font-bold mb-8 text-white flex items-center gap-3">
                      <div className="w-1 h-6 bg-orange-500 rounded-full"></div>
                      What You'll Get
                    </h4>
                    <div className="space-y-5">
                      {service.benefits.map((benefit, benefitIdx) => (
                        <div key={benefitIdx} className="flex items-start gap-4 group/item">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center mt-0.5 group-hover/item:bg-orange-500/30 group-hover/item:scale-110 transition-all duration-300">
                            <CheckCircleIcon />
                          </div>
                          <p className="text-white/80 leading-relaxed group-hover/item:text-white transition-colors duration-300">{benefit}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Divider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative h-px">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/30 to-transparent"></div>
        </div>
      </div>

      {/* Testimonials */}
      <section className="py-40 relative">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-24 animate-fade-in-up">
            <div className="inline-block px-4 py-1 bg-orange-500/10 rounded-full text-sm font-medium mb-6 text-orange-500 border border-orange-500/20">
              Client Success Stories
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Real Results from Real Engineers
            </h2>
            <p className="text-white/60 text-lg md:text-xl max-w-3xl mx-auto">
              Hear from petroleum engineers who've transformed their careers and projects through our advisory services
            </p>
          </div>

          {/* Testimonials Grid - Enhanced Structure */}
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="group relative bg-gradient-to-br from-orange-500/5 to-transparent border border-orange-500/20 p-10 rounded-2xl hover:border-orange-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 animate-fade-in-up overflow-hidden"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                
                <div className="relative">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center mb-8 text-orange-500 group-hover:bg-orange-500/20 group-hover:scale-110 transition-all duration-500">
                    <AwardIcon />
                  </div>
                  
                  <blockquote className="text-lg font-medium text-white/90 mb-8 leading-relaxed group-hover:text-white transition-colors duration-300">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  <div className="border-t border-orange-500/20 pt-6">
                    <div className="text-orange-400 font-semibold mb-1">
                      {testimonial.author}
                    </div>
                    <div className="text-white/60 text-sm mb-1">
                      {testimonial.company}
                    </div>
                    <div className="text-white/50 text-xs">
                      {testimonial.role}
                    </div>
                  </div>
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
        
        .animation-delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  );
}