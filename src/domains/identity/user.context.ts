export type UserContext = {
  id: string
  email?: string
  roles?: string[]
}

export const getCurrentUser = (): UserContext | null => null
