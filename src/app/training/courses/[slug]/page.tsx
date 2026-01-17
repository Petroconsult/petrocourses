import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCourseBySlug, coursesData } from '@/data/courses';
import { formatCurrency, formatDate } from '@/utils/formHelpers';
import CourseCard from '@/components/courses/courseCard';

export async function generateStaticParams() {
  return coursesData.map((course) => ({
    slug: course.slug,
  }));
}

export default function CoursePage({ params }: { params: { slug: string } }) {
  const course = getCourseBySlug(params.slug);

  if (!course) {
    notFound();
  }

  const relatedCourses = coursesData
    .filter((c) => c.category === course.category && c.id !== course.id)
    .slice(0, 3);

  const categoryColors: Record<string, string> = {
    upstream: 'bg-blue-800 text-white',
    midstream: 'bg-green-800 text-white',
    downstream: 'bg-purple-800 text-white',
    safety: 'bg-red-800 text-white',
    management: 'bg-yellow-700 text-black',
    technical: 'bg-indigo-800 text-white',
  };

  return (
    <div className="max-w-7xl mx-auto text-white">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm">
        <ol className="flex items-center space-x-2 text-gray-400">
          <li>
            <Link href="/training" className="hover:text-orange-400">Training</Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/training/courses" className="hover:text-orange-400">Courses</Link>
          </li>
          <li>/</li>
          <li className="text-white font-medium">{course.title}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero Section */}
          <div className="bg-gray-900 rounded-lg shadow-md overflow-hidden">
            <div className="relative h-96">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-black/60" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${categoryColors[course.category]}`}>
                  {course.category.charAt(0).toUpperCase() + course.category.slice(1)}
                </span>
                <h1 className="text-4xl font-bold mb-2">{course.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-gray-300">
                  <span>{course.rating} rating</span>
                  <span>•</span>
                  <span>{course.studentsEnrolled} students</span>
                  <span>•</span>
                  <span className="capitalize">{course.level}</span>
                </div>
              </div>
            </div>

            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">Course Overview</h2>
              <p className="text-gray-300 leading-relaxed">{course.description}</p>
            </div>
          </div>

          {/* What You'll Learn */}
          <div className="bg-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-white">What You'll Learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {course.objectives.map((objective, index) => (
                <p key={index} className="text-gray-300">{objective}</p>
              ))}
            </div>
          </div>

          {/* Course Details */}
          <div className="bg-gray-800 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-white">Course Details</h2>
            <div className="grid grid-cols-2 gap-6 text-gray-300">
              <div>
                <h3 className="text-sm font-semibold mb-2">Duration</h3>
                <p className="text-lg">{course.duration}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2">Level</h3>
                <p className="text-lg capitalize">{course.level}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2">Delivery Mode</h3>
                <p className="text-lg capitalize">{course.deliveryMode}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-2">Instructor</h3>
                <p className="text-lg">{course.instructor}</p>
              </div>
            </div>
          </div>

          {/* Prerequisites */}
          {course.prerequisites.length > 0 && (
            <div className="bg-gray-800 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-white">Prerequisites</h2>
              <ul className="space-y-2 text-gray-300">
                {course.prerequisites.map((prereq, index) => (
                  <li key={index}>• {prereq}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Certifications */}
          {course.certifications.length > 0 && (
            <div className="bg-gray-800 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-white">Certification</h2>
              <div className="bg-gray-700 rounded-lg p-6 text-gray-300">
                <h3 className="font-semibold mb-2 text-white">Upon completion, you will receive:</h3>
                <ul className="space-y-1">
                  {course.certifications.map((cert, index) => (
                    <li key={index}>{cert}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gray-900 rounded-lg p-6 sticky top-6 space-y-4">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-white mb-2">
                {formatCurrency(course.price, course.currency)}
              </div>
              {course.nextStartDate && (
                <p className="text-sm text-gray-400">
                  Next start: {formatDate(course.nextStartDate)}
                </p>
              )}
            </div>

            <Link
              href={`/training/enroll?course=${course.id}`}
              className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-3 px-6 rounded-lg font-semibold transition"
            >
              Enroll Now
            </Link>

            <button className="block w-full bg-gray-800 hover:bg-gray-700 text-white text-center py-3 px-6 rounded-lg font-semibold border border-gray-600 transition">
              Request Information
            </button>

            <div className="border-t border-gray-700 mt-6 pt-6 space-y-2">
              <h3 className="font-semibold mb-3 text-white">This course includes:</h3>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>{course.duration} of content</li>
                <li>Comprehensive materials</li>
                <li>Certificate of completion</li>
                <li>Lifetime access</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Related Courses */}
      {relatedCourses.length > 0 && (
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-white">Related Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedCourses.map((relatedCourse) => (
              <CourseCard key={relatedCourse.id} course={relatedCourse} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
