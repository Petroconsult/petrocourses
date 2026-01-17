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

      {/* Training Categories */}
      <section className="px-4 relative">
        {/* Background decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-3xl -z-10"></div>
        
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block px-4 py-1 bg-orange-500/10 rounded-full text-sm font-medium mb-4 text-orange-500 border border-orange-500/20">
            Specialized Training
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Training by Discipline
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {[
            { title: 'Upstream', desc: 'Exploration, drilling, and production operations', href: '/training/courses?category=upstream' },
            { title: 'Midstream', desc: 'Pipeline operations and transportation', href: '/training/courses?category=midstream' },
            { title: 'Downstream', desc: 'Refining, processing, and distribution', href: '/training/courses?category=downstream' },
            { title: 'Safety & HSE', desc: 'Health, safety, and environmental management', href: '/training/courses?category=safety' },
            { title: 'Management', desc: 'Project and operations management', href: '/training/courses?category=management' },
            { title: 'Technical', desc: 'Advanced technical and engineering skills', href: '/training/courses?category=technical' },
          ].map((category, index) => (
            <Link key={category.title} href={category.href}>
              <div 
                className="group relative bg-gradient-to-br from-black to-orange-950/20 border border-orange-500/20 p-8 rounded-xl hover:border-orange-500/60 transition-all duration-500 h-full hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-2 animate-fade-in-up overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-orange-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                
                {/* Shine effect on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"></div>
                
                <div className="relative">
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-orange-500 transition-colors duration-300">{category.title}</h3>
                  <p className="text-white/70 leading-relaxed mb-4 group-hover:text-white/90 transition-colors duration-300">{category.desc}</p>
                  <div className="inline-flex items-center text-orange-500 font-medium text-sm transition-all duration-300">
                    Explore Programs
                    <span className="transform group-hover:translate-x-2 transition-transform duration-300 ml-1">→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4">
        <div className="relative overflow-hidden bg-gradient-to-br from-black via-orange-950/10 to-black border border-orange-500/30 rounded-2xl max-w-7xl mx-auto shadow-2xl shadow-orange-500/5 animate-fade-in-up">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent"></div>
          
          {/* Animated background orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl animate-pulse-slow animation-delay-1000"></div>
          
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 p-12 md:p-16">
            <div className="animate-slide-in-left">
              <div className="inline-block px-4 py-1 bg-orange-500/10 rounded-full text-sm font-medium mb-6 text-orange-500 border border-orange-500/20">
                Start Your Journey
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Ready to Advance Your Career?
              </h2>
              <p className="text-white/70 mb-10 text-lg leading-relaxed">
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
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 font-bold text-sm group-hover:bg-orange-500/20 group-hover:scale-110 transition-all duration-300">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg mb-1 group-hover:text-orange-500 transition-colors duration-300">{item.title}</h4>
                      <p className="text-white/60 text-sm leading-relaxed group-hover:text-white/80 transition-colors duration-300">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-black to-orange-950/20 border border-orange-500/30 p-8 rounded-xl backdrop-blur-sm animate-slide-in-right hover:border-orange-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-orange-500/10">
              <h3 className="text-2xl font-bold mb-6 text-white">Get More Information</h3>
              <LeadCaptureForm />
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
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
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