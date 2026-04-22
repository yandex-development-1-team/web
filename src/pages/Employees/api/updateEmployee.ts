import { EMPLOYEES } from '../mockData'
import type { IEmployee } from '../employees.types'

export const updateEmployee = async (employeeId: string, updatedData: Partial<IEmployee>) => {
  const index = EMPLOYEES.findIndex(emp => emp.id.toString() === employeeId)
  if (index === -1) throw new Error('Employee not found')

  EMPLOYEES[index] = {
    ...EMPLOYEES[index],
    ...updatedData,
    updated_at: new Date().toISOString()
  }

  return EMPLOYEES[index]
}
