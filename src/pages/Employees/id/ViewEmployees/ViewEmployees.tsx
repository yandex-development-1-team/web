import { Button } from '@/components/ui'
import { cn } from '@/lib/utils.clsx'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { ComponentProps, ReactNode } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getEmployeeById } from '../../api/getEmployeeById'
import { updateEmployeeStatus } from '../../api/updateEmployeeStatus'
import type { StatusType } from '../../employees.types'
import { Content } from './ui/Content'
import { EmployeeActions } from './ui/EmployeeActions'
import { EmployeeDetails } from './ui/EmployeeDetails'
// import { Loader } from '@/components/ui/Loader'

type TCardProps = {
  type?: 'solid' | 'transparent'
  children: ReactNode
} & ComponentProps<'div'>

export const Card = ({ children, className, type = 'solid', ...props }: TCardProps) => {
  const bg = type === 'solid' ? 'bg-white' : 'bg-transparent'
  return (
    <>
      <div className={cn(`p-[18px_20px] rounded-md ${className}`, bg)} {...props}>
        {children}
      </div>
    </>
  )
}

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
    },
    onError: () => {}
  })

  if (isError) return <div>Ошибка при получении данных</div>

  if (!data) return <div>Сотрудник не найден</div>

  const { avatar, status, ...restData } = data

  return (
    <>
      <Card>
        <h1 className=" text-text-black-dark text-h2">Карточка сотрудника</h1>
      </Card>

      {isPending ? (
        <div></div>
      ) : (
        <>
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
            onClick={() => navigate(`/employees/${employeeId}/edit`)}
          >
            Редактировать
          </Button>
        </>
      )}
    </>
  )
}

export const Component = ViewEmployees
