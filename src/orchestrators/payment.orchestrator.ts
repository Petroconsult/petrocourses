import { PaymentService } from '@/modules/payments/payment.service'
import { log, error } from '@/lib/logger'

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
