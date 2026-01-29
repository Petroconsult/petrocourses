export type CertificationEvent =
  | { type: 'CERT_ISSUED'; payload: { certificateId: string; userId: string } }
  | { type: 'CERT_REVOKED'; payload: { certificateId: string; reason?: string } }

export const emitEvent = (e: CertificationEvent) => {
  // placeholder
}
