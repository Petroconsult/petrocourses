import prisma from '@/lib/db/prisma'
import { log, error } from '@/lib/logger'
import type { Enrollment } from '@prisma/client'

/**
 * Initialize enrollment lifecycle - creates enrollment record
 */
export const startEnrollment = async (
  userId: string,
  levelId: string,
  enrollmentData?: { fullName?: string; email?: string; company?: string }
): Promise<Enrollment> => {
  try {
    log('enrollment.lifecycle.start', { userId, levelId })

    const enrollment = await prisma.enrollment.create({
      data: {
        userId,
        levelId,
        fullName: enrollmentData?.fullName || '',
        email: enrollmentData?.email || '',
        phone: enrollmentData?.email || '',
        company: enrollmentData?.company,
        experience: '0',
        startDate: new Date(),
        lifecycleState: 'APPROVED',
        status: 'APPROVED',
        paymentStatus: 'PAID',
      },
    })

    log('enrollment.lifecycle.started', { enrollmentId: enrollment.id })
    return enrollment
  } catch (err) {
    error('enrollment.lifecycle.start.failed', {
      userId,
      levelId,
      error: err instanceof Error ? err.message : 'Unknown error',
    })
    throw err
  }
}

/**
 * Mark enrollment as completed - finalizes enrollment lifecycle
 */
export const completeEnrollment = async (enrollmentId: string): Promise<Enrollment> => {
  try {
    log('enrollment.lifecycle.complete', { enrollmentId })

    const enrollment = await prisma.enrollment.update({
      where: { id: enrollmentId },
      data: {
        lifecycleState: 'COMPLETED',
        status: 'COMPLETED',
        updatedAt: new Date(),
      },
    })

    log('enrollment.lifecycle.completed', { enrollmentId: enrollment.id })
    return enrollment
  } catch (err) {
    error('enrollment.lifecycle.complete.failed', {
      enrollmentId,
      error: err instanceof Error ? err.message : 'Unknown error',
    })
    throw err
  }
}
