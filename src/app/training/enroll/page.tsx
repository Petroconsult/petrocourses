'use client';

import { useState } from 'react';

// ----------------------
// Types
// ----------------------
type Course = {
  id: string;
  title: string;
};

type EnrollmentFormProps = {
  courseId?: string;
  courseName?: string;
};

// ----------------------
// Mock Data
// ----------------------
const coursesData: Course[] = [
  { id: 'oil-gas-fundamentals', title: 'Oil & Gas Industry Fundamentals' },
  { id: 'pipeline-operations', title: 'Pipeline Operations Management' },
  { id: 'hse-training', title: 'HSE Training & Compliance' },
];

// ----------------------
// Enrollment Form
// ----------------------
function EnrollmentForm({ courseId, courseName }: EnrollmentFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    course: courseId ?? '',
  });

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Enrollment submitted successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold text-orange-400 mb-3 uppercase tracking-wider">
            First Name
          </label>
          <input
            type="text"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="w-full bg-black/40 border border-white/10 px-4 py-3.5 text-white placeholder-white/30 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
            placeholder="John"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-orange-400 mb-3 uppercase tracking-wider">
            Last Name
          </label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="w-full bg-black/40 border border-white/10 px-4 py-3.5 text-white placeholder-white/30 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
            placeholder="Doe"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-orange-400 mb-3 uppercase tracking-wider">
          Email Address
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full bg-black/40 border border-white/10 px-4 py-3.5 text-white placeholder-white/30 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
          placeholder="john.doe@company.com"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-semibold text-orange-400 mb-3 uppercase tracking-wider">
            Phone Number
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full bg-black/40 border border-white/10 px-4 py-3.5 text-white placeholder-white/30 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
            placeholder="+1 (555) 000-0000"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-orange-400 mb-3 uppercase tracking-wider">
            Company
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full bg-black/40 border border-white/10 px-4 py-3.5 text-white placeholder-white/30 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
            placeholder="Company Name"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-orange-400 mb-3 uppercase tracking-wider">
          Select Course
        </label>
        <select
          value={formData.course}
          onChange={(e) => setFormData({ ...formData, course: e.target.value })}
          className="w-full bg-black/40 border border-white/10 px-4 py-3.5 text-white focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all duration-300"
        >
          <option value="">Choose a course</option>
          {coursesData.map((course) => (
            <option key={course.id} value={course.id} className="bg-zinc-900">
              {course.title}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-4 px-8 hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 active:scale-[0.99]"
      >
        Submit Enrollment
      </button>
    </div>
  );
}

// ----------------------
// Main Page
// ----------------------
export default function EnrollPage() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  return (
    <div className="min-h-screen bg-black text-white py-20 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-orange-500/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-20 max-w-3xl">
          <div className="inline-block px-4 py-1.5 bg-orange-500/10 border border-orange-500/20 mb-6">
            <span className="text-xs font-semibold text-orange-400 tracking-widest">ENROLLMENT</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Begin Your Journey
          </h1>
          <p className="text-xl text-white/60 leading-relaxed">
            Complete the enrollment form below to secure your spot in our world-class training programs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Enrollment Form */}
          <div className="lg:col-span-2">
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/5 p-10 md:p-14">
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-white mb-3">Enrollment Application</h2>
                <p className="text-white/40">Fill in your details to get started</p>
              </div>

              <EnrollmentForm
                courseId={selectedCourse?.id}
                courseName={selectedCourse?.title}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/** Process Steps */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/5 p-8">
              <h3 className="text-xs font-bold tracking-widest text-orange-400 mb-8 uppercase">
                Enrollment Process
              </h3>

              <div className="space-y-6">
                {[
                  { num: '01', title: 'Application', desc: 'Submit your enrollment details' },
                  { num: '02', title: 'Review', desc: 'Confirmation within 24 hours' },
                  { num: '03', title: 'Payment', desc: 'Secure payment processing' },
                  { num: '04', title: 'Access', desc: 'Immediate course material access' },
                ].map((step, idx) => (
                  <div key={step.num} className="flex gap-4 group relative">
                    {idx !== 3 && (
                      <div className="absolute left-[15px] top-10 w-[2px] h-6 bg-gradient-to-b from-orange-500/20 to-transparent"></div>
                    )}
                    <div className="relative flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-orange-500/10 border-2 border-orange-500/30 flex items-center justify-center text-xs font-bold text-orange-400 group-hover:border-orange-500 group-hover:bg-orange-500/20 transition-all duration-300">
                        {step.num}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-semibold mb-1.5 group-hover:text-orange-400 transition-colors duration-300">
                        {step.title}
                      </div>
                      <div className="text-sm text-white/50 leading-relaxed">{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/** Contact */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/5 p-8">
              <h3 className="text-xs font-bold tracking-widest text-orange-400 mb-8 uppercase">
                Need Help?
              </h3>

              <div className="space-y-6">
                <div>
                  <div className="text-[10px] font-bold text-white/30 mb-2 uppercase tracking-widest">
                    Email
                  </div>
                  <a
                    href="mailto:info@petroconsultenergy.co.uk"
                    className="text-white/80 hover:text-orange-400 transition-colors duration-300 text-sm"
                  >
                    info@petroconsultenergy.co.uk
                  </a>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

                <div>
                  <div className="text-[10px] font-bold text-white/30 mb-2 uppercase tracking-widest">
                    Phone
                  </div>
                  <a
                    href="tel:+441708755355"
                    className="text-white/80 hover:text-orange-400 transition-colors duration-300 text-sm"
                  >
                    +44 (0) 1708 755 355
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/** FAQ */}
        <div className="mt-32">
          <div className="mb-16 max-w-3xl">
            <div className="inline-block px-4 py-1.5 bg-orange-500/10 border border-orange-500/20 mb-6">
              <span className="text-xs font-semibold text-orange-400 tracking-widest">FAQ</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Common Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                q: 'What payment methods do you accept?',
                a: 'We accept credit cards, debit cards, bank transfers, and corporate purchase orders for bulk enrollments.',
              },
              {
                q: 'Can I get a refund if I cancel?',
                a: 'Full refund available for cancellations 7+ days before start date. 50% refund within 7 days of course start.',
              },
              {
                q: 'Do you offer group discounts?',
                a: 'Yes. Groups of 3+ participants receive special pricing. Contact our team for corporate training packages.',
              },
              {
                q: 'What are the technical requirements?',
                a: 'A computer with reliable internet, modern web browser, and basic audio/video capabilities for live sessions.',
              },
              {
                q: 'Will I receive a certificate?',
                a: 'All participants who complete course requirements receive an industry-recognized professional certificate.',
              },
              {
                q: 'How long is course access valid?',
                a: 'Lifetime access to all materials, including future updates and curriculum additions.',
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-zinc-900/30 backdrop-blur-sm border border-white/5 p-8 hover:border-orange-500/30 hover:bg-zinc-900/50 transition-all duration-300 group"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-6 h-6 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-orange-500/20 transition-colors duration-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                  </div>
                  <h3 className="text-white font-semibold leading-relaxed group-hover:text-orange-400 transition-colors duration-300">{faq.q}</h3>
                </div>
                <p className="text-white/50 text-sm leading-relaxed pl-9">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/** Bottom CTA */}
        <div className="mt-32 bg-zinc-900/50 backdrop-blur-sm border border-white/5 p-12 md:p-16 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need More Information?
          </h3>
          <p className="text-white/50 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            Our enrollment advisors are available to answer your questions and help you choose the right training program
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30">
              Contact Support
            </button>
            <button className="px-10 py-4 border-2 border-orange-500/30 text-white font-semibold hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300">
              Schedule a Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}