import Link from 'next/link';
import { getFeaturedCourses } from '@/data/courses';
import CourseCard from '@/components/courses/courseCard';
import LeadCaptureForm from '@/components/forms/LeadCaptureForm';

export default function TrainingPage() {
  const featuredCourses = getFeaturedCourses();

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-12 text-white">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Professional Training for Oil & Gas Industry
          </h1>
          <p className="text-xl mb-8 text-orange-100">
            Advance your career with industry-leading training programs designed by experts with decades of experience in petroleum engineering and operations.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/training/courses"
              className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Browse All Courses
            </Link>
            <Link
              href="/training/enroll"
              className="bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-800 transition border-2 border-white"
            >
              Enroll Now
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Why Choose Our Training Programs?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Industry-Recognized Certifications</h3>
            <p className="text-gray-600">
              Earn professional certifications that are respected and valued across the global oil and gas industry.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
            <p className="text-gray-600">
              Learn from seasoned professionals with real-world experience in petroleum engineering and operations.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Flexible Learning Options</h3>
            <p className="text-gray-600">
              Choose from online, in-person, or hybrid training formats that fit your schedule and learning style.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Featured Courses</h2>
          <Link href="/training/courses" className="text-orange-600 hover:text-orange-700 font-semibold">
            View All Courses →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* Training Categories */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Training by Discipline
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Upstream', icon: '🛢️', desc: 'Exploration, drilling, and production operations', href: '/training/courses?category=upstream' },
            { title: 'Midstream', icon: '🚰', desc: 'Pipeline operations and transportation', href: '/training/courses?category=midstream' },
            { title: 'Downstream', icon: '⛽', desc: 'Refining, processing, and distribution', href: '/training/courses?category=downstream' },
            { title: 'Safety & HSE', icon: '🦺', desc: 'Health, safety, and environmental management', href: '/training/courses?category=safety' },
            { title: 'Management', icon: '💼', desc: 'Project and operations management', href: '/training/courses?category=management' },
            { title: 'Technical', icon: '⚙️', desc: 'Advanced technical and engineering skills', href: '/training/courses?category=technical' },
          ].map((category) => (
            <Link key={category.title} href={category.href}>
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-gray-600 text-sm">{category.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Advance Your Career?
            </h2>
            <p className="text-gray-600 mb-6">
              Get in touch with our training advisors to find the perfect program for your career goals. We offer customized training solutions for individuals and corporate teams.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-orange-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h4 className="font-semibold">Personalized Learning Paths</h4>
                  <p className="text-sm text-gray-600">Tailored programs based on your experience and goals</p>
                </div>
              </div>
              <div className="flex items-start">
                <svg className="w-6 h-6 text-orange-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h4 className="font-semibold">Career Support</h4>
                  <p className="text-sm text-gray-600">Job placement assistance and career guidance</p>
                </div>
              </div>
              <div className="flex items-start">
                <svg className="w-6 h-6 text-orange-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h4 className="font-semibold">Lifetime Access</h4>
                  <p className="text-sm text-gray-600">Ongoing access to course materials and updates</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-8 rounded-xl">
            <h3 className="text-xl font-bold mb-4">Get More Information</h3>
            <LeadCaptureForm />
          </div>
        </div>
      </section>
    </div>
  );
}