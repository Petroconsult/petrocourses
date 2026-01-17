export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: 'upstream' | 'midstream' | 'downstream' | 'safety' | 'management' | 'technical';
  subCategory?: string; 
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  currency: string;
  thumbnail: string;
  instructor: string;
  rating: number;
  studentsEnrolled: number;
  modules: CourseModule[];
  objectives: string[];
  prerequisites: string[];
  certifications: string[];
  deliveryMode: 'online' | 'in-person' | 'hybrid';
  nextStartDate?: string;
  featured?: boolean;
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'reading' | 'quiz' | 'practical';
}

export interface EnrollmentData {
  courseId: string;
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  position?: string;
  experience: string;
  startDate: string;
  message?: string;
}

export interface BookingData {
  serviceName: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  preferredDate: string;
  message?: string;
}

export interface LeadData {
  fullName: string;
  email: string;
  phone: string;
  interest: string;
  company?: string;
}