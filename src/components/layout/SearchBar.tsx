'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { getPostHogService } from '@/integrations';

interface CourseResult {
  id: string;
  title: string;
  category: string;
  level: string;
}

interface SearchBarProps {
  isMobile?: boolean;
}

export default function SearchBar({ isMobile = false }: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CourseResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const analytics = getPostHogService();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    try {
      // Track search in analytics
      await analytics.capture('course_search', {
        event: 'Course Search',
        properties: {
          query: value,
          timestamp: new Date(),
        },
      });

      // Fetch search results
      const response = await fetch(`/api/courses?search=${encodeURIComponent(value)}`);
      const data = await response.json();
      setResults(data.slice(0, 5)); // Limit to 5 results
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectCourse = (courseId: string) => {
    analytics.capture('course_selected', {
      event: 'Course Selected from Search',
      properties: {
        course_id: courseId,
        query,
        timestamp: new Date(),
      },
    });
    setIsOpen(false);
    setQuery('');
  };

  if (isMobile) {
    return (
      <div className="w-full mb-4">
        <input
          type="text"
          placeholder="Search courses..."
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-orange-500/60 transition-all duration-300"
          value={query}
          onChange={handleSearch}
          onFocus={() => setIsOpen(true)}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search courses..."
          className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-orange-500/60 transition-all duration-300"
          value={query}
          onChange={handleSearch}
          onFocus={() => setIsOpen(true)}
        />
        <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-white/10 rounded-lg shadow-xl overflow-hidden z-50">
          {query.trim().length < 2 ? (
            <div className="p-6 text-center">
              <svg className="w-12 h-12 mx-auto text-white/20 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-white/60 text-sm">Start typing to search courses</p>
            </div>
          ) : isLoading ? (
            <div className="p-6 text-center">
              <div className="inline-block w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-white/60 text-sm mt-3">Searching...</p>
            </div>
          ) : results.length > 0 ? (
            <div className="py-2 max-h-96 overflow-y-auto">
              {results.map((course) => (
                <Link
                  key={course.id}
                  href={`/training/courses/${course.id}`}
                  onClick={() => handleSelectCourse(course.id)}
                  className="block px-4 py-3 hover:bg-white/5 transition-colors duration-200 border-l-2 border-transparent hover:border-orange-500"
                >
                  <p className="text-white font-medium text-sm">{course.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded">
                      {course.category}
                    </span>
                    <span className="text-xs text-white/50">{course.level}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center">
              <svg className="w-12 h-12 mx-auto text-white/20 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10a4 4 0 018 0m-9 10l1.414 1.414m3.172-6.586a4 4 0 015.656 0M20 12a8 8 0 11-16 0 8 8 0 0116 0z" />
              </svg>
              <p className="text-white/60 text-sm">No courses found</p>
              <Link
                href="/training/courses"
                className="text-orange-500 hover:text-orange-400 text-sm font-medium mt-3 inline-block transition-colors duration-200"
              >
                Browse all courses →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
