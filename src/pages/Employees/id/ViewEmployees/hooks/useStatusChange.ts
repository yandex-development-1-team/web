import { updateEmployeeStatus } from '@/pages/Employees/api/updateEmployeeStatus'
import type { StatusType } from '@/pages/Employees/employees.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const NEXT_STATUS: Record<StatusType, StatusType> = {
  active: 'inactive',
  inactive: 'active'
}

export const useStatusChange = ({
  employeeId,
  queryKey,
  status
}: {
  employeeId: string
  queryKey: unknown[]
  status: StatusType
}) => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (nextStatus: StatusType) => updateEmployeeStatus({ employeeId, status: nextStatus }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey })
    }
  })

  const toggleStatus = () => mutation.mutate(NEXT_STATUS[status])

  return {
    isStatusUpdating: mutation.isPending,
    toggleStatus
  }
}
