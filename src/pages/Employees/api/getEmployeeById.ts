import { EMPLOYEES } from '../mockData'

export const getEmployeeById = async (employeeId: string) => {
  //   const response = await api.get<IEmployee>(`/employee/${eployeeId}`)

  //   if (!response.data) throw new Error('Failed to get employee')

  //   return response.data
  return EMPLOYEES.find(employee => employee.id.toString() === employeeId)
}
