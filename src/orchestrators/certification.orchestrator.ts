import { log, error } from '@/lib/logger'
import { saveCertificate } from '@/domains/certification/certificate.repo'
import { evaluatePolicy } from '@/modules/certification/policy.evaluator'

export const orchestrateCertification = async (userId: string, pathwayId: string) => {
  log('certification.orchestrator.start', { userId, pathwayId })

  // Evaluate policy to determine issuance
  const evaluation = await evaluatePolicy({ userId, pathwayId })
  log('certification.policy.evaluated', { userId, pathwayId, evaluation })

  if (!evaluation.grant) {
    error('certification.denied', { userId, pathwayId, reason: evaluation.reason })
    throw new Error('Certification policy denied issuance')
  }

  const cert = {
    id: `cert_${Date.now()}`,
    userId,
    issuedAt: new Date().toISOString(),
    expiresAt: null,
  }

  const saved = await saveCertificate(cert as any)
  log('certificate.issued', { id: saved.id, userId })
  return saved
}
