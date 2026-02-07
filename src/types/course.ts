export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: 'upstream' | 'midstream' | 'downstream' | 'safety' | 'management' | 'technical';
  subCategory?: string; 
  duration: string;
  audioDurationSeconds?: number; // Total audio duration for completion tracking
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
  isSequenced?: boolean; // Default true - lessons must be in order
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  sequenceEnforced?: boolean; // Default true - no flexibility in section order
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  durationSeconds?: number; // For audio completion tracking
  type: 'video' | 'reading' | 'quiz' | 'practical';
  sequenceOrder: number; // Enforces strict lesson ordering
  content?: string; // Lesson content/description
  videoUrl?: string; // For video lessons
  hasFollowingQuiz?: boolean; // If true, quiz follows this lesson
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

/**
 * Quiz Types - Self-assessed, mandatory, no retakes
 */
export interface Quiz {
  id: string;
  lessonId: string;
  title: string;
  description?: string;
  questions: QuizQuestion[];
  isMandatory: boolean;
  allowRetakes: boolean; // Always false for PetroCourses
  solutions: QuizSolution[]; // Shown after submission
}

export interface QuizQuestion {
  id: string;
  text: string;
  type: 'multiple-choice' | 'short-answer' | 'true-false';
  options?: string[];
  correctAnswer?: string; // Only for grading reference
}

export interface QuizSolution {
  questionId: string;
  correctAnswer: string;
  explanation: string;
}

/**
 * Lesson Completion Tracking
 */
export interface LessonCompletion {
  userId: string;
  lessonId: string;
  courseId: string;
  status: 'locked' | 'in-progress' | 'completed';
  audioPlayedSeconds: number;
  audioDurationSeconds: number;
  percentComplete: number;
  startedAt: Date;
  completedAt?: Date;
}

/**
 * Quiz Attempt - Single attempt, self-assessed, no scores
 */
export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  lessonId: string;
  courseId: string;
  answers: Record<string, string>; // question ID -> answer
  submittedAt: Date;
  noRetakeAllowed: boolean; // Always true
  // NO score field - self-assessed only
}

/**
 * Course Progress Tracking
 */
export interface CourseProgress {
  userId: string;
  courseId: string;
  currentModuleIndex: number;
  currentLessonIndex: number;
  completedLessons: string[]; // lesson IDs
  audioCompletedSeconds: number;
  audioTotalSeconds: number;
  quizAttempts: string[]; // quiz IDs attempted (not scores)
  enrolledAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  completionPercentage: number;
}

/**
 * Certificate - Based on audio completion, not quiz scores
 */
export interface CertificateInfo {
  id: string;
  userId: string;
  courseId: string;
  courseName: string;
  instructorName: string;
  completionDate: Date;
  issuedAt: Date;
  audioCompletionPercentage: number; // 100% for certificate
  certificateUrl?: string;
  certificateNumber?: string;
}
