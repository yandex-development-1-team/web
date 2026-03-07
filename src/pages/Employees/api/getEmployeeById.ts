import { EMPLOYEES } from '@/mockData/mock_view_employees'

export const getEmployeeById = async (employeeId: string) => {
  //   const response = await api.get<IEmployee>(`/employee/${eployeeId}`)

  //   if (!response.data) throw new Error('Faild to get employee')

  //   return response.data
  return EMPLOYEES[Number(employeeId)]
}
