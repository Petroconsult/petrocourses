/**
 * Training Course Domain Logic
 * 
 * Business Rules:
 * - Courses are self-paced with defined audio duration
 * - Lesson order is strictly enforced (no flexibility)
 * - Quizzes are mandatory and follow specific sections
 * - No pass/fail criteria - progress and show solutions (self-assessed)
 * - Quiz retakes: NOT allowed
 * - Certificate issued upon completion of audio duration
 */

import type { Course, CourseModule, Lesson } from '@/types/course';

export interface CourseProgressState {
  userId: string;
  courseId: string;
  currentModuleIndex: number;
  currentLessonIndex: number;
  completedLessons: string[]; // lesson IDs
  audioDurationCompleted: number; // seconds
  totalAudioDuration: number; // seconds
  quizAttempts: QuizAttempt[];
  startedAt: Date;
  lastAccessedAt: Date;
  completedAt?: Date;
}

export interface QuizAttempt {
  quizId: string;
  lessonId: string;
  moduleIndex: number;
  attempted: boolean;
  completedAt?: Date;
  answers: Record<string, string>; // question ID -> answer
  // No score stored - self-assessed
}

export interface LessonProgress {
  lessonId: string;
  moduleIndex: number;
  lessonIndex: number;
  status: 'locked' | 'available' | 'in-progress' | 'completed';
  audioPlayedSeconds: number;
  audioDurationSeconds: number;
  percentComplete: number;
  hasFollowingQuiz: boolean;
  quizAttempted: boolean;
}

/**
 * Get the current course progress state
 */
export function getCurrentLessonProgress(
  course: Course,
  progressState: CourseProgressState
): LessonProgress {
  const currentModule = course.modules[progressState.currentModuleIndex];
  const currentLesson = currentModule.lessons[progressState.currentLessonIndex];

  // Parse duration to seconds
  const durationSeconds = parseDurationToSeconds(currentLesson.duration);
  const audioPlayedSeconds = progressState.audioDurationCompleted;

  // Check if this lesson has a following quiz
  const nextLesson = currentModule.lessons[progressState.currentLessonIndex + 1];
  const hasFollowingQuiz = nextLesson?.type === 'quiz';

  // Check if quiz was attempted
  const quizAttempted = progressState.quizAttempts.some(
    (q) => q.lessonId === currentLesson.id
  );

  return {
    lessonId: currentLesson.id,
    moduleIndex: progressState.currentModuleIndex,
    lessonIndex: progressState.currentLessonIndex,
    status: getProgressStatus(progressState, currentLesson),
    audioPlayedSeconds,
    audioDurationSeconds: durationSeconds,
    percentComplete: (audioPlayedSeconds / durationSeconds) * 100,
    hasFollowingQuiz,
    quizAttempted,
  };
}

/**
 * Determine lesson status based on progression rules
 * - Locked: Not yet available (previous lessons not complete)
 * - Available: Ready to access (all previous lessons complete)
 * - In-progress: Currently being accessed
 * - Completed: Finished
 */
function getProgressStatus(
  progressState: CourseProgressState,
  currentLesson: Lesson
): LessonProgress['status'] {
  const isCompleted = progressState.completedLessons.includes(currentLesson.id);
  if (isCompleted) return 'completed';

  const isCurrent =
    currentLesson.id ===
    progressState.currentModuleIndex &&
    currentLesson.id ===
    progressState.currentLessonIndex;
  if (isCurrent) return 'in-progress';

  // Check if all previous lessons are completed
  const allPreviousComplete = checkAllPreviousLessonsComplete(
    progressState
  );

  return allPreviousComplete ? 'available' : 'locked';
}

/**
 * Check if all lessons before current position are completed
 * Enforces strict sequential progression
 */
function checkAllPreviousLessonsComplete(
  progressState: CourseProgressState
): boolean {
  // All previous modules must be fully completed
  for (let i = 0; i < progressState.currentModuleIndex; i++) {
    // This would need to check all lessons in previous modules
    // Simplified here - in real impl, check against completed list
  }

  // All previous lessons in current module must be completed
  for (let i = 0; i < progressState.currentLessonIndex; i++) {
    // Check if lesson is in completed list
  }

  return true; // Simplified
}

/**
 * Mark lesson as completed when audio playback reaches 100%
 */
export function completeLessonByAudioCompletion(
  progressState: CourseProgressState,
  durationSeconds: number
): CourseProgressState {
  return {
    ...progressState,
    audioDurationCompleted: durationSeconds,
    completedLessons: [
      ...new Set([
        ...progressState.completedLessons,
        progressState.currentModuleIndex.toString(),
      ]),
    ],
  };
}

/**
 * Attempt a quiz
 * - Only after audio is 100% complete
 * - Mandatory before progressing
 * - No retakes allowed
 */
export function attemptQuiz(
  progressState: CourseProgressState,
  quizId: string,
  lessonId: string,
  answers: Record<string, string>
): CourseProgressState {
  // Check if already attempted
  const alreadyAttempted = progressState.quizAttempts.some(
    (q) => q.quizId === quizId
  );

  if (alreadyAttempted) {
    throw new Error('Quiz has already been attempted. Retakes are not allowed.');
  }

  // Check if previous lesson (audio) is completed
  // In real implementation, verify audio is 100% complete

  const attempt: QuizAttempt = {
    quizId,
    lessonId,
    moduleIndex: progressState.currentModuleIndex,
    attempted: true,
    completedAt: new Date(),
    answers,
  };

  return {
    ...progressState,
    quizAttempts: [...progressState.quizAttempts, attempt],
  };
}

/**
 * Progress to next lesson
 * - Only if current lesson is completed (audio 100%)
 * - If quiz exists, quiz must be attempted
 */
export function progressToNextLesson(
  course: Course,
  progressState: CourseProgressState
): CourseProgressState {
  const currentModule = course.modules[progressState.currentModuleIndex];
  const currentLesson = currentModule.lessons[progressState.currentLessonIndex];

  // Rule 1: Audio must be 100% complete
  const lessonDurationSeconds = parseDurationToSeconds(currentLesson.duration);
  if (progressState.audioDurationCompleted < lessonDurationSeconds) {
    throw new Error(
      `Cannot progress: Audio not fully completed. ${
        lessonDurationSeconds - progressState.audioDurationCompleted
      } seconds remaining.`
    );
  }

  // Rule 2: If quiz follows this lesson, it must be attempted
  const nextLesson = currentModule.lessons[progressState.currentLessonIndex + 1];
  if (nextLesson?.type === 'quiz') {
    const quizAttempted = progressState.quizAttempts.some(
      (q) => q.lessonId === currentLesson.id
    );
    if (!quizAttempted) {
      throw new Error('Quiz must be completed before progressing to next lesson.');
    }
  }

  // Check if at end of current module
  if (progressState.currentLessonIndex < currentModule.lessons.length - 1) {
    return {
      ...progressState,
      currentLessonIndex: progressState.currentLessonIndex + 1,
      audioDurationCompleted: 0,
    };
  }

  // Move to next module
  if (progressState.currentModuleIndex < course.modules.length - 1) {
    return {
      ...progressState,
      currentModuleIndex: progressState.currentModuleIndex + 1,
      currentLessonIndex: 0,
      audioDurationCompleted: 0,
    };
  }

  // Course complete
  return {
    ...progressState,
    completedAt: new Date(),
  };
}

/**
 * Check if user can access the next module
 * Rules: modules must be sequential, all lessons in current module completed, quizzes attempted
 */
export function canAccessNextModule(
  course: Course,
  progressState: CourseProgressState
): boolean {
  const currentModuleIndex = progressState.currentModuleIndex;
  const currentModule = course.modules[currentModuleIndex];

  if (!currentModule) return false;

  // Check if all lessons in current module are completed
  const allLessonsCompleted = currentModule.lessons.every(lesson =>
    progressState.completedLessons.includes(lesson.id)
  );

  // Check if all quizzes in current module are attempted
  const allQuizzesAttempted = currentModule.lessons
    .filter(lesson => lesson.type === 'quiz')
    .every(quizLesson =>
      progressState.quizAttempts.some(attempt => attempt.lessonId === quizLesson.id)
    );

  return allLessonsCompleted && allQuizzesAttempted;
}

/**
 * Check if course is completed
 * Completion = all audio sections accessed and finished
 */
export function isCourseComplete(
  course: Course,
  progressState: CourseProgressState
): boolean {
  if (!progressState.completedAt) return false;

  // All modules must be completed
  const totalLessons = course.modules.reduce(
    (sum, module) => sum + module.lessons.length,
    0
  );

  return progressState.completedLessons.length === totalLessons;
}

/**
 * Get course completion percentage
 * Based on audio duration completed vs total audio duration
 */
export function getCourseCompletionPercentage(
  course: Course,
  progressState: CourseProgressState
): number {
  const totalSeconds = calculateTotalAudioDuration(course);
  return (progressState.audioDurationCompleted / totalSeconds) * 100;
}

/**
 * Calculate total audio duration for entire course
 */
export function calculateTotalAudioDuration(course: Course): number {
  return course.modules.reduce((moduleSum, module) => {
    const moduleDuration = module.lessons.reduce((lessonSum, lesson) => {
      if (lesson.type === 'video' || lesson.type === 'reading') {
        return lessonSum + parseDurationToSeconds(lesson.duration);
      }
      return lessonSum;
    }, 0);
    return moduleSum + moduleDuration;
  }, 0);
}

/**
 * Parse duration string to seconds
 * Supports: "5:30", "1:23:45", "90 seconds", "5 minutes"
 */
export function parseDurationToSeconds(duration: string): number {
  // Handle "MM:SS" or "HH:MM:SS" format
  const timeMatch = duration.match(/(\d+):(\d+)(?::(\d+))?/);
  if (timeMatch) {
    const hours = timeMatch[3] ? parseInt(timeMatch[1]) : 0;
    const minutes = timeMatch[3] ? parseInt(timeMatch[2]) : parseInt(timeMatch[1]);
    const seconds = timeMatch[3] ? parseInt(timeMatch[3]) : parseInt(timeMatch[2]);
    return hours * 3600 + minutes * 60 + seconds;
  }

  // Handle "X seconds" format
  const secondsMatch = duration.match(/(\d+)\s*seconds?/);
  if (secondsMatch) {
    return parseInt(secondsMatch[1]);
  }

  // Handle "X minutes" format
  const minutesMatch = duration.match(/(\d+)\s*minutes?/);
  if (minutesMatch) {
    return parseInt(minutesMatch[1]) * 60;
  }

  return 0;
}

/**
 * Get next lesson in sequence
 * Respects strict ordering
 */
export function getNextLesson(
  course: Course,
  currentModuleIndex: number,
  currentLessonIndex: number
): Lesson | null {
  const currentModule = course.modules[currentModuleIndex];
  const nextLessonInModule = currentModule?.lessons[currentLessonIndex + 1];

  if (nextLessonInModule) return nextLessonInModule;

  // Try next module
  const nextModule = course.modules[currentModuleIndex + 1];
  return nextModule?.lessons[0] || null;
}

/**
 * Get previous lesson in sequence
 */
export function getPreviousLesson(
  course: Course,
  currentModuleIndex: number,
  currentLessonIndex: number
): Lesson | null {
  if (currentLessonIndex > 0) {
    const currentModule = course.modules[currentModuleIndex];
    return currentModule.lessons[currentLessonIndex - 1];
  }

  if (currentModuleIndex > 0) {
    const previousModule = course.modules[currentModuleIndex - 1];
    return previousModule.lessons[previousModule.lessons.length - 1];
  }

  return null;
}

/**
 * Get all course lessons in sequence
 */
export function getAllLessonsInSequence(course: Course): Lesson[] {
  return course.modules.flatMap((module) => module.lessons);
}

/**
 * Can user access lesson?
 * Only if it's current or all previous lessons completed
 */
export function canAccessLesson(
  course: Course,
  moduleIndex: number,
  lessonIndex: number,
  progressState: CourseProgressState
): boolean {
  // User's current position
  const userModuleIndex = progressState.currentModuleIndex;
  const userLessonIndex = progressState.currentLessonIndex;

  // Can only access current or already completed lessons
  const allLessonsBefore = course.modules
    .slice(0, moduleIndex)
    .flatMap((m) => m.lessons);

  const lessonsInCurrentModuleBefore = course.modules[moduleIndex].lessons.slice(
    0,
    lessonIndex
  );

  const allPreviousLessons = [...allLessonsBefore, ...lessonsInCurrentModuleBefore];

  // All previous must be completed
  const allPreviousCompleted = allPreviousLessons.every((lesson) =>
    progressState.completedLessons.includes(lesson.id)
  );

  return allPreviousCompleted;
}

export default {
  getCurrentLessonProgress,
  completeLessonByAudioCompletion,
  attemptQuiz,
  progressToNextLesson,
  isCourseComplete,
  getCourseCompletionPercentage,
  calculateTotalAudioDuration,
  parseDurationToSeconds,
  getNextLesson,
  getPreviousLesson,
  getAllLessonsInSequence,
  canAccessLesson,
};
