import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateEmployee } from '@/pages/Employees/api/updateEmployee'
import type { IEmployee } from '@/pages/Employees/employees.types'

export const useUpdateEmployee = (employeeId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Partial<IEmployee>) => updateEmployee(employeeId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employee', employeeId] })
      queryClient.invalidateQueries({ queryKey: ['employees'] })
    }
  })
}
