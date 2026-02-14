'use client';

import Link from 'next/link';
import { getFeaturedCourses } from '@/data/courses';
import CourseCard from '@/components/courses/courseCard';
import LeadCaptureForm from '@/components/forms/LeadCaptureForm';

export default function TrainingPage() {
  const featuredCourses = getFeaturedCourses();

  return (
    <div className="space-y-24 bg-black text-white min-h-screen py-8 overflow-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl group">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-orange-700 to-orange-900 opacity-90 animate-gradient"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        
        {/* Floating orbs */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-orange-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl animate-float-delayed"></div>
        
        <div className="relative p-16 md:p-20 animate-fade-in-up">
          <div className="max-w-4xl">
            <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/30 animate-slide-in-left">
              Industry-Leading Training
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight animate-slide-in-left animation-delay-100">
              Professional Training for Oil & Gas Industry
            </h1>
            <p className="text-xl mb-10 text-white/95 max-w-2xl leading-relaxed animate-slide-in-left animation-delay-200">
              Advance your career with industry-leading training programs designed by experts with decades of experience in petroleum engineering and operations.
            </p>
            <div className="flex flex-wrap gap-4 animate-slide-in-left animation-delay-300">
              <Link
                href="/training/courses"
                className="bg-white text-orange-600 px-10 py-4 rounded-lg font-semibold hover:bg-orange-50 transition-all shadow-lg hover:shadow-xl hover:scale-105 transform duration-300"
              >
                Browse All Courses
              </Link>
              <Link
                href="/training/enroll"
                className="bg-transparent text-white px-10 py-4 rounded-lg font-semibold hover:bg-white/10 transition-all border-2 border-white backdrop-blur-sm hover:scale-105 transform duration-300"
              >
                Enroll Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block px-4 py-1 bg-orange-500/10 rounded-full text-sm font-medium mb-4 text-orange-500 border border-orange-500/20">
            Excellence in Training
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Why Choose Our Programs?
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: 'Industry-Recognized Certifications',
              desc: 'Earn professional certifications that are respected and valued across the global oil and gas industry.',
              number: '01'
            },
            {
              title: 'Expert Instructors',
              desc: 'Learn from seasoned professionals with real-world experience in petroleum engineering and operations.',
              number: '02'
            },
            {
              title: 'Flexible Learning Options',
              desc: 'Choose from online, in-person, or hybrid training formats that fit your schedule and learning style.',
              number: '03'
            },
          ].map((item, index) => (
            <div
              key={item.title}
              className="group relative bg-gradient-to-br from-orange-500/5 to-transparent border border-orange-500/20 p-8 rounded-xl hover:border-orange-500/60 transition-all duration-500 animate-fade-in-up hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
              <div className="relative">
                <div className="text-7xl font-bold text-orange-500/10 group-hover:text-orange-500/20 mb-4 transition-all duration-500 group-hover:scale-110 transform">{item.number}</div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-orange-500 transition-colors duration-300">{item.title}</h3>
                <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-12 max-w-7xl mx-auto animate-fade-in-up">
          <div>
            <div className="inline-block px-4 py-1 bg-orange-500/10 rounded-full text-sm font-medium mb-3 text-orange-500 border border-orange-500/20">
              Popular Courses
            </div>
            <h2 className="text-4xl font-bold text-white">Featured Courses</h2>
          </div>
          <Link
            href="/training/courses"
            className="text-orange-500 hover:text-orange-400 font-semibold flex items-center gap-2 group transition-all duration-300"
          >
            View All Courses 
            <span className="transform group-hover:translate-x-2 transition-transform duration-300">→</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {featuredCourses.map((course, index) => (
            <div 
              key={course.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </section>

      {/* Training Categories - REDESIGNED WITH ASYMMETRIC LAYOUT */}
      <section className="px-4 relative">
        {/* Background decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-to-br from-orange-500/5 via-orange-600/3 to-transparent rounded-full blur-3xl -z-10"></div>
        
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="inline-block px-4 py-1 bg-orange-500/10 rounded-full text-sm font-medium mb-4 text-orange-500 border border-orange-500/20">
            Specialized Training
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Training by Discipline
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Explore our comprehensive range of specialized programs designed for every stage of the oil and gas value chain
          </p>
        </div>

        {/* Asymmetric Grid Layout */}
        <div className="max-w-7xl mx-auto">
          {/* Top Row - Featured Large Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Upstream - Large Featured Card */}
            <Link href="/training/courses?category=upstream">
              <div className="group relative bg-gradient-to-br from-orange-500/5 to-transparent border border-orange-500/20 p-12 rounded-2xl hover:border-orange-500/60 transition-all duration-500 h-full min-h-[280px] hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 animate-fade-in-up overflow-hidden">
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                
                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <div className="inline-block px-3 py-1 bg-orange-500/10 rounded-full text-xs font-medium text-orange-400 border border-orange-500/20">
                      FEATURED
                    </div>
                    <div className="text-6xl font-bold text-orange-500/10 group-hover:text-orange-500/20 transition-all duration-500">01</div>
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-orange-500 transition-colors duration-300">Upstream</h3>
                  <p className="text-white/70 leading-relaxed text-lg mb-6 group-hover:text-white/90 transition-colors duration-300">
                    Master exploration, drilling, and production operations with comprehensive training in reservoir engineering, well design, and field development.
                  </p>
                  <div className="inline-flex items-center text-orange-500 font-semibold text-sm group-hover:gap-3 gap-2 transition-all duration-300">
                    Explore Programs
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Safety & HSE - Large Featured Card */}
            <Link href="/training/courses?category=safety">
              <div className="group relative bg-gradient-to-br from-orange-500/5 to-transparent border border-orange-500/20 p-12 rounded-2xl hover:border-orange-500/60 transition-all duration-500 h-full min-h-[280px] hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 animate-fade-in-up overflow-hidden" style={{ animationDelay: '100ms' }}>
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                
                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <div className="inline-block px-3 py-1 bg-orange-500/10 rounded-full text-xs font-medium text-orange-400 border border-orange-500/20">
                      FEATURED
                    </div>
                    <div className="text-6xl font-bold text-orange-500/10 group-hover:text-orange-500/20 transition-all duration-500">02</div>
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-orange-500 transition-colors duration-300">Safety & HSE</h3>
                  <p className="text-white/70 leading-relaxed text-lg mb-6 group-hover:text-white/90 transition-colors duration-300">
                    Build expertise in health, safety, and environmental management with industry-leading certifications and best practices.
                  </p>
                  <div className="inline-flex items-center text-orange-500 font-semibold text-sm group-hover:gap-3 gap-2 transition-all duration-300">
                    Explore Programs
                    <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Bottom Row - Compact Cards in 4-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                title: 'Midstream', 
                desc: 'Pipeline operations and transportation', 
                href: '/training/courses?category=midstream',
                number: '03'
              },
              { 
                title: 'Downstream', 
                desc: 'Refining, processing, and distribution', 
                href: '/training/courses?category=downstream',
                number: '04'
              },
              { 
                title: 'Management', 
                desc: 'Project and operations management', 
                href: '/training/courses?category=management',
                number: '05'
              },
              { 
                title: 'Technical', 
                desc: 'Advanced technical and engineering skills', 
                href: '/training/courses?category=technical',
                number: '06'
              },
            ].map((category, index) => (
              <Link key={category.title} href={category.href}>
                <div 
                  className="group relative bg-gradient-to-br from-orange-500/5 to-transparent border border-orange-500/20 p-6 rounded-xl hover:border-orange-500/60 transition-all duration-500 h-full min-h-[200px] hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 animate-fade-in-up overflow-hidden"
                  style={{ animationDelay: `${(index + 2) * 100}ms` }}
                >
                  {/* Top accent bar */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                  
                  <div className="relative h-full flex flex-col">
                    <div className="text-4xl font-bold text-orange-500/10 group-hover:text-orange-500/20 mb-3 transition-all duration-500">{category.number}</div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-orange-500 transition-colors duration-300">{category.title}</h3>
                    <p className="text-white/70 leading-relaxed text-sm mb-4 flex-grow group-hover:text-white/90 transition-colors duration-300">{category.desc}</p>
                    <div className="inline-flex items-center text-orange-500 font-medium text-sm transition-all duration-300">
                      Learn More
                      <span className="transform group-hover:translate-x-1 transition-transform duration-300 ml-1">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden bg-gradient-to-br from-orange-600 via-orange-700 to-orange-900 rounded-[3rem] shadow-2xl shadow-orange-500/20 animate-fade-in-up">
            {/* Diagonal overlay */}
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-black/60 to-transparent transform skew-x-12"></div>
            
            {/* Animated shapes */}
            <div className="absolute top-10 right-10 w-32 h-32 border-2 border-white/20 rounded-full animate-spin-slow"></div>
            <div className="absolute bottom-10 left-10 w-24 h-24 bg-orange-400/20 rounded-lg rotate-45 animate-pulse-slow"></div>
            
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 p-12 md:p-16">
              <div className="animate-slide-in-left">
                <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6 text-white border border-white/30">
                  Start Your Journey
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Ready to Advance Your Career?
                </h2>
                <p className="text-white/90 mb-10 text-lg leading-relaxed">
                  Get in touch with our training advisors to find the perfect program for your career goals. We offer customized training solutions for individuals and corporate teams.
                </p>
                <div className="space-y-6">
                  {[
                    { title: 'Personalized Learning Paths', desc: 'Tailored programs based on your experience and goals' },
                    { title: 'Career Support', desc: 'Job placement assistance and career guidance' },
                    { title: 'Lifetime Access', desc: 'Ongoing access to course materials and updates' },
                  ].map((item, index) => (
                    <div 
                      key={item.title} 
                      className="flex items-start gap-4 group animate-slide-in-left hover:translate-x-2 transition-transform duration-300"
                      style={{ animationDelay: `${(index + 1) * 150}ms` }}
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-lg mb-1 group-hover:text-orange-200 transition-colors duration-300">{item.title}</h4>
                        <p className="text-white/80 text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-300">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-black/40 backdrop-blur-xl border border-white/20 p-8 rounded-2xl animate-slide-in-right">
                <h3 className="text-2xl font-bold mb-6 text-white">Get More Information</h3>
                <LeadCaptureForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
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
        
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
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
        
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
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
        
        .animation-delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  );
}