import { api } from '@/app/providers/axios'
import type { StatusType } from '../employees.types'

export const updateEmployeeStatus = async ({ employeeId, status }: { employeeId: string; status: StatusType }) => {
  const response = await api.patch(`/emloyee/${employeeId}`, status)

  return response.status
}
