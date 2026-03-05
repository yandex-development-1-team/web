interface IPersonalInfo {
  last_name: string
  first_name: string
  middle_name?: string
}

export type StatusType = 'active' | 'inactive'

export interface IUser {
  id: number
  avatar: string
  personal_info: IPersonalInfo
  passport: {
    citizenship: string
    birthday: string
    gender: string
    series: string
    number: string
  }
  contacts: {
    phone: string
    email: string
    telegram_nick?: string
  }
}

export interface IEmployee extends IUser {
  job_info: {
    department: string
    position: string
    role: string
    chief: IPersonalInfo
  }
  additional: {
    city: string
  }
  access_level: string
  status: StatusType
  created_at: string
  updated_at: string
}
