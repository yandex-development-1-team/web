import { ROUTES } from '@/app/router'
import { Card, Loader } from '@/components/ui'
import { cn } from '@/lib/utils.clsx'
import { href, Link, useParams } from 'react-router-dom'
import { useEmployee } from './hooks/useEmployee'
import { Content } from './ui/Content'
import { EmployeeActions } from './ui/EmployeeActions'
import { EmployeeDetails } from './ui/EmployeeDetails'

const ViewEmployees = () => {
  const { employeeId } = useParams<{ employeeId: string }>() as { employeeId: string }
  const queryKey = ['employee', employeeId]
  const { employee, isPending, error } = useEmployee(employeeId, queryKey)

  if (error) return <div className="text-h4 text-text-grey-dark">Ошибка при получении данных</div>
  if (isPending) return <Loader />
  if (!employee) return <div className="text-h4 text-text-grey-dark">Сотрудник не найден</div>

  const { avatar, status, ...restData } = employee

  return (
    <>
      <Card>
        <h1 className=" text-text-black-dark text-h2">Карточка сотрудника</h1>
      </Card>
      <Content className="mt-5 grid grid-cols-[380px_1fr] gap-5 max-h-max">
        <EmployeeActions avatar={avatar} status={status} employeeId={employeeId} queryKey={queryKey} />{' '}
        <EmployeeDetails profile={restData} />
      </Content>
      <Link
        className={cn(
          'w-46 self-end mt-5',
          'bg-yellow-accent-light text-black text-button',
          'hover:bg-yellow-light active:bg-yellow-accent-dark aria-invalid:bg-red-medium aria-invalid:text-white',
          'h-11.5 px-8 py-3 rounded-lg transition-colors duration-300 ease-in-out'
        )}
        to={href(ROUTES.employeesEdit, { employeeId })}
      >
        Редактировать
      </Link>
    </>
  )
}

export const Component = ViewEmployees
