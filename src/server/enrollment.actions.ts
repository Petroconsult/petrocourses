'use server'
import { enrollUserToPathway } from '@/orchestrators/enrollment.orchestrator'
import { log, error } from '@/lib/logger'

export const enroll = async (userId: string, pathwayId: string) => {
  try {
    log('enrollment.action.start', { userId, pathwayId })
    const enrollment = await enrollUserToPathway(userId, pathwayId)
    log('enrollment.action.success', { enrollmentId: enrollment.id })
    return { success: true, enrollmentId: enrollment.id }
  } catch (err) {
    error('enrollment.action.failed', {
      userId,
      pathwayId,
      error: err instanceof Error ? err.message : 'Unknown error',
    })
    return { success: false, error: err instanceof Error ? err.message : 'Enrollment failed' }
  }
}
