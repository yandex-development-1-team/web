import { ROUTES } from '@/app/router'
import { Button, Card, Loader } from '@/components/ui'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { href, useNavigate, useParams } from 'react-router-dom'
import { getEmployeeById } from '../../api/getEmployeeById'
import { updateEmployeeStatus } from '../../api/updateEmployeeStatus'
import type { StatusType } from '../../employees.types'
import { Content } from './ui/Content'
import { EmployeeActions } from './ui/EmployeeActions'
import { EmployeeDetails } from './ui/EmployeeDetails'

const ViewEmployees = () => {
  const { employeeId = '' } = useParams<{ employeeId: string }>()
  const navigate = useNavigate()

  const { data, isPending, isError } = useQuery({
    queryKey: ['employee', employeeId],
    queryFn: () => {
      if (!employeeId) throw new Error('ID is required')
      return getEmployeeById(employeeId)
    }
  })

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (status: StatusType) => {
      if (!employeeId) throw new Error('ID is required')
      return updateEmployeeStatus({ employeeId, status })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employee', employeeId] })
    }
  })

  if (isError) return <div className="text-h4 text-text-grey-dark">Ошибка при получении данных</div>
  if (isPending) return <Loader />
  if (!data) return <div className="text-h4 text-text-grey-dark">Сотрудник не найден</div>

  const { avatar, status, ...restData } = data

  return (
    <>
      <Card>
        <h1 className=" text-text-black-dark text-h2">Карточка сотрудника</h1>
      </Card>
      <Content className="mt-5 grid grid-cols-[380px_1fr] gap-5 max-h-max">
        <EmployeeActions
          avatar={avatar}
          status={status}
          onStatusChange={() => mutation.mutate(status === 'active' ? 'inactive' : 'active')}
        />
        <EmployeeDetails profile={restData} />
      </Content>
      <Button
        variant={'default'}
        size={'default'}
        className="w-46 self-end mt-5"
        onClick={() => navigate(href(ROUTES.employeesEdit, { employeeId }))}
      >
        Редактировать
      </Button>
    </>
  )
}

export const Component = ViewEmployees
