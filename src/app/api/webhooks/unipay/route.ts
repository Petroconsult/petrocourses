// Consolidated webhook endpoint
import { handlePaymentWebhookConfirmation } from '@/orchestrators/payment.orchestrator'

export async function POST(request: Request) {
  try {
    const webhookData = await request.json()
    // Verify webhook signature here (implement based on unipay docs)

    await handlePaymentWebhookConfirmation(webhookData)

    return new Response("Webhook processed", { status: 200 })
  } catch (error) {
    console.error('Webhook error:', error)
    return new Response("Webhook error", { status: 500 })
  }
}
