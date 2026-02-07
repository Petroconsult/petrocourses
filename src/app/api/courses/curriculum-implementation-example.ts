/**
 * Example Implementation: Course Progress API
 * 
 * This example shows how to implement API endpoints for course progression
 * following all PetroCourses curriculum requirements.
 * 
 * Location: src/app/api/courses/[courseId]/progress/route.ts
 */

import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { getCurrentLessonProgress, progressToNextLesson } from '@/domains/training/course-progression'
import { recordAudioProgress, progressToNextLessonOrchestrated } from '@/orchestrators/enrollment.orchestrator'
import { checkAndIssueCertificateAuto } from '@/orchestrators/certification.orchestrator'
import type { CourseProgress } from '@/types/course'

/**
 * GET /api/courses/[courseId]/progress
 * 
 * Retrieve user's current progress in course
 * 
 * Returns:
 * - Current lesson info
 * - Audio completion %
 * - Quiz attempt status
 * - Certificate eligibility
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const courseId = params.courseId
    const userId = session.user.id

    // Fetch user's course progress from database
    const courseProgress = await fetchCourseProgress(userId, courseId)
    if (!courseProgress) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 })
    }

    // Fetch course details
    const course = await fetchCourse(courseId)
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    // Get current lesson state
    const lessonProgress = getCurrentLessonProgress(course, courseProgress)

    // Calculate completion percentage
    const completionPercentage =
      (courseProgress.audioCompletedSeconds / courseProgress.audioTotalSeconds) * 100

    return NextResponse.json({
      success: true,
      progress: {
        courseId,
        userId,
        currentModule: courseProgress.currentModuleIndex,
        currentLesson: courseProgress.currentLessonIndex,
        completedLessons: courseProgress.completedLessons.length,
        totalLessons: getTotalLessons(course),
        audioCompletedSeconds: courseProgress.audioCompletedSeconds,
        audioTotalSeconds: courseProgress.audioTotalSeconds,
        completionPercentage: Math.round(completionPercentage),
        lessonProgress: {
          lessonId: lessonProgress.lessonId,
          status: lessonProgress.status, // 'locked' | 'available' | 'in-progress' | 'completed'
          audioPlayedSeconds: lessonProgress.audioPlayedSeconds,
          audioDurationSeconds: lessonProgress.audioDurationSeconds,
          percentComplete: Math.round(lessonProgress.percentComplete),
          hasFollowingQuiz: lessonProgress.hasFollowingQuiz,
          quizAttempted: lessonProgress.quizAttempted,
        },
        enrolledAt: courseProgress.enrolledAt,
        startedAt: courseProgress.startedAt,
        completedAt: courseProgress.completedAt,
      },
    })
  } catch (error) {
    console.error('Error fetching progress:', error)
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/courses/[courseId]/progress
 * 
 * Update user's audio progress in current lesson
 * 
 * Request body:
 * {
 *   "audioPlayedSeconds": 150,      // Seconds watched
 *   "lessonId": "lesson-123",       // Current lesson
 * }
 * 
 * Business Rules:
 * - Auto-completes lesson when audio reaches 100%
 * - Triggers certificate check at course completion
 * - Updates in real-time as user watches
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const courseId = params.courseId
    const userId = session.user.id
    const body = await request.json()

    const { audioPlayedSeconds, lessonId } = body

    if (!audioPlayedSeconds || audioPlayedSeconds < 0) {
      return NextResponse.json(
        { error: 'Invalid audioPlayedSeconds' },
        { status: 400 }
      )
    }

    // Fetch current progress
    let courseProgress = await fetchCourseProgress(userId, courseId)
    if (!courseProgress) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 })
    }

    // Fetch course
    const course = await fetchCourse(courseId)
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    // Update audio progress
    const updatedProgress = await recordAudioProgress(
      userId,
      courseId,
      courseProgress,
      audioPlayedSeconds
    )

    // Save to database
    await saveCourseProgress(userId, courseId, updatedProgress)

    const audioComplete = audioPlayedSeconds >= updatedProgress.audioTotalSeconds

    // Check if lesson is fully completed
    if (audioComplete) {
      updatedProgress.completedLessons = [
        ...new Set([
          ...updatedProgress.completedLessons,
          lessonId,
        ]),
      ]
      await saveCourseProgress(userId, courseId, updatedProgress)

      // Check if entire course is complete
      const totalLessons = getTotalLessons(course)
      if (updatedProgress.completedLessons.length === totalLessons) {
        updatedProgress.completedAt = new Date()
        await saveCourseProgress(userId, courseId, updatedProgress)

        // Attempt auto-issuance of certificate
        const certResult = await checkAndIssueCertificateAuto(
          userId,
          course,
          updatedProgress
        )

        if (certResult.issued) {
          return NextResponse.json({
            success: true,
            lessonComplete: true,
            courseComplete: true,
            certificateIssued: true,
            certificateId: certResult.certificateId,
            message: certResult.message,
            progress: formatProgressResponse(updatedProgress, course),
          })
        }
      }
    }

    return NextResponse.json({
      success: true,
      lessonComplete: audioComplete,
      courseComplete: false,
      progress: formatProgressResponse(updatedProgress, course),
    })
  } catch (error) {
    console.error('Error updating progress:', error)
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/courses/[courseId]/progress/next-lesson
 * 
 * Attempt to progress to next lesson
 * 
 * Validates:
 * - Current lesson audio is 100% complete
 * - Mandatory quizzes have been attempted
 * - Strict sequence rules are followed
 * 
 * Returns error if any validation fails
 */
export async function POST_NextLesson(
  request: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const courseId = params.courseId
    const userId = session.user.id

    // Fetch current progress
    let courseProgress = await fetchCourseProgress(userId, courseId)
    if (!courseProgress) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 })
    }

    // Fetch course
    const course = await fetchCourse(courseId)
    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    // Attempt to progress (enforces all business rules)
    try {
      const nextProgress = await progressToNextLessonOrchestrated(
        userId,
        course,
        courseProgress
      )
      await saveCourseProgress(userId, courseId, nextProgress)

      return NextResponse.json({
        success: true,
        progress: formatProgressResponse(nextProgress, course),
        message: 'Progressed to next lesson',
      })
    } catch (err) {
      // One of the business rules failed
      const errorMessage =
        err instanceof Error ? err.message : 'Cannot progress'

      return NextResponse.json(
        {
          success: false,
          error: errorMessage,
          // Helpful hint about what's missing:
          canProgress: false,
          reason: getReason(errorMessage),
        },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Error progressing lesson:', error)
    return NextResponse.json(
      { error: 'Failed to progress' },
      { status: 500 }
    )
  }
}

/**
 * Helper: Format progress response
 */
function formatProgressResponse(progress: CourseProgress, course: any) {
  const completionPercentage =
    (progress.audioCompletedSeconds / progress.audioTotalSeconds) * 100

  return {
    courseId: progress.courseId,
    currentModule: progress.currentModuleIndex,
    currentLesson: progress.currentLessonIndex,
    audioCompletedSeconds: progress.audioCompletedSeconds,
    audioTotalSeconds: progress.audioTotalSeconds,
    completionPercentage: Math.round(completionPercentage),
    completedLessonsCount: progress.completedLessons.length,
    totalLessonsCount: getTotalLessons(course),
    quizzesAttempted: progress.quizAttempts.length,
  }
}

/**
 * Helper: Get reason why user can't progress
 */
function getReason(error: string): string {
  if (error.includes('Audio not fully completed')) {
    return 'Complete the lesson audio before progressing'
  }
  if (error.includes('Quiz must be completed')) {
    return 'Answer the quiz to progress'
  }
  if (error.includes('Retakes are not allowed')) {
    return 'Quiz retakes not permitted'
  }
  return error
}

/**
 * Helper: Get total lesson count in course
 */
function getTotalLessons(course: any): number {
  return course.modules.reduce((sum: number, module: any) => {
    return sum + module.lessons.length
  }, 0)
}

/**
 * Database stub functions - replace with real database calls
 */
async function fetchCourseProgress(
  userId: string,
  courseId: string
): Promise<CourseProgress | null> {
  // TODO: Query database for user's enrollment and progress
  return null
}

async function fetchCourse(courseId: string) {
  // TODO: Fetch course details from database
  return null
}

async function saveCourseProgress(
  userId: string,
  courseId: string,
  progress: CourseProgress
) {
  // TODO: Save progress to database
}

/**
 * Example Usage in Frontend Component:
 * 
 * ```tsx
 * // Track video playback
 * <video
 *   onTimeUpdate={(e) => {
 *     const currentTime = e.currentTarget.currentTime;
 *     // Send progress every 5 seconds
 *     if (currentTime % 5 < 0.1) {
 *       fetch(`/api/courses/${courseId}/progress`, {
 *         method: 'POST',
 *         body: JSON.stringify({
 *           audioPlayedSeconds: Math.floor(currentTime),
 *           lessonId,
 *         }),
 *       });
 *     }
 *   }}
 * />
 * 
 * // Progress to next
 * <button
 *   onClick={async () => {
 *     const res = await fetch(
 *       `/api/courses/${courseId}/progress/next-lesson`,
 *       { method: 'POST' }
 *     );
 *     if (res.ok) {
 *       // Move to next lesson
 *     } else {
 *       const err = await res.json();
 *       alert(err.error); // e.g., "Complete the lesson audio first"
 *     }
 *   }}
 * >
 *   Next Lesson
 * </button>
 * ```
 */
