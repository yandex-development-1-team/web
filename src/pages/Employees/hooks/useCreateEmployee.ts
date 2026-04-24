import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createEmployee } from '@/pages/Employees/api/createEmployee'
import type { CreateEmployeeData } from '@/pages/Employees/employees.types'

export const useCreateEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateEmployeeData) => createEmployee(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] })
    }
  })
}
