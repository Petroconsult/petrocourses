import type { Enrollment } from './enrollment.model'

export const findEnrollment = async (id: string): Promise<Enrollment | null> => null

export const saveEnrollment = async (e: Enrollment): Promise<Enrollment> => e
