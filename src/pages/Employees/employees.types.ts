export type PersonalInfoType = {
  last_name: string
  first_name: string
  second_name?: string
}

export type ContactsType = {
  phone: string
  email: string
  city: string
}

export type JobInfoType = {
  department: string
  position: string
  role: UserRole
  chief: string
}

export type StatusType = 'active' | 'inactive'

export interface IUser {
  id: number
  avatar: string
  personal_info: PersonalInfoType
  contacts: ContactsType
}

export interface IEmployee extends IUser {
  job_info: JobInfoType
  status: StatusType
  created_at: string
  updated_at: string
}

export type CreateEmployeeData = {
  avatar?: string
  personal_info: PersonalInfoType
  contacts: ContactsType
  job_info: JobInfoType
}

export type EmployeeForTable = {
  id: number
  name: string
  department: string
  chief: string
  position: string
  level: string
  phone: string
  email: string
  city: string
}

export const userRole = ['admin', 'manager_1', 'manager_2', 'manager_3', 'user'] as const
export type UserRole = (typeof userRole)[number]

export const userStatus = ['active', 'blocked', 'invited'] as const
export type UserStatus = (typeof userStatus)[number]

export interface User {
  id: number
  telegramNick?: string
  firstName?: string
  lastName?: string
  secondName?: string
  email?: string
  phoneNumber?: string
  role: UserRole
  status: UserStatus
  department?: string
  position?: string
  supervisor: string
  address: string
  createdAt: string
  updatedAt: string
}

export type UserListItem = Omit<User, 'updatedAt' | 'address'> & { fullName: string }

interface UserBookingItem {
  id: number
  eventId: number
  boxName?: string
  date?: string
  time?: string
  status?: string
}

interface UserVisitHistoryItem {
  boxName?: string
  visitedAt?: string
}

export interface UserWithDetails extends User {
  bookings?: UserBookingItem[]
  visitHistory?: UserVisitHistoryItem[]
  favoriteBoxes?: number[]
  image?: string
}
