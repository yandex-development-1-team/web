export interface IEmployeeFormData {
  photo: File | null

  personalInfo: {
    surname: string
    firstName: string
    patronymic: string
  }

  passportData: {
    citizenship: string
    birthDate: string
    gender: 'male' | 'female' | null
    passportSeries: string
    passportNumber: string
  }

  contactInfo: {
    phone: string
    email: string
  }

  jobInfo: {
    departmentId: number | null
    position: string
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
