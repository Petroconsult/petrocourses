'use client';

import { useState, useMemo } from 'react';
import { coursesData } from '@/data/courses';
import CourseGrid from '@/components/courses/courseGrid';
import CourseFilter from '@/components/courses/courseFilter';
import FilterSidebar from '@/components/courses/filterSidebar';
import CoursePagination from '@/components/courses/coursePagination';

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState(''); 
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedDelivery, setSelectedDelivery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const coursesPerPage = 9;

  const filteredCourses = useMemo(() => {
    return coursesData.filter((course) => {
      const matchesCategory = !selectedCategory || course.category === selectedCategory;
      const matchesSubCategory =
        selectedCategory !== 'upstream' ||
        !selectedSubCategory ||
        course.subCategory === selectedSubCategory; 
      const matchesLevel = !selectedLevel || course.level === selectedLevel;
      const matchesDelivery = !selectedDelivery || course.deliveryMode === selectedDelivery;
      const matchesSearch = !searchQuery || 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSubCategory && matchesLevel && matchesDelivery && matchesSearch;
    });
  }, [selectedCategory, selectedSubCategory, selectedLevel, selectedDelivery, searchQuery]); 

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );

  const handleReset = () => {
    setSelectedCategory('');
    setSelectedSubCategory('');
    setSelectedLevel('');
    setSelectedDelivery('');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Training Courses</h1>
        <p className="text-lg text-gray-600">
          Explore our comprehensive range of petroleum and gas training programs
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search courses by title or keyword..."
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <svg
            className="absolute left-4 top-3.5 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Filter Bar (Mobile/Tablet) */}
      <div className="lg:hidden mb-6">
        <CourseFilter
          selectedCategory={selectedCategory}
          selectedSubCategory={selectedSubCategory} 
          selectedLevel={selectedLevel}
          selectedDelivery={selectedDelivery}
          onCategoryChange={(val) => {
            setSelectedCategory(val);
            setSelectedSubCategory('');
            setCurrentPage(1);
          }}
          onSubCategoryChange={(val) => { 
            setSelectedSubCategory(val);
            setCurrentPage(1);
          }}
          onLevelChange={(val) => {
            setSelectedLevel(val);
            setCurrentPage(1);
          }}
          onDeliveryChange={(val) => {
            setSelectedDelivery(val);
            setCurrentPage(1);
          }}
          onReset={handleReset}
        />
      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between mb-6">
        <div className="text-gray-600">
          Showing <span className="font-semibold">{filteredCourses.length}</span> course{filteredCourses.length !== 1 ? 's' : ''}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-orange-100 text-orange-600' : 'text-gray-400 hover:text-gray-600'}`}
            aria-label="Grid view"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-orange-100 text-orange-600' : 'text-gray-400 hover:text-gray-600'}`}
            aria-label="List view"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar (Desktop) */}
        <div className="hidden lg:block">
          <FilterSidebar
            selectedCategory={selectedCategory}
            selectedSubCategory={selectedSubCategory} 
            selectedLevel={selectedLevel}
            selectedDelivery={selectedDelivery}
            onCategoryChange={(val) => {
              setSelectedCategory(val);
              setSelectedSubCategory(''); 
              setCurrentPage(1);
            }}
            onSubCategoryChange={(val) => { 
              setSelectedSubCategory(val);
              setCurrentPage(1);
            }}
            onLevelChange={(val) => {
              setSelectedLevel(val);
              setCurrentPage(1);
            }}
            onDeliveryChange={(val) => {
              setSelectedDelivery(val);
              setCurrentPage(1);
            }}
            onReset={handleReset}
          />
        </div>

        {/* Course Grid */}
        <div className="lg:col-span-3">
          <CourseGrid courses={paginatedCourses} />
          
          <CoursePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
