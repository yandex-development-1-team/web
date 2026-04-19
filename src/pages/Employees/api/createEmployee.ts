import type { CreateEmployeeData, IEmployee } from '../employees.types'
import { EMPLOYEES } from '../mockData'
import mockPhoto from '@/mockData/mock_photo.jpg'

export const createEmployee = async (data: CreateEmployeeData): Promise<IEmployee> => {
  const newId = Date.now()
  const now = new Date().toISOString()

  const newEmployee: IEmployee = {
    id: newId,
    avatar: data.avatar || mockPhoto,
    personal_info: data.personal_info,
    contacts: data.contacts,
    job_info: data.job_info,
    access_level: data.access_level || 'Ограниченный доступ',
    status: data.status || 'active',
    created_at: now,
    updated_at: now
  }

  EMPLOYEES.push(newEmployee)

  return newEmployee
}
