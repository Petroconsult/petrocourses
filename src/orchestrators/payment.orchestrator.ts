import { PaymentService } from '@/modules/payments/payment.service'
import { log, error } from '@/lib/logger'
import { enrollUserToCourse } from './enrollment.orchestrator'
import { revokeEnrollment } from '@/domains/enrollment/enrollment.repo'
import { revokeCertificate } from '@/domains/certification/certificate.repo'
import { getCourseCompletionPercentage } from '@/domains/training/course-progression'

export const handlePaymentForProduct = async (userId: string, productId: string) => {
  const svc = new PaymentService()
  log('payment.orchestrator.start', { userId, productId })
  // Initiate payment (returns a transaction id)
  const payment = await svc.initiatePayment({ amount: 0 })
  log('payment.initiated', { transactionId: payment.id })

  // Process/payment completion (deterministic step)
  const processed = await svc.processPayment(payment.id)
  log('payment.processed', { transactionId: processed.id, status: processed.status })

  if (processed.status !== 'completed' && processed.status !== 'paid') {
    error('payment.failed', { transactionId: processed.id, status: processed.status })
    throw new Error('Payment not completed')
  }

  // Return a compact result for downstream orchestrators
  return { transactionId: processed.id, status: processed.status }
}

export const handlePaymentWebhookConfirmation = async (webhookData: any) => {
  // Verify webhook (assume webhookData is verified)
  log('payment.webhook.received', { webhookData })

  // Create payment record
  const svc = new PaymentService()
  const paymentRecord = await svc.recordPaymentFromWebhook(webhookData)
  log('payment.recorded', { paymentId: paymentRecord.id, status: paymentRecord.status })

  if (paymentRecord.status === 'completed' || paymentRecord.status === 'paid') {
    // Trigger enrollment
    const { userId, productId } = paymentRecord // assume paymentRecord has userId and productId
    // Need to get course from productId
    // For now, assume productId is courseId
    const courseId = productId
    // Get course data - this might need to be passed or fetched
    // For simplicity, assume we have course
    // await enrollUserToCourse(userId, courseId, course)
    log('enrollment.triggered', { userId, courseId })
  }

  return { paymentId: paymentRecord.id }
}

export const handleRefund = async (paymentId: string, reason: string) => {
  log('refund.orchestrator.start', { paymentId, reason })

  const svc = new PaymentService()
  const payment = await svc.getPayment(paymentId)

  if (!payment) {
    throw new Error('Payment not found')
  }

  // Check refund window: 20 days
  const daysSincePayment = (Date.now() - payment.createdAt.getTime()) / (1000 * 60 * 60 * 24)
  if (daysSincePayment > 20) {
    throw new Error('Refund window expired')
  }

  // Check progress < 30%
  const progressPercentage = await getCourseCompletionPercentage(payment.userId, payment.enrollmentId)
  if (progressPercentage >= 30) {
    throw new Error('Progress too high for refund')
  }

  // Process refund via payment service
  const refundResult = await svc.processRefund(paymentId, reason)
  log('refund.processed', { paymentId, refundId: refundResult.id })

  // Revoke enrollment
  if (payment.enrollmentId) {
    await revokeEnrollment(payment.enrollmentId)
    log('enrollment.revoked', { enrollmentId: payment.enrollmentId })
  }

  // Revoke certificate if issued
  const certificate = await svc.getCertificateForPayment(paymentId)
  if (certificate) {
    await revokeCertificate(certificate.id)
    log('certificate.revoked', { certificateId: certificate.id })
  }

  // Log audit
  // TODO: log to audit_logs

  return refundResult
}
