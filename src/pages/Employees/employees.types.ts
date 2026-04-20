export type PersonalInfoType = {
  last_name: string
  first_name: string
  middle_name?: string
}

export type ContactsType = {
  phone: string
  email: string
  city: string
}

export type JobInfoType = {
  department: string
  position: string
  role: string
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
  access_level: string
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
