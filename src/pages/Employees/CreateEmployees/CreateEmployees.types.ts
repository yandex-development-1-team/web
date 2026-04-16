export interface IEmployeeFormData {
  photo: File | null

  personalInfo: {
    surname: string
    firstName: string
    patronymic: string
  }

  contactInfo: {
    phone: string
    email: string
    city: string
  }

  jobInfo: {
    departmentId: number | null
    position: string
    chief: string
  }

  accessLevel: {
    roleId: number | null
  }
}

export interface IDepartment {
  id: number
  name: string
}

export interface IRole {
  id: number
  name: string
  description: string
  accessType: 'full' | 'limited'
}
