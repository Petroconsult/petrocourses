import prisma from '@/lib/db/prisma'
import { log, error } from '@/lib/logger'
import type { Certificate } from '@prisma/client'

/**
 * Issue certificate to user - persists certificate record
 */
export const issueCertificate = async (
  userId: string,
  levelId: string,
  enrollmentId?: string,
  metadata?: Record<string, any>
): Promise<Certificate> => {
  try {
    log('certification.engine.issue.start', { userId, levelId, enrollmentId })

    // Generate unique serial number
    const serial = `CERT-${Date.now()}-${Math.random().toString(36).substring(7)}`

    const certificate = await prisma.certificate.create({
      data: {
        serial,
        userId,
        levelId,
        enrollmentId: enrollmentId || undefined,
        issuedAt: new Date(),
        metadata: metadata || {},
      },
    })

    log('certification.engine.issued', { certificateId: certificate.id, serial })
    return certificate
  } catch (err) {
    error('certification.engine.issue.failed', {
      userId,
      levelId,
      error: err instanceof Error ? err.message : 'Unknown error',
    })
    throw err
  }
}

/**
 * Verify certificate authenticity - checks if certificate exists and is valid
 */
export const verifyCertificate = async (certificateId: string): Promise<Certificate | null> => {
  try {
    log('certification.engine.verify.start', { certificateId })

    const certificate = await prisma.certificate.findUnique({
      where: { id: certificateId },
    })

    if (!certificate) {
      log('certification.engine.verify.not_found', { certificateId })
      return null
    }

    log('certification.engine.verify.success', { certificateId, serial: certificate.serial })
    return certificate
  } catch (err) {
    error('certification.engine.verify.failed', {
      certificateId,
      error: err instanceof Error ? err.message : 'Unknown error',
    })
    throw err
  }
}
