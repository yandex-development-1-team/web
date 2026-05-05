import { ROUTES } from '@/app/router'
import { Card, Loader } from '@/components/ui'
import { cn } from '@/lib/utils.clsx'
import { USERS_KEYS } from '@/services/api/queryKeys'
import { href, Link, useParams } from 'react-router-dom'
import { useFetchUser } from '../../api/userQueries'
import { Content } from './ui/Content'
import { EmployeeDetails } from './ui/EmployeeDetails'
import { EmployeeSidebar } from './ui/EmployeeSidebar'

const ViewEmployees = () => {
  const { employeeId } = useParams<{ employeeId: string }>()
  const { user, isPending, error } = useFetchUser(employeeId)

  if (error) return <div className="text-h4 text-text-grey-dark">Ошибка при получении данных</div>
  if (isPending) return <Loader />
  if (!user) return <div className="text-h4 text-text-grey-dark">Сотрудник не найден</div>

  return (
    <div className="flex flex-col">
      <Card>
        <h1 className=" text-text-black-dark text-h2">Карточка сотрудника</h1>
      </Card>
      <Content>
        <EmployeeSidebar
          avatar={user.image}
          status={user.status}
          employeeId={employeeId}
          queryKey={USERS_KEYS.all}
          phone={user.phoneNumber}
          email={user.email}
        />
        <EmployeeDetails employee={user} />
      </Content>
      <Link
        className={cn(
          'w-46 self-end mt-5',
          'bg-yellow-accent-light text-text text-button',
          'hover:bg-yellow-light active:bg-yellow-accent-dark',
          'h-11.5 px-8 py-3 rounded-lg transition-colors duration-300 ease-in-out'
        )}
        to={href(ROUTES.employeesEdit, { employeeId })}
      >
        Редактировать
      </Link>
    </div>
  )
}

export const Component = ViewEmployees
