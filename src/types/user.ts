export type UserRole = 'manager' | 'admin'

export interface IUser {
  role: UserRole
  name: string
  photo?: string
  grade?: number
}
