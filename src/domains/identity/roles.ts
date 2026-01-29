export const Roles = {
  Admin: 'admin',
  Instructor: 'instructor',
  Student: 'student',
} as const

export type Role = (typeof Roles)[keyof typeof Roles]
