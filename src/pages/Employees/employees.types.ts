type PersonalInfoType = {
  last_name: string
  first_name: string
  middle_name?: string
}

type PasportType = {
  citizenship: string
  birthday: string
  gender: string
  series: string
  number: string
}

type ContactsType = {
  phone: string
  email: string
  telegram_nick?: string
}

type JobInfoType = {
  department: string
  position: string
  role: string
  chief: PersonalInfoType
}

type AdditionalType = {
  city: string
}

export type StatusType = 'active' | 'inactive'

export interface IUser {
  id: number
  avatar: string
  personal_info: PersonalInfoType
  passport: PasportType
  contacts: ContactsType
}

export interface IEmployee extends IUser {
  job_info: JobInfoType
  additional: AdditionalType
  access_level: string
  status: StatusType
  created_at: string
  updated_at: string
}
