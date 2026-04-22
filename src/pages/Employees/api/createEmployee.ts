import type { CreateEmployeeData, IEmployee } from '../employees.types'
import { EMPLOYEES } from '../mockData'
import photoPlaceholder from '@/assets/images/photo_placeholder.jpg'

export const createEmployee = async (data: CreateEmployeeData): Promise<IEmployee> => {
  const getNextId = () => {
    const maxId = Math.max(...EMPLOYEES.map(e => e.id))
    return maxId + 1
  }

  const newId = getNextId()
  const now = new Date().toISOString()

  const newEmployee: IEmployee = {
    id: newId,
    avatar: data.avatar || photoPlaceholder,
    personal_info: data.personal_info,
    contacts: data.contacts,
    job_info: data.job_info,
    status: 'active',
    created_at: now,
    updated_at: now
  }

  EMPLOYEES.push(newEmployee)

  return newEmployee
}
