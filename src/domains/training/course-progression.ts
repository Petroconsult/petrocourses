/**
 * Training Course Domain Logic
 *
 * Business Rules:
 * - Courses are self-paced with defined audio duration
 * - Lesson order is strictly enforced
 * - Quizzes are mandatory and follow specific sections
 * - No pass/fail criteria - progress only
 * - Quiz retakes NOT allowed
 * - Certificate issued upon completion
 */

import type { Course, Lesson } from "@/types/course";

export interface CourseProgressState {
  userId: string;
  courseId: string;
  currentModuleIndex: number;
  currentLessonIndex: number;
  completedLessons: string[];
  audioDurationCompleted: number;
  totalAudioDuration: number;
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
  answers: Record<string, string>;
}

export interface LessonProgress {
  lessonId: string;
  moduleIndex: number;
  lessonIndex: number;
  status: "locked" | "available" | "in-progress" | "completed";
  audioPlayedSeconds: number;
  audioDurationSeconds: number;
  percentComplete: number;
  hasFollowingQuiz: boolean;
  quizAttempted: boolean;
}

/**
 * Get current lesson progress
 */
export function getCurrentLessonProgress(
  course: Course,
  progressState: CourseProgressState
): LessonProgress {

  const module = course.modules[progressState.currentModuleIndex];
  if (!module) throw new Error("Invalid module index");

  const lesson = module.lessons[progressState.currentLessonIndex];
  if (!lesson) throw new Error("Invalid lesson index");

  const durationSeconds = parseDurationToSeconds(lesson.duration);
  const audioPlayedSeconds = progressState.audioDurationCompleted;

  const nextLesson = module.lessons[progressState.currentLessonIndex + 1];
  const hasFollowingQuiz = nextLesson?.type === "quiz";

  const quizAttempted = progressState.quizAttempts.some(
    q => q.lessonId === lesson.id
  );

  return {
    lessonId: lesson.id,
    moduleIndex: progressState.currentModuleIndex,
    lessonIndex: progressState.currentLessonIndex,
    status: getProgressStatus(
      course,
      progressState,
      progressState.currentModuleIndex,
      progressState.currentLessonIndex,
      lesson
    ),
    audioPlayedSeconds,
    audioDurationSeconds: durationSeconds,
    percentComplete:
      durationSeconds > 0
        ? (audioPlayedSeconds / durationSeconds) * 100
        : 0,
    hasFollowingQuiz,
    quizAttempted
  };
}

/**
 * Determine lesson status
 */
function getProgressStatus(
  course: Course,
  progressState: CourseProgressState,
  moduleIndex: number,
  lessonIndex: number,
  lesson: Lesson
): LessonProgress["status"] {

  if (progressState.completedLessons.includes(lesson.id)) {
    return "completed";
  }

  const isCurrent =
    moduleIndex === progressState.currentModuleIndex &&
    lessonIndex === progressState.currentLessonIndex;

  if (isCurrent) return "in-progress";

  const allPreviousComplete = checkAllPreviousLessonsComplete(
    course,
    moduleIndex,
    lessonIndex,
    progressState
  );

  return allPreviousComplete ? "available" : "locked";
}

/**
 * Ensure strict sequential progression
 */
function checkAllPreviousLessonsComplete(
  course: Course,
  moduleIndex: number,
  lessonIndex: number,
  progressState: CourseProgressState
): boolean {

  const previousLessons = course.modules
    .slice(0, moduleIndex)
    .flatMap(m => m.lessons)
    .concat(course.modules[moduleIndex].lessons.slice(0, lessonIndex));

  return previousLessons.every(l =>
    progressState.completedLessons.includes(l.id)
  );
}

/**
 * Mark lesson complete
 */
export function completeLessonByAudioCompletion(
  progressState: CourseProgressState,
  lessonId: string,
  durationSeconds: number
): CourseProgressState {

  return {
    ...progressState,
    audioDurationCompleted: durationSeconds,
    completedLessons: [
      ...new Set([
        ...progressState.completedLessons,
        lessonId
      ])
    ]
  };
}

/**
 * Attempt quiz
 */
export function attemptQuiz(
  progressState: CourseProgressState,
  quizId: string,
  lessonId: string,
  answers: Record<string, string>
): CourseProgressState {

  const alreadyAttempted = progressState.quizAttempts.some(
    q => q.quizId === quizId
  );

  if (alreadyAttempted) {
    throw new Error("Quiz already attempted. Retakes not allowed.");
  }

  const attempt: QuizAttempt = {
    quizId,
    lessonId,
    moduleIndex: progressState.currentModuleIndex,
    attempted: true,
    completedAt: new Date(),
    answers
  };

  return {
    ...progressState,
    quizAttempts: [...progressState.quizAttempts, attempt]
  };
}

/**
 * Move to next lesson
 */
export function progressToNextLesson(
  course: Course,
  progressState: CourseProgressState
): CourseProgressState {

  const module = course.modules[progressState.currentModuleIndex];
  if (!module) throw new Error("Invalid module");

  const lesson = module.lessons[progressState.currentLessonIndex];
  if (!lesson) throw new Error("Invalid lesson");

  const duration = parseDurationToSeconds(lesson.duration);

  if (progressState.audioDurationCompleted < duration) {
    throw new Error("Audio not fully completed.");
  }

  const nextLesson = module.lessons[progressState.currentLessonIndex + 1];

  if (nextLesson?.type === "quiz") {
    const attempted = progressState.quizAttempts.some(
      q => q.lessonId === lesson.id
    );

    if (!attempted) {
      throw new Error("Quiz must be completed before progressing.");
    }
  }

  if (progressState.currentLessonIndex < module.lessons.length - 1) {

    return {
      ...progressState,
      currentLessonIndex: progressState.currentLessonIndex + 1,
      audioDurationCompleted: 0
    };
  }

  if (progressState.currentModuleIndex < course.modules.length - 1) {

    return {
      ...progressState,
      currentModuleIndex: progressState.currentModuleIndex + 1,
      currentLessonIndex: 0,
      audioDurationCompleted: 0
    };
  }

  return {
    ...progressState,
    completedAt: new Date()
  };
}

/**
 * Course completion check
 */
export function isCourseComplete(
  course: Course,
  progressState: CourseProgressState
): boolean {

  if (!progressState.completedAt) return false;

  const totalLessons = course.modules.reduce(
    (sum, module) => sum + module.lessons.length,
    0
  );

  return progressState.completedLessons.length === totalLessons;
}

/**
 * Course completion %
 */
export function getCourseCompletionPercentage(
  course: Course,
  progressState: CourseProgressState
): number {

  const totalSeconds = calculateTotalAudioDuration(course);

  if (totalSeconds === 0) return 0;

  return (progressState.audioDurationCompleted / totalSeconds) * 100;
}

/**
 * Total audio duration
 */
export function calculateTotalAudioDuration(course: Course): number {

  return course.modules.reduce((moduleSum, module) => {

    const moduleDuration = module.lessons.reduce((lessonSum, lesson) => {

      if (lesson.type === "video" || lesson.type === "reading") {
        return lessonSum + parseDurationToSeconds(lesson.duration);
      }

      return lessonSum;

    }, 0);

    return moduleSum + moduleDuration;

  }, 0);
}

/**
 * Parse duration string
 */
export function parseDurationToSeconds(duration: string): number {

  const timeMatch = duration.match(/(\d+):(\d+)(?::(\d+))?/);

  if (timeMatch) {

    const hours = timeMatch[3] ? parseInt(timeMatch[1]) : 0;
    const minutes = timeMatch[3] ? parseInt(timeMatch[2]) : parseInt(timeMatch[1]);
    const seconds = timeMatch[3] ? parseInt(timeMatch[3]) : parseInt(timeMatch[2]);

    return hours * 3600 + minutes * 60 + seconds;
  }

  const secondsMatch = duration.match(/(\d+)\s*seconds?/);
  if (secondsMatch) return parseInt(secondsMatch[1]);

  const minutesMatch = duration.match(/(\d+)\s*minutes?/);
  if (minutesMatch) return parseInt(minutesMatch[1]) * 60;

  return 0;
}

/**
 * Next lesson
 */
export function getNextLesson(
  course: Course,
  moduleIndex: number,
  lessonIndex: number
): Lesson | null {

  const module = course.modules[moduleIndex];
  if (!module) return null;

  const nextLesson = module.lessons[lessonIndex + 1];
  if (nextLesson) return nextLesson;

  const nextModule = course.modules[moduleIndex + 1];
  return nextModule?.lessons[0] || null;
}

/**
 * Previous lesson
 */
export function getPreviousLesson(
  course: Course,
  moduleIndex: number,
  lessonIndex: number
): Lesson | null {

  const module = course.modules[moduleIndex];
  if (!module) return null;

  if (lessonIndex > 0) {
    return module.lessons[lessonIndex - 1];
  }

  if (moduleIndex > 0) {
    const previousModule = course.modules[moduleIndex - 1];
    return previousModule?.lessons[previousModule.lessons.length - 1] || null;
  }

  return null;
}

/**
 * All lessons in sequence
 */
export function getAllLessonsInSequence(course: Course): Lesson[] {
  return course.modules.flatMap(module => module.lessons);
}

/**
 * Can user access lesson
 */
export function canAccessLesson(
  course: Course,
  moduleIndex: number,
  lessonIndex: number,
  progressState: CourseProgressState
): boolean {

  const previousLessons = course.modules
    .slice(0, moduleIndex)
    .flatMap(m => m.lessons)
    .concat(course.modules[moduleIndex].lessons.slice(0, lessonIndex));

  return previousLessons.every(lesson =>
    progressState.completedLessons.includes(lesson.id)
  );
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
  canAccessLesson
};