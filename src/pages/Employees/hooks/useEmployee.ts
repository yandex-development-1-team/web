import { getEmployeeById } from '@/pages/Employees/api/getEmployeeById'
import { useQuery } from '@tanstack/react-query'

export const useEmployee = (employeeId: string, queryKey: unknown[]) => {
  const query = useQuery({
    queryKey,
    queryFn: () => getEmployeeById(employeeId)
  })

  return {
    employee: query.data,
    isPending: query.isPending,
    error: query.error
  }
}
