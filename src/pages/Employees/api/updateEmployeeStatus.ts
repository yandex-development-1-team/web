import { api } from '@/app/providers/axios'
import type { StatusType } from '../employees.types'
import { API_ROUTES } from '@/services/api/routes'

export const updateEmployeeStatus = async ({ employeeId, status }: { employeeId: string; status: StatusType }) => {
  const response = await api.patch(API_ROUTES.employees(employeeId), status)
  return response.data
}
