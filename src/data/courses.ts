import { Course } from '@/types/course';

export const coursesData: Course[] = [
  {
    id: '1',
    slug: 'petroleum-engineering-fundamentals',
    title: 'Petroleum Engineering Fundamentals',
    description: 'Comprehensive introduction to petroleum engineering covering exploration, drilling, production, and reservoir management.',
    category: 'upstream',
    duration: '8 weeks',
    level: 'beginner',
    price: 2500,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800',
    instructor: 'Dr. Ahmed Hassan',
    rating: 4.8,
    studentsEnrolled: 245,
    objectives: [
      'Understand basic petroleum geology and reservoir characteristics',
      'Learn drilling techniques and well design principles',
      'Master production operations and optimization',
      'Apply reservoir engineering concepts'
    ],
    prerequisites: ['Basic engineering knowledge', 'Mathematics proficiency'],
    certifications: ['Professional Certificate in Petroleum Engineering'],
    deliveryMode: 'hybrid',
    nextStartDate: '2025-01-15',
    featured: true,
    modules: [
      {
        id: 'm1',
        title: 'Introduction to Petroleum Systems',
        description: 'Overview of petroleum formation and exploration',
        lessons: [
          { id: 'l1', title: 'Petroleum Geology Basics', duration: '45 min', type: 'video' },
          { id: 'l2', title: 'Exploration Methods', duration: '60 min', type: 'video' }
        ]
      }
    ]
  },
  {
    id: '2',
    slug: 'advanced-reservoir-simulation',
    title: 'Advanced Reservoir Simulation',
    description: 'Master reservoir simulation techniques using industry-standard software for enhanced oil recovery and production forecasting.',
    category: 'technical',
    duration: '10 weeks',
    level: 'advanced',
    price: 3500,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
    instructor: 'Prof. Sarah Mitchell',
    rating: 4.9,
    studentsEnrolled: 128,
    objectives: [
      'Build and validate reservoir simulation models',
      'Perform history matching and uncertainty analysis',
      'Optimize production strategies',
      'Evaluate enhanced oil recovery techniques'
    ],
    prerequisites: ['Petroleum Engineering degree', 'Basic reservoir engineering'],
    certifications: ['Certified Reservoir Simulation Specialist'],
    deliveryMode: 'online',
    nextStartDate: '2025-02-01',
    featured: true,
    modules: []
  },
  {
    id: '3',
    slug: 'hse-oil-gas-operations',
    title: 'HSE in Oil & Gas Operations',
    description: 'Comprehensive health, safety, and environmental management for oil and gas industry professionals.',
    category: 'safety',
    duration: '6 weeks',
    level: 'intermediate',
    price: 1800,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800',
    instructor: 'John Anderson',
    rating: 4.7,
    studentsEnrolled: 389,
    objectives: [
      'Implement HSE management systems',
      'Conduct risk assessments and safety audits',
      'Manage emergency response procedures',
      'Ensure regulatory compliance'
    ],
    prerequisites: ['Basic industry experience'],
    certifications: ['HSE Professional Certificate'],
    deliveryMode: 'in-person',
    nextStartDate: '2025-01-20',
    featured: false,
    modules: []
  },
  {
    id: '4',
    slug: 'pipeline-integrity-management',
    title: 'Pipeline Integrity Management',
    description: 'Learn pipeline inspection, maintenance, and integrity management techniques for safe and efficient operations.',
    category: 'midstream',
    duration: '7 weeks',
    level: 'intermediate',
    price: 2200,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800',
    instructor: 'Michael Chen',
    rating: 4.6,
    studentsEnrolled: 167,
    objectives: [
      'Understand pipeline corrosion and failure mechanisms',
      'Apply integrity assessment methods',
      'Plan and execute inspection programs',
      'Develop maintenance strategies'
    ],
    prerequisites: ['Engineering background', 'Pipeline operations knowledge'],
    certifications: ['Pipeline Integrity Specialist'],
    deliveryMode: 'hybrid',
    nextStartDate: '2025-01-25',
    featured: false,
    modules: []
  },
  {
    id: '5',
    slug: 'refinery-operations-management',
    title: 'Refinery Operations & Management',
    description: 'Master refinery processes, operations optimization, and management strategies for downstream operations.',
    category: 'downstream',
    duration: '9 weeks',
    level: 'advanced',
    price: 3200,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800',
    instructor: 'Dr. Maria Rodriguez',
    rating: 4.8,
    studentsEnrolled: 203,
    objectives: [
      'Understand refining processes and unit operations',
      'Optimize refinery performance',
      'Manage process safety and reliability',
      'Implement operational excellence strategies'
    ],
    prerequisites: ['Chemical/Petroleum Engineering degree', 'Industry experience'],
    certifications: ['Refinery Operations Manager Certificate'],
    deliveryMode: 'online',
    nextStartDate: '2025-02-10',
    featured: true,
    modules: []
  },
  {
    id: '6',
    slug: 'project-management-oil-gas',
    title: 'Project Management for Oil & Gas',
    description: 'Essential project management skills tailored for oil and gas capital projects and operations.',
    category: 'management',
    duration: '6 weeks',
    level: 'intermediate',
    price: 2000,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
    instructor: 'David Thompson',
    rating: 4.5,
    studentsEnrolled: 312,
    objectives: [
      'Apply project management methodologies',
      'Manage stakeholders and teams',
      'Control project scope, schedule, and budget',
      'Navigate industry-specific challenges'
    ],
    prerequisites: ['Engineering or business background'],
    certifications: ['Oil & Gas Project Management Certificate'],
    deliveryMode: 'online',
    nextStartDate: '2025-01-18',
    featured: false,
    modules: []
  }
];

export const getCourseBySlug = (slug: string): Course | undefined => {
  return coursesData.find(course => course.slug === slug);
};

export const getCoursesByCategory = (category: string): Course[] => {
  return coursesData.filter(course => course.category === category);
};

export const getFeaturedCourses = (): Course[] => {
  return coursesData.filter(course => course.featured);
};