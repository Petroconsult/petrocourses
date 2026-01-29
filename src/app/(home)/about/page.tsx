"use client";
import React, { useState } from 'react';

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

export default function AboutSection() {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <GraduationCapIcon />,
      title: "Skill-Focused Training",
      description: "Short, structured, real-world lessons designed for immediate application"
    },
    {
      icon: <AwardIcon />,
      title: "Assessment & Certification",
      description: "Built-in quizzes, progress tracking, and downloadable digital certificates"
    },
    {
      icon: <TargetIcon />,
      title: "Customisable Learning Paths",
      description: "Tailored for teams or individual career goals"
    },
    {
      icon: <GlobeIcon />,
      title: "Mobile-First Experience",
      description: "Learn anywhere: work, home, or on the go"
    }
  ];

  const values = [
    { icon: <CheckCircleIcon />, text: "Quality Focused" },
    { icon: <UsersIcon />, text: "User-Centred Design" },
    { icon: <TrendingUpIcon />, text: "Continuous Improvement" },
    { icon: <ZapIcon />, text: "Accessibility for All" }
  ];

  const steps = [
    { number: "01", title: "Choose Training", desc: "Browse expert-designed courses" },
    { number: "02", title: "Learn Anytime", desc: "Access from any device" },
    { number: "03", title: "Track Progress", desc: "Monitor your growth" },
    { number: "04", title: "Get Certified", desc: "Earn digital certificates" },
    { number: "05", title: "Build Skills", desc: "Apply learning to succeed" }
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-6 px-5 py-2 border border-orange-500/30 rounded-full">
              <span className="text-orange-500 text-sm font-semibold tracking-wide uppercase">Enhancing Business through Learning</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight overflow-hidden">
              <span className={`inline-block transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                Empowering the
              </span>
              <span className={`block text-orange-500 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                Energy Industry
              </span>
            </h1>
            
            <p className="text-xl text-zinc-400 mb-12 leading-relaxed max-w-3xl mx-auto">
              A smart learning platform designed to make professional training simple, accessible, 
              and effective for individuals and organisations building the skills to grow, perform, 
              and succeed in energy careers.
            </p>

            <div className="flex flex-wrap gap-10 justify-center text-sm">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                <span className="text-zinc-400 font-medium">Train Anywhere</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                <span className="text-zinc-400 font-medium">Real Certifications</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                <span className="text-zinc-400 font-medium">Proven Results</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="group">
            <div className="h-full p-10 border border-zinc-800 rounded-lg bg-zinc-900/50 hover:bg-zinc-900 hover:border-orange-500/50 transition-all duration-500 hover:translate-y-[-4px]">
              <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-500/20 transition-colors duration-500">
                <div className="text-orange-500">
                  <TargetIcon />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-white">Our Mission</h2>
              <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors duration-500">
                To empower people and organisations with easy access to practical, high-value training 
                that drives real performance and long-term success.
              </p>
            </div>
          </div>

          <div className="group">
            <div className="h-full p-10 border border-zinc-800 rounded-lg bg-zinc-900/50 hover:bg-zinc-900 hover:border-orange-500/50 transition-all duration-500 hover:translate-y-[-4px]">
              <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-500/20 transition-colors duration-500">
                <div className="text-orange-500">
                  <ZapIcon />
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-white">Our Vision</h2>
              <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors duration-500">
                To become the most trusted and user-friendly training platform within the energy industry 
                for individuals and teams seeking professional growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="bg-zinc-900/30 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">What We Offer</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Comprehensive tools and features designed for modern learning
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setActiveFeature(idx)}
                onMouseLeave={() => setActiveFeature(null)}
                className={`p-7 border rounded-lg cursor-pointer transition-all duration-500 ${
                  activeFeature === idx
                    ? 'border-orange-500 bg-zinc-900 translate-y-[-8px]'
                    : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
                }`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-5 transition-all duration-500 ${
                  activeFeature === idx ? 'bg-orange-500 text-black scale-110' : 'bg-orange-500/10 text-orange-500'
                }`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">{feature.title}</h3>
                <p className={`text-sm leading-relaxed transition-colors duration-500 ${
                  activeFeature === idx ? 'text-zinc-300' : 'text-zinc-400'
                }`}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">How It Works</h2>
          <p className="text-zinc-400 text-lg">Your journey to success in 5 simple steps</p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-zinc-800"></div>
          
          <div className="grid md:grid-cols-5 gap-8 relative">
            {steps.map((step, idx) => (
              <div key={idx} className="text-center group">
                <div className="relative inline-block mb-6">
                  <div className="w-24 h-24 bg-orange-500 rounded-lg flex items-center justify-center text-2xl font-bold text-black group-hover:bg-orange-600 group-hover:scale-110 transition-all duration-500">
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

      {/* Values */}
      <section className="border-t border-zinc-800 bg-zinc-900/30 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Our Values</h2>
            <p className="text-zinc-400 text-lg">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <div
                key={idx}
                className="p-7 border border-zinc-800 rounded-lg bg-zinc-900/50 hover:border-orange-500/50 hover:bg-zinc-900 transition-all duration-500 group hover:translate-y-[-4px]"
              >
                <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-5 text-orange-500 group-hover:bg-orange-500/20 group-hover:scale-110 transition-all duration-500">
                  {value.icon}
                </div>
                <h3 className="font-bold text-lg text-white group-hover:text-orange-500 transition-colors duration-300">
                  {value.text}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Our Story</h2>
          </div>
          
          <div className="space-y-6 text-zinc-400 leading-relaxed text-lg">
            <p>
              Traditional training methods have long been constrained by inefficiency — often requiring 
              lengthy in-person sessions, expensive logistics, and inflexible scheduling that doesn't fit 
              the demands of modern energy professionals.
            </p>
            
            <p>
              <span className="text-orange-500 font-bold">Petrocourses</span> was created to break 
              down these barriers and deliver expert-designed, bespoke learning content in a way that's 
              accessible, efficient, and genuinely effective.
            </p>
            
            <p>
              Built around the needs of today's learners, we focus on short, impactful lessons, clean 
              intuitive design, clear skill outcomes, and meaningful certifications that translate to 
              real-world performance improvements.
            </p>
            
            <div className="mt-12 p-8 border border-zinc-800 rounded-lg bg-zinc-900/50">
              <p className="text-lg text-center font-semibold text-white">
                We're committed to listening to our clients, continuously improving our platform, and 
                addressing the unique challenges facing the energy industry with agility and innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-zinc-800 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-zinc-400 mb-10">
            Join thousands of energy professionals building the skills that matter
          </p>
          <button className="px-8 py-4 bg-orange-500 text-whitelist.sort() sorts in place and returns Nonevvvvvvvvvvvvvvvvvvvvvvv font-bold rounded-lg hover:bg-orange-600 transition-all duration-300 text-lg hover:scale-105">
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
}