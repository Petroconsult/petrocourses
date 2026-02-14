import { handlePaymentForProduct } from '@/orchestrators/payment.orchestrator'
import { log, error } from '@/lib/logger'

/**
 * Create payment for a product - initiates payment workflow
 */
export const createPayment = async (userId: string, productId: string) => {
  try {
    log('payment.domain.create.start', { userId, productId })
    
    const paymentResult = await handlePaymentForProduct(userId, productId)
    
    log('payment.domain.created', { 
      userId, 
      productId, 
      transactionId: paymentResult.transactionId,
      status: paymentResult.status
    })
    
    return { 
      success: true, 
      transactionId: paymentResult.transactionId,
      status: paymentResult.status
    }
  } catch (err) {
    error('payment.domain.create.failed', {
      userId,
      productId,
      error: err instanceof Error ? err.message : 'Unknown error',
    })
    throw err
  }
}

/**
 * Handle payment webhook - processes payment events
 */
export const handleWebhook = async (payload: unknown) => {
  try {
    log('payment.webhook.received', { payloadType: typeof payload })
    // Webhook processing logic - validate signature, update payment status, etc.
    return { success: true }
  } catch (err) {
    error('payment.webhook.failed', {
      error: err instanceof Error ? err.message : 'Unknown error',
    })
    throw err
  }
}
