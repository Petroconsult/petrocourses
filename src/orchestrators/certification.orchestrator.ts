import { log, error } from '@/lib/logger'
import { saveCertificate } from '@/domains/certification/certificate.repo'
import {
  checkCertificateEligibility,
  shouldAutoIssueCertificate,
  areAllQuizzesAttempted,
  formatCertificateData,
  generateCertificateContent,
} from '@/domains/certification/certificate-eligibility'
import type {
  CourseProgress,
  CertificateInfo,
  Course,
} from '@/types/course'

/**
 * Orchestrate Certificate Issuance
 * 
 * Rules:
 * - Certificate issued when audio completion reaches 100%
 * - NOT based on quiz scores (quizzes are self-assessed)
 * - Auto-issued upon reaching end of audio/section
 */
export const orchestrateCertification = async (
  userId: string,
  course: Course,
  courseProgress: CourseProgress
): Promise<CertificateInfo> => {
  const courseId = course.id
  log('certification.orchestrator.start', { userId, courseId })

  try {
    // Check eligibility based on AUDIO COMPLETION ONLY
    const eligibility = checkCertificateEligibility(
      userId,
      courseId,
      courseProgress.audioCompletedSeconds,
      courseProgress.audioTotalSeconds,
      courseProgress.completedAt
    )

    log('certificate.eligibility.checked', {
      userId,
      courseId,
      isEligible: eligibility.isEligible,
      audioCompletion: `${Math.round(eligibility.audioCompletionPercentage)}%`,
    })

    // If not eligible, return early
    if (!eligibility.isEligible) {
      log('certificate.not_eligible', {
        userId,
        courseId,
        reason: eligibility.reason,
      })
      throw new Error(eligibility.reason)
    }

    // Verify mandatory quizzes were attempted (but not graded)
    const allQuizzesAttempted = areAllQuizzesAttempted(
      course,
      courseProgress.quizAttempts
    )

    if (!allQuizzesAttempted) {
      log('certificate.quizzes_not_attempted', { userId, courseId })
      throw new Error('All mandatory quizzes must be attempted before certificate issuance')
    }

    // Check if should auto-issue
    const shouldIssue = shouldAutoIssueCertificate(
      course,
      courseProgress.audioCompletedSeconds,
      courseProgress.audioTotalSeconds,
      allQuizzesAttempted
    )

    if (!shouldIssue) {
      log('certificate.auto_issue_deferred', { userId, courseId })
      throw new Error('Course not fully completed yet')
    }

    // Format certificate data
    const certificate = formatCertificateData(
      userId,
      courseId,
      eligibility.audioCompletionPercentage,
      eligibility.completedAt!
    )

    // Generate certificate content
    const content = generateCertificateContent(
      course,
      userId,
      eligibility.completedAt!,
      eligibility.audioCompletionPercentage
    )

    // Persist certificate
    const savedCert = await saveCertificate({
      ...certificate,
      courseName: course.title,
      instructorName: course.instructor,
      ...content,
    } as any)

    log('certificate.issued', {
      id: savedCert.id,
      userId,
      courseId,
      audioCompletion: `${Math.round(eligibility.audioCompletionPercentage)}%`,
    })

    return savedCert
  } catch (err) {
    error('certification.orchestration.failed', {
      userId,
      courseId,
      error: err instanceof Error ? err.message : 'Unknown error',
    })
    throw err
  }
}

/**
 * Legacy compatibility - orchestrate by pathway ID
 */
export const orchestrateCertificationByPathway = async (
  userId: string,
  pathwayId: string
) => {
  log('certification.orchestrator.by_pathway.start', { userId, pathwayId })

  try {
    // This would look up the pathway and its associated course
    // For now, maintaining compatibility with existing code
    const cert = {
      id: `cert_${Date.now()}`,
      userId,
      issuedAt: new Date().toISOString(),
      expiresAt: null,
    }

    const saved = await saveCertificate(cert as any)
    log('certificate.issued.legacy', { id: saved.id, userId })
    return saved
  } catch (err) {
    error('certification.legacy.failed', {
      userId,
      pathwayId,
      error: err instanceof Error ? err.message : 'Unknown error',
    })
    throw err
  }
}

/**
 * Check if certificate should be auto-issued
 * Called when user completes audio section
 */
export const checkAndIssueCertificateAuto = async (
  userId: string,
  course: Course,
  courseProgress: CourseProgress
): Promise<{ issued: boolean; certificateId?: string; message: string }> => {
  try {
    const eligibility = checkCertificateEligibility(
      userId,
      course.id,
      courseProgress.audioCompletedSeconds,
      courseProgress.audioTotalSeconds,
      courseProgress.completedAt
    )

    if (!eligibility.isEligible) {
      return {
        issued: false,
        message: `${Math.round(eligibility.audioCompletionPercentage)}% of audio completed. Certificate will be issued upon 100% completion.`,
      }
    }

    // Auto-issue certificate
    const certificate = await orchestrateCertification(userId, course, courseProgress)

    return {
      issued: true,
      certificateId: certificate.id,
      message: 'Certificate issued successfully!',
    }
  } catch (err) {
    return {
      issued: false,
      message: err instanceof Error ? err.message : 'Failed to issue certificate',
    }
  }
}

export default {
  orchestrateCertification,
  orchestrateCertificationByPathway,
  checkAndIssueCertificateAuto,
