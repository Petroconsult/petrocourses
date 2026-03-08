import type { Enrollment } from './enrollment.model'

export const findEnrollment = async (id: string): Promise<Enrollment | null> => null

export const saveEnrollment = async (e: Enrollment): Promise<Enrollment> => e

export const revokeEnrollment = async (id: string): Promise<void> => {
  // Revoke enrollment logic
  // In a real implementation, this would update the database
  console.log(`Enrollment ${id} revoked`)
}
