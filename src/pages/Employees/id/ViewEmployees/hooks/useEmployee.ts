import { getEmployeeById } from '@/pages/Employees/api/getEmployeeById'
import { updateEmployeeStatus } from '@/pages/Employees/api/updateEmployeeStatus'
import type { StatusType } from '@/pages/Employees/employees.types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const NEXT_STATUS: Record<StatusType, StatusType> = {
  active: 'inactive',
  inactive: 'active'
}

export const useEmployee = (employeeId: string) => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['employee', employeeId],
    queryFn: () => getEmployeeById(employeeId),
    enabled: !!employeeId
  })

  const mutation = useMutation({
    mutationFn: (status: StatusType) => updateEmployeeStatus({ employeeId, status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employee', employeeId] })
    }
  })

  const toggleStatus = () => {
    if (query.data?.status) mutation.mutate(NEXT_STATUS[query.data.status])
  }

  return {
    employee: query.data,
    isPending: query.isPending,
    error: query.error,
    isUpdatingStatus: mutation.isPending,
    toggleStatus
  }
}
