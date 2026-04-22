import { employeeToTableFormat } from '../helpers'
import { EMPLOYEES } from '../mockData'
import type { EmployeeForTable } from '../employees.types'

export const getEmployees = async (): Promise<EmployeeForTable[]> => {
  return EMPLOYEES.map(employeeToTableFormat)
}
