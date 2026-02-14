'use server'
import { orchestrateCertificationByPathway } from '@/orchestrators/certification.orchestrator'
import { log, error } from '@/lib/logger'

export const requestCertificate = async (userId: string, pathwayId: string) => {
  try {
    log('certification.action.start', { userId, pathwayId })
    const certificate = await orchestrateCertificationByPathway(userId, pathwayId)
    log('certification.action.success', { certificateId: certificate.id })
    return { success: true, certificateId: certificate.id }
  } catch (err) {
    error('certification.action.failed', {
      userId,
      pathwayId,
      error: err instanceof Error ? err.message : 'Unknown error',
    })
    return { success: false, error: err instanceof Error ? err.message : 'Certificate request failed' }
  }
}
