import { describe, it, expect, vi } from 'vitest'
import * as paymentOrch from '@/orchestrators/payment.orchestrator'
import * as enrollOrch from '@/orchestrators/enrollment.orchestrator'
import * as certOrch from '@/orchestrators/certification.orchestrator'
import * as paymentService from '@/modules/payments/payment.service'
import * as enrollmentRepo from '@/domains/enrollment/enrollment.repo'
import * as certificateRepo from '@/domains/certification/certificate.repo'

describe('Orchestrators', () => {
  it('handles payment -> enrollment -> certification flow', async () => {
    // Spy on payment service methods
    const svc = new paymentService.PaymentService()
    const initSpy = vi.spyOn(paymentService.PaymentService.prototype, 'initiatePayment').mockResolvedValue({ id: 'txn_1', amount: 100, status: 'pending' } as any)
    const procSpy = vi.spyOn(paymentService.PaymentService.prototype, 'processPayment').mockResolvedValue({ id: 'txn_1', status: 'completed' } as any)

    const saveEnrollSpy = vi.spyOn(enrollmentRepo, 'saveEnrollment').mockImplementation(async (e: any) => e)
    const saveCertSpy = vi.spyOn(certificateRepo, 'saveCertificate').mockImplementation(async (c: any) => c)

    const pay = await paymentOrch.handlePaymentForProduct('user1', 'prod1')
    expect(pay.status).toBe('completed')

    const enroll = await enrollOrch.enrollUserToPathway('user1', 'path1')
    expect(saveEnrollSpy).toHaveBeenCalled()

    const cert = await certOrch.orchestrateCertification('user1', 'path1')
    expect(saveCertSpy).toHaveBeenCalled()

    initSpy.mockRestore()
    procSpy.mockRestore()
  })
})
