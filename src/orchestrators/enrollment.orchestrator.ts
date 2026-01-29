import { saveEnrollment, findEnrollment } from '@/domains/enrollment/enrollment.repo'
import { log, error } from '@/lib/logger'

export const enrollUserToPathway = async (userId: string, pathwayId: string) => {
  log('enrollment.orchestrator.start', { userId, pathwayId })

  // Idempotency: try to find an enrollment with deterministic id (simple heuristic)
  // Real implementation should query by userId+pathwayId
  let existing = null
  try {
    existing = await findEnrollment(`${userId}:${pathwayId}`)
  } catch (err) {
    // ignore - repo stub may not support this lookup
  }

  if (existing) {
    log('enrollment.exists', { userId, pathwayId })
    return existing
  }

  const enrollment = {
    id: `${userId}:${pathwayId}`,
    userId,
    pathwayId,
    enrolledAt: new Date().toISOString(),
  }

  const saved = await saveEnrollment(enrollment as any)
  log('enrollment.saved', { id: saved.id })
  return saved
}
