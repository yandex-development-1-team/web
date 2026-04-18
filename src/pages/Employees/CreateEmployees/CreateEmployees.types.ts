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
    department: string
    position: string
    chief: string
  }

  accessLevel: {
    roleId: number | null
  }
}

export interface IRole {
  id: number
  name: string
  description: string
  accessType: 'full' | 'limited'
}
