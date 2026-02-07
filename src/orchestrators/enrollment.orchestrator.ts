import { saveEnrollment, findEnrollment } from '@/domains/enrollment/enrollment.repo'
import { log, error } from '@/lib/logger'
import {
  progressToNextLesson,
  calculateTotalAudioDuration,
  canAccessLesson,
} from '@/domains/training/course-progression'
import type { Course, CourseProgress } from '@/types/course'

/**
 * Enroll User to Course
 * Initializes course progress with first lesson
 */
export const enrollUserToCourse = async (
  userId: string,
  courseId: string,
  course: Course
) => {
  log('enrollment.orchestrator.course.start', { userId, courseId })

  // Check if already enrolled
  let existing = null
  try {
    existing = await findEnrollment(`${userId}:${courseId}`)
  } catch (err) {
    // repo may not support lookup
  }

  if (existing) {
    log('enrollment.course.exists', { userId, courseId })
    return existing
  }

  // Calculate total audio duration for the course
  const totalAudioDuration = calculateTotalAudioDuration(course)

  // Initialize course progress - start at first lesson
  const courseProgress: CourseProgress = {
    userId,
    courseId,
    currentModuleIndex: 0,
    currentLessonIndex: 0,
    completedLessons: [],
    audioCompletedSeconds: 0,
    audioTotalSeconds: totalAudioDuration,
    quizAttempts: [],
    enrolledAt: new Date(),
    completionPercentage: 0,
  }

  const enrollment = {
    id: `${userId}:${courseId}`,
    userId,
    courseId,
    enrolledAt: new Date().toISOString(),
    progress: courseProgress,
  }

  const saved = await saveEnrollment(enrollment as any)
  log('enrollment.course.saved', {
    id: saved.id,
    userId,
    courseId,
    totalAudioDuration,
  })
  return saved
}

/**
 * Legacy pathway enrollment - maintained for compatibility
 */
export const enrollUserToPathway = async (userId: string, pathwayId: string) => {
  log('enrollment.orchestrator.pathway.start', { userId, pathwayId })

  // Idempotency: try to find an enrollment
  let existing = null
  try {
    existing = await findEnrollment(`${userId}:${pathwayId}`)
  } catch (err) {
    // ignore - repo stub may not support this lookup
  }

  if (existing) {
    log('enrollment.pathway.exists', { userId, pathwayId })
    return existing
  }

  const enrollment = {
    id: `${userId}:${pathwayId}`,
    userId,
    pathwayId,
    enrolledAt: new Date().toISOString(),
  }

  const saved = await saveEnrollment(enrollment as any)
  log('enrollment.pathway.saved', { id: saved.id })
  return saved
}

/**
 * Update course progress when user accesses a lesson
 * Validates strict sequencing rules
 */
export const recordLessonAccess = async (
  userId: string,
  course: Course,
  courseProgress: CourseProgress,
  moduleIndex: number,
  lessonIndex: number
) => {
  log('enrollment.lesson.access.start', {
    userId,
    courseId: course.id,
    moduleIndex,
    lessonIndex,
  })

  try {
    // Check if user can access this lesson
    const canAccess = canAccessLesson(
      course,
      moduleIndex,
      lessonIndex,
      courseProgress
    )

    if (!canAccess) {
      error('enrollment.lesson.access.denied', {
        userId,
        courseId: course.id,
        reason: 'Strict sequence enforced - previous lessons must be completed',
      })
      throw new Error('Cannot access this lesson. Complete previous lessons in order.')
    }

    // Update progress to current lesson
    const updatedProgress: CourseProgress = {
      ...courseProgress,
      currentModuleIndex: moduleIndex,
      currentLessonIndex: lessonIndex,
      startedAt: courseProgress.startedAt || new Date(),
    }

    log('enrollment.lesson.access.granted', {
      userId,
      courseId: course.id,
      currentLesson: `${moduleIndex}-${lessonIndex}`,
    })

    return updatedProgress
  } catch (err) {
    error('enrollment.lesson.access.failed', {
      userId,
      courseId: course.id,
      error: err instanceof Error ? err.message : 'Unknown error',
    })
    throw err
  }
}

/**
 * Record audio progress update
 * Tracks how much audio user has played in current lesson
 */
export const recordAudioProgress = async (
  userId: string,
  courseId: string,
  courseProgress: CourseProgress,
  audioPlayedSeconds: number
) => {
  const course = courseProgress // Would be fetched in real impl

  return {
    ...courseProgress,
    audioCompletedSeconds: audioPlayedSeconds,
    completionPercentage: (audioPlayedSeconds / courseProgress.audioTotalSeconds) * 100,
  }
}

/**
 * Progress to next lesson
 * Enforces all business rules:
 * 1. Audio must be 100% complete
 * 2. Mandatory quizzes must be attempted
 * 3. No retakes allowed
 */
export const progressToNextLessonOrchestrated = async (
  userId: string,
  course: Course,
  courseProgress: CourseProgress
) => {
  log('enrollment.progress.next_lesson.start', {
    userId,
    courseId: course.id,
  })

  try {
    // Use course progression domain logic
    const updatedProgress = progressToNextLesson(course, courseProgress)

    log('enrollment.progress.next_lesson.success', {
      userId,
      courseId: course.id,
      newModuleIndex: updatedProgress.currentModuleIndex,
      newLessonIndex: updatedProgress.currentLessonIndex,
    })

    return updatedProgress
  } catch (err) {
    error('enrollment.progress.next_lesson.failed', {
      userId,
      courseId: course.id,
      error: err instanceof Error ? err.message : 'Unknown error',
    })
    throw err
  }
}

export default {
  enrollUserToCourse,
  enrollUserToPathway,
  recordLessonAccess,
  recordAudioProgress,
  progressToNextLessonOrchestrated,
