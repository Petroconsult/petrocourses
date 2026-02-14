'use client';

import { useState } from 'react';

interface CourseProgress {
  id: string;
  name: string;
  progress: number;
  modules: Module[];
  startDate: string;
  estimatedCompletion: string;
  status: 'in-progress' | 'completed' | 'paused';
}

interface Module {
  id: string;
  name: string;
  completed: boolean;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  name: string;
  duration: string;
  completed: boolean;
  type: 'video' | 'quiz' | 'assignment' | 'reading';
}

export default function ProgressPage() {
  const [courses] = useState<CourseProgress[]>([
    {
      id: 'course_1',
      name: 'HSE Training & Compliance',
      progress: 75,
      startDate: '2025-09-15',
      estimatedCompletion: '2026-01-30',
      status: 'in-progress',
      modules: [
        {
          id: 'mod_1',
          name: 'Module 1: Introduction to HSE',
          completed: true,
          lessons: [
            { id: 'les_1', name: 'What is HSE?', duration: '15 min', completed: true, type: 'video' },
            { id: 'les_2', name: 'HSE Standards Overview', duration: '20 min', completed: true, type: 'video' },
            { id: 'les_3', name: 'Quiz: HSE Basics', duration: '10 min', completed: true, type: 'quiz' },
          ],
        },
        {
          id: 'mod_2',
          name: 'Module 2: Safety Management Systems',
          completed: true,
          lessons: [
            { id: 'les_4', name: 'Planning & Implementation', duration: '25 min', completed: true, type: 'video' },
            { id: 'les_5', name: 'Documentation Requirements', duration: '15 min', completed: true, type: 'reading' },
            { id: 'les_6', name: 'Assignment: Create Safety Plan', duration: '45 min', completed: true, type: 'assignment' },
          ],
        },
        {
          id: 'mod_3',
          name: 'Module 3: Hazard Assessment',
          completed: false,
          lessons: [
            { id: 'les_7', name: 'Identifying Hazards', duration: '20 min', completed: true, type: 'video' },
            { id: 'les_8', name: 'Risk Analysis Methods', duration: '25 min', completed: false, type: 'video' },
            { id: 'les_9', name: 'Practical Exercise', duration: '30 min', completed: false, type: 'assignment' },
          ],
        },
        {
          id: 'mod_4',
          name: 'Module 4: Control Measures & Implementation',
          completed: false,
          lessons: [
            { id: 'les_10', name: 'Hierarchy of Controls', duration: '20 min', completed: false, type: 'video' },
            { id: 'les_11', name: 'Implementation Strategies', duration: '25 min', completed: false, type: 'video' },
          ],
        },
      ],
    },
    {
      id: 'course_2',
      name: 'Oil & Gas Industry Fundamentals',
      progress: 45,
      startDate: '2025-10-01',
      estimatedCompletion: '2026-02-28',
      status: 'in-progress',
      modules: [
        {
          id: 'mod_5',
          name: 'Module 1: Industry Overview',
          completed: true,
          lessons: [
            { id: 'les_12', name: 'History & Evolution', duration: '20 min', completed: true, type: 'video' },
            { id: 'les_13', name: 'Current Market Analysis', duration: '25 min', completed: true, type: 'video' },
            { id: 'les_14', name: 'Quiz: Industry Basics', duration: '15 min', completed: true, type: 'quiz' },
          ],
        },
        {
          id: 'mod_6',
          name: 'Module 2: Exploration & Production',
          completed: false,
          lessons: [
            { id: 'les_15', name: 'Seismic Surveys', duration: '25 min', completed: false, type: 'video' },
            { id: 'les_16', name: 'Drilling Operations', duration: '30 min', completed: false, type: 'video' },
            { id: 'les_17', name: 'Case Study Discussion', duration: '20 min', completed: false, type: 'assignment' },
          ],
        },
      ],
    },
    {
      id: 'course_3',
      name: 'Advanced Environmental Management',
      progress: 100,
      startDate: '2025-08-01',
      estimatedCompletion: '2025-12-15',
      status: 'completed',
      modules: [
        {
          id: 'mod_7',
          name: 'Module 1: Environmental Regulations',
          completed: true,
          lessons: [
            { id: 'les_18', name: 'Global Standards', duration: '20 min', completed: true, type: 'video' },
            { id: 'les_19', name: 'Compliance Framework', duration: '25 min', completed: true, type: 'video' },
          ],
        },
        {
          id: 'mod_8',
          name: 'Module 2: Pollution Prevention',
          completed: true,
          lessons: [
            { id: 'les_20', name: 'Source Control', duration: '20 min', completed: true, type: 'video' },
            { id: 'les_21', name: 'Treatment Technologies', duration: '25 min', completed: true, type: 'video' },
          ],
        },
      ],
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'in-progress':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'paused':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getLessonTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
          </svg>
        );
      case 'quiz':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 100-2H5a4 4 0 000 8h6a1 1 0 100-2H4v-2zm0 2a1 1 0 100 2v2a1 1 0 100-2h6z" clipRule="evenodd" />
          </svg>
        );
      case 'assignment':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 100-2H5a4 4 0 000 8h6a1 1 0 100-2H4v-2z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.669 0-3.218.51-4.5 1.385A7.968 7.968 0 009 4.804z" />
          </svg>
        );
    }
  };

  const ProgressBar = ({ progress }: { progress: number }) => (
    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Learning Progress</h1>
        <p className="text-white/60">
          Track your course completion and see your detailed lesson progress
        </p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            label: 'Total Courses',
            value: courses.length.toString(),
            color: 'from-blue-500/10 to-blue-600/5 border-blue-500/20',
            icon: (
              <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.5 1.5H9.5A1.5 1.5 0 008 3v1.5H6.5A1.5 1.5 0 005 6v11a1.5 1.5 0 001.5 1.5h7A1.5 1.5 0 005 17V6a1.5 1.5 0 011.5-1.5H8V3a1.5 1.5 0 011.5-1.5z" />
              </svg>
            ),
          },
          {
            label: 'In Progress',
            value: courses.filter((c) => c.status === 'in-progress').length.toString(),
            color: 'from-yellow-500/10 to-yellow-600/5 border-yellow-500/20',
            icon: (
              <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
              </svg>
            ),
          },
          {
            label: 'Completed',
            value: courses.filter((c) => c.status === 'completed').length.toString(),
            color: 'from-green-500/10 to-green-600/5 border-green-500/20',
            icon: (
              <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ),
          },
          {
            label: 'Average Progress',
            value: Math.round(courses.reduce((sum, c) => sum + c.progress, 0) / courses.length) + '%',
            color: 'from-purple-500/10 to-purple-600/5 border-purple-500/20',
            icon: (
              <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
            ),
          },
        ].map((stat) => (
          <div key={stat.label} className={`bg-gradient-to-br ${stat.color} border rounded-lg p-6`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
              <div className="text-white/20">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Courses List */}
      <div className="space-y-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-zinc-900/50 border border-white/10 rounded-lg overflow-hidden hover:border-white/20 transition-all duration-200"
          >
            {/* Course Header */}
            <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/5 border-b border-white/10 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{course.name}</h3>
                  <div className="flex items-center space-x-6 text-sm text-white/60">
                    <span>Started: {new Date(course.startDate).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>Expected: {new Date(course.estimatedCompletion).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(course.status)}`}>
                  {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/60">Overall Progress</span>
                  <span className="text-sm font-bold text-white">{course.progress}%</span>
                </div>
                <ProgressBar progress={course.progress} />
              </div>
            </div>

            {/* Modules */}
            <div className="p-6 space-y-4">
              {course.modules.map((module, modelIndex) => (
                <div key={module.id} className="bg-white/5 rounded-lg overflow-hidden">
                  {/* Module Header */}
                  <div className="p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1">
                        {module.completed ? (
                          <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-white/20" />
                        )}
                        <span className={module.completed ? 'text-white font-medium line-through text-white/60' : 'text-white font-medium'}>{module.name}</span>
                      </div>
                      <span className="text-xs text-white/60">
                        {module.lessons.filter((l) => l.completed).length}/{module.lessons.length} lessons
                      </span>
                    </div>
                  </div>

                  {/* Lessons (Hidden by default, expand on click) */}
                  <div className="border-t border-white/10 divide-y divide-white/10">
                    {module.lessons.map((lesson) => (
                      <div key={lesson.id} className="p-4 flex items-center justify-between hover:bg-white/5 transition-all cursor-pointer">
                        <div className="flex items-center space-x-3 flex-1">
                          {lesson.completed ? (
                            <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                              <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-white/20" />
                          )}
                          <div className="flex-1">
                            <p className={lesson.completed ? 'text-white/60 line-through text-sm' : 'text-white text-sm'}>{lesson.name}</p>
                          </div>
                          <span className="text-xs text-white/40">{lesson.duration}</span>
                        </div>
                        <span className="ml-4 text-white/40">{getLessonTypeIcon(lesson.type)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
