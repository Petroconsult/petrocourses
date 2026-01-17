import Link from 'next/link';
import { Course } from '@/types/course';
import { formatCurrency } from '@/utils/formHelpers';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const categoryColors: Record<string, string> = {
    upstream: 'bg-blue-600/10 text-blue-400 border-blue-500/20',
    midstream: 'bg-green-600/10 text-green-400 border-green-500/20',
    downstream: 'bg-purple-600/10 text-purple-400 border-purple-500/20',
    safety: 'bg-red-600/10 text-red-400 border-red-500/20',
    management: 'bg-yellow-600/10 text-yellow-400 border-yellow-500/20',
    technical: 'bg-indigo-600/10 text-indigo-400 border-indigo-500/20',
  };

  return (
    <Link href={`/training/courses/${course.slug}`}>
      <div className="bg-black rounded-xl overflow-hidden border border-gray-800/50 hover:border-gray-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 flex flex-col group">
        {/* Thumbnail */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Featured or Level */}
          {course.featured ? (
            <div className="absolute top-4 right-4 bg-orange-600 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg">
              Featured
            </div>
          ) : (
            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-gray-200 text-xs font-medium px-3 py-1.5 rounded-lg border border-white/10 capitalize">
              {course.level}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col flex-grow">
          {/* Category */}
          <span
            className={`text-xs font-medium px-3 py-1.5 rounded-lg w-fit mb-4 border ${categoryColors[course.category]}`}
          >
            {course.category.charAt(0).toUpperCase() + course.category.slice(1)}
          </span>

          {/* Title */}
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors duration-300">
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-400 mb-6 line-clamp-2 flex-grow leading-relaxed">
            {course.description}
          </p>

          {/* Bottom Section */}
          <div className="flex items-center justify-between pt-5 border-t border-gray-800/50">
            <div className="flex flex-col">
              <span className="text-gray-500 text-xs uppercase tracking-wider mb-1">Price</span>
              <span className="text-white font-bold text-xl">
                {formatCurrency(course.price, course.currency)}
              </span>
            </div>
            <span className="text-orange-500 font-semibold text-sm hover:text-orange-400 transition-colors duration-300 flex items-center gap-1.5">
              Learn More
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}