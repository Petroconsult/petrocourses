/**
 * Certification Domain Logic
 * 
 * Certificate Eligibility Rules:
 * - Certificate issued when audio completion reaches 100%
 * - NOT based on quiz pass/fail (quizzes are non-graded)
 * - Based solely on audio duration completion
 * - Auto-issue upon reaching end of section/audio
 */

import type { Course } from '@/types/course';

export interface CertificateEligibility {
  userId: string;
  courseId: string;
  isEligible: boolean;
  audioCompletionPercentage: number;
  audioCompletedSeconds: number;
  audioTotalSeconds: number;
  completedAt?: Date;
  reason: string;
}

export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  issuedAt: Date;
  completionDate: Date;
  audioCompletionPercentage: number;
  certificateUrl?: string;
}

/**
 * Check if user is eligible for certificate
 * Rule: Audio completion must be 100%
 * 
 * Note: Quizzes are mandatory but do NOT affect eligibility
 * Quizzes are self-assessed and show solutions only
 */
export function checkCertificateEligibility(
  userId: string,
  courseId: string,
  audioDurationCompleted: number,
  audioTotalDuration: number,
  completedAt?: Date
): CertificateEligibility {
  const completionPercentage = (audioDurationCompleted / audioTotalDuration) * 100;
  const isEligible = completionPercentage >= 100 && completedAt !== undefined;

  return {
    userId,
    courseId,
    isEligible,
    audioCompletionPercentage: Math.min(completionPercentage, 100),
    audioCompletedSeconds: audioDurationCompleted,
    audioTotalSeconds: audioTotalDuration,
    completedAt: isEligible ? completedAt : undefined,
    reason: isEligible
      ? 'Audio duration completed - certificate eligible'
      : `Audio completion: ${Math.round(completionPercentage)}% (requires 100%)`,
  };
}

/**
 * Check if certificate should auto-issue
 * Triggers when user finishes final audio section
 * 
 * Criteria:
 * - All audio sections completed (100%)
 * - All mandatory quizzes attempted (but not failed, since no pass/fail)
 * - Completion timestamp set
 */
export function shouldAutoIssueCertificate(
  course: Course,
  audioCompletedSeconds: number,
  audioTotalDuration: number,
  allQuizzesAttempted: boolean
): boolean {
  const audioComplete = audioCompletedSeconds >= audioTotalDuration;
  
  // Quizzes are mandatory but don't affect eligibility
  // Just verify they were attempted
  const quizzesHandled = allQuizzesAttempted || !hasAnyQuizzes(course);

  return audioComplete && quizzesHandled;
}

/**
 * Check if course has any quiz lessons
 */
function hasAnyQuizzes(course: Course): boolean {
  return course.modules.some((module) =>
    module.lessons.some((lesson) => lesson.type === 'quiz')
  );
}

/**
 * Get all mandatory quizzes in course
 * Quizzes are required but score doesn't matter
 */
export function getMandatoryQuizzesInCourse(course: Course): {
  lessonId: string;
  position: number;
}[] {
  const quizzes: { lessonId: string; position: number }[] = [];
  let position = 0;

  course.modules.forEach((module) => {
    module.lessons.forEach((lesson) => {
      if (lesson.type === 'quiz') {
        quizzes.push({
          lessonId: lesson.id,
          position,
        });
      }
      position++;
    });
  });

  return quizzes;
}

/**
 * Check if all mandatory quizzes have been attempted
 */
export function areAllQuizzesAttempted(
  course: Course,
  attemptedQuizIds: string[]
): boolean {
  const mandatoryQuizzes = getMandatoryQuizzesInCourse(course);
  
  if (mandatoryQuizzes.length === 0) return true;

  return mandatoryQuizzes.every((quiz) =>
    attemptedQuizIds.includes(quiz.lessonId)
  );
}

/**
 * Calculate certificate completion date
 * When audio reaches 100%, certificate is immediately eligible
 */
export function getCertificateCompletionDate(
  audioCompletedSeconds: number,
  audioTotalDuration: number,
  currentDate: Date
): Date | undefined {
  if (audioCompletedSeconds >= audioTotalDuration) {
    return currentDate;
  }
  return undefined;
}

/**
 * Format certificate data for issuance
 */
export function formatCertificateData(
  userId: string,
  courseId: string,
  audioCompletionPercentage: number,
  completionDate: Date
): Certificate {
  return {
    id: generateCertificateId(userId, courseId),
    userId,
    courseId,
    issuedAt: new Date(),
    completionDate,
    audioCompletionPercentage: Math.min(audioCompletionPercentage, 100),
  };
}

/**
 * Generate unique certificate ID
 */
export function generateCertificateId(userId: string, courseId: string): string {
  const timestamp = Date.now();
  return `cert_${userId}_${courseId}_${timestamp}`;
}

/**
 * Validate quiz attempt before moving forward
 * Quizzes must be:
 * 1. Attempted before progressing past that section
 * 2. Taken only once (no retakes)
 * 3. Self-assessed (show solutions but no grading)
 */
export function validateQuizProgress(
  quizRequired: boolean,
  quizAttempted: boolean,
  canRetake: boolean = false
): { valid: boolean; reason: string } {
  if (!quizRequired) {
    return { valid: true, reason: 'No quiz required' };
  }

  if (!quizAttempted) {
    return { valid: false, reason: 'Quiz must be attempted before progressing' };
  }

  if (canRetake) {
    return { valid: false, reason: 'Quiz retakes are not allowed' };
  }

  return { valid: true, reason: 'Quiz completed - can progress' };
}

/**
 * Calculate certificate content/data
 * Based on course completion, not quiz scores
 */
export function generateCertificateContent(
  course: Course,
  userId: string,
  completionDate: Date,
  audioCompletionPercentage: number
): {
  title: string;
  subtitle: string;
  completionDate: string;
  audioCompletion: string;
  message: string;
} {
  return {
    title: `Certificate of Completion`,
    subtitle: `${course.title}`,
    completionDate: completionDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    audioCompletion: `${Math.round(audioCompletionPercentage)}% of course audio completed`,
    message: `This certificate acknowledges successful completion of all pre-recorded audio training materials in ${course.title}. The recipient has engaged with all course content and demonstrated commitment to professional development.`,
  };
}

export default {
  checkCertificateEligibility,
  shouldAutoIssueCertificate,
  getMandatoryQuizzesInCourse,
  areAllQuizzesAttempted,
  getCertificateCompletionDate,
  formatCertificateData,
  generateCertificateId,
  validateQuizProgress,
  generateCertificateContent,
};
