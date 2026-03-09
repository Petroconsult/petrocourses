'use client';

import Link from 'next/link';
import { getFeaturedCourses } from '@/data/courses';
import CourseCard from '@/components/courses/courseCard';
import LeadCaptureForm from '@/components/forms/LeadCaptureForm';

export default function TrainingPage() {
  const featuredCourses = getFeaturedCourses();

  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section id="page-hero" className="relative min-h-[92vh] flex items-center">

        {/* Background: offshore drilling rig */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=2000&q=80&auto=format&fit=crop")',
          }}
        />

        {/* Overlay: darken + left vignette for text legibility */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        <div className="relative w-full max-w-7xl mx-auto px-6 md:px-12 py-24">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8 hero-fade" style={{ animationDelay: '0ms' }}>
            <span className="block w-8 h-px bg-orange-500" />
            <span className="text-orange-500 text-xs font-bold uppercase tracking-[0.25em]">
              Industry-Leading Training
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-5xl md:text-7xl font-black leading-[1.02] tracking-tight max-w-4xl mb-8 hero-fade"
            style={{ animationDelay: '80ms' }}
          >
            Professional Training
            <br />
            <span className="text-orange-500">for Oil &amp; Gas.</span>
          </h1>

          {/* Sub */}
          <p
            className="text-lg md:text-xl text-white/60 max-w-xl leading-relaxed mb-12 hero-fade"
            style={{ animationDelay: '160ms' }}
          >
            Advance your career with programs designed by engineers with decades of
            real-world petroleum experience.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 hero-fade" style={{ animationDelay: '240ms' }}>
            <Link
              href="/training/courses"
              className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-400 text-black font-bold px-8 py-4 rounded transition-colors duration-200"
            >
              Browse All Courses
              <span className="text-lg leading-none">→</span>
            </Link>
            <Link
              href="/training/enroll"
              className="inline-flex items-center gap-3 border border-white/20 hover:border-orange-500 hover:text-orange-400 text-white font-semibold px-8 py-4 rounded transition-all duration-200"
            >
              Enroll Now
            </Link>
          </div>
        </div>
      </section>

      {/* ─── DIVIDER ──────────────────────────────────────────────────────── */}
      <div className="h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

      {/* ─── WHY CHOOSE US ────────────────────────────────────────────────── */}
      <section className="py-32 max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
          <div>
            <p className="text-orange-500 text-xs font-bold uppercase tracking-[0.25em] mb-4">
              Excellence in Training
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Why Choose<br />Our Programs?
            </h2>
          </div>
          <p className="text-white/50 max-w-sm text-sm leading-relaxed md:text-right">
            Every program is built around real industry needs — not just theory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              number: '01',
              title: 'Industry-Recognized Certifications',
              desc: 'Earn professional certifications respected and valued across the global oil and gas industry.',
            },
            {
              number: '02',
              title: 'Expert Instructors',
              desc: 'Learn from seasoned professionals with hands-on experience in petroleum engineering and operations.',
            },
            {
              number: '03',
              title: 'Flexible Learning Options',
              desc: 'Online, in-person, or hybrid — choose the format that fits your schedule and learning style.',
            },
          ].map((item) => (
            <div
              key={item.number}
              className="group relative border border-white/8 rounded-2xl p-8 hover:border-orange-500/40 transition-all duration-300 bg-white/[0.02] hover:bg-white/[0.04]"
            >
              <span className="absolute top-6 right-8 text-7xl font-black text-white/[0.04] group-hover:text-orange-500/10 transition-colors duration-300 leading-none select-none">
                {item.number}
              </span>
              <div className="absolute top-0 left-8 right-8 h-px bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <div className="relative">
                <h3 className="text-lg font-bold mb-3 text-white group-hover:text-orange-400 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── DIVIDER ──────────────────────────────────────────────────────── */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      {/* ─── FEATURED COURSES ─────────────────────────────────────────────── */}
      <section className="py-32 max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-orange-500 text-xs font-bold uppercase tracking-[0.25em] mb-4">
              Popular Courses
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">Featured Courses</h2>
          </div>
          <Link
            href="/training/courses"
            className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-orange-400 transition-colors duration-200 group"
          >
            View All
            <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        <div className="mt-10 md:hidden text-center">
          <Link
            href="/training/courses"
            className="inline-flex items-center gap-2 text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors duration-200"
          >
            View All Courses →
          </Link>
        </div>
      </section>

      {/* ─── DIVIDER ──────────────────────────────────────────────────────── */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      {/* ─── TRAINING BY DISCIPLINE ───────────────────────────────────────── */}
      <section className="py-32 max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
          <div>
            <p className="text-orange-500 text-xs font-bold uppercase tracking-[0.25em] mb-4">
              Specialized Training
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Training by<br />Discipline
            </h2>
          </div>
          <p className="text-white/50 max-w-sm text-sm leading-relaxed md:text-right">
            Comprehensive programs covering every stage of the oil and gas value chain.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {[
            {
              number: '01',
              tag: 'Featured',
              title: 'Upstream',
              desc: 'Master exploration, drilling, and production operations with comprehensive training in reservoir engineering, well design, and field development.',
              href: '/training/courses?category=upstream',
            },
            {
              number: '02',
              tag: 'Featured',
              title: 'Safety & HSE',
              desc: 'Build expertise in health, safety, and environmental management with industry-leading certifications and best practices.',
              href: '/training/courses?category=safety',
            },
          ].map((item) => (
            <Link key={item.title} href={item.href} className="group block">
              <div className="relative border border-white/8 rounded-2xl p-10 h-full min-h-[260px] bg-white/[0.02] hover:bg-white/[0.04] hover:border-orange-500/40 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-orange-500/0 via-orange-500 to-orange-500/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <span className="absolute bottom-6 right-8 text-[8rem] font-black text-white/[0.03] group-hover:text-orange-500/8 transition-colors duration-300 leading-none select-none">
                  {item.number}
                </span>
                <div className="relative">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500 border border-orange-500/30 rounded px-2 py-0.5 mb-5">
                    {item.tag}
                  </span>
                  <h3 className="text-3xl font-black mb-4 text-white group-hover:text-orange-400 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-sm group-hover:text-white/70 transition-colors duration-300">
                    {item.desc}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-orange-500 group-hover:gap-3 transition-all duration-200">
                    Explore Programs <span>→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { number: '03', title: 'Midstream', desc: 'Pipeline operations and transportation', href: '/training/courses?category=midstream' },
            { number: '04', title: 'Downstream', desc: 'Refining, processing, and distribution', href: '/training/courses?category=downstream' },
            { number: '05', title: 'Management', desc: 'Project and operations management', href: '/training/courses?category=management' },
            { number: '06', title: 'Technical', desc: 'Advanced technical and engineering skills', href: '/training/courses?category=technical' },
          ].map((item) => (
            <Link key={item.title} href={item.href} className="group block">
              <div className="relative border border-white/8 rounded-2xl p-6 h-full min-h-[180px] bg-white/[0.02] hover:bg-white/[0.04] hover:border-orange-500/40 transition-all duration-300 overflow-hidden flex flex-col">
                <div className="absolute top-0 left-0 right-0 h-px bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                <span className="text-3xl font-black text-white/[0.06] group-hover:text-orange-500/15 transition-colors duration-300 leading-none mb-4 select-none">
                  {item.number}
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-orange-400 transition-colors duration-300 mb-2">
                  {item.title}
                </h3>
                <p className="text-white/40 text-xs leading-relaxed flex-grow group-hover:text-white/60 transition-colors duration-300">
                  {item.desc}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-orange-500 group-hover:gap-2 transition-all duration-200">
                  Learn More <span>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden border border-orange-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-orange-700 to-orange-950" />
            <div className="absolute inset-0 bg-black/40" />
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-12 md:p-16 border-b lg:border-b-0 lg:border-r border-white/10">
                <span className="inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-white/70 border border-white/20 rounded px-3 py-1 mb-8">
                  Start Your Journey
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                  Ready to Advance<br />Your Career?
                </h2>
                <p className="text-white/70 text-base leading-relaxed mb-12 max-w-sm">
                  Connect with our training advisors to find the perfect program. We offer customized solutions for individuals and corporate teams.
                </p>

                <div className="space-y-7">
                  {[
                    { n: '01', title: 'Personalized Learning Paths', desc: 'Tailored programs based on your experience and goals' },
                    { n: '02', title: 'Career Support', desc: 'Job placement assistance and ongoing career guidance' },
                    { n: '03', title: 'Lifetime Access', desc: 'Ongoing access to course materials and future updates' },
                  ].map((item) => (
                    <div key={item.n} className="flex items-start gap-5">
                      <span className="flex-shrink-0 w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-xs font-bold text-white/60">
                        {item.n}
                      </span>
                      <div>
                        <p className="font-bold text-white text-sm mb-0.5">{item.title}</p>
                        <p className="text-white/55 text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-12 md:p-16 bg-black/20 backdrop-blur-sm">
                <h3 className="text-xl font-bold text-white mb-8">Get More Information</h3>
                <LeadCaptureForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-24" />

      <style jsx>{`
        .hero-fade {
          opacity: 0;
          transform: translateY(20px);
          animation: heroFadeUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        @keyframes heroFadeUp {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}