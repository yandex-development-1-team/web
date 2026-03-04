import { UserIcon } from '@/assets/icons'
import { Button, Switch } from '@/components/ui'
import { cn } from '@/lib/utils.clsx'
import { EMPLOYEES, MOCK_ACTIONS } from '@/mockData/mock_view_employees'
import type { ComponentProps, ReactNode } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ActionsGroup } from './ui/ActionsGroup'
import { Avatar } from './ui/Avatar'
import { Content } from './ui/Content'
import { EmployeeDetails } from './ui/EmployeeDetails'

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
  const { employeeId } = useParams<{ employeeId: string }>()
  const navigate = useNavigate()

  const employee = EMPLOYEES[0]
  const { avatar, status } = employee

  return (
    <>
      <Card>
        <h1 className=" text-text-black-dark text-h2">Карточка сотрудника</h1>
      </Card>
      <Content className="mt-5 grid grid-cols-[380px_1fr] gap-5 max-h-max">
        <section className="flex flex-col gap-5 ">
          <Card className="flex justify-center items-center h-60">
            <Avatar src={avatar} width={146} height={146} shadow />
          </Card>
          <ActionsGroup actions={MOCK_ACTIONS} />
          <Card>
            <div className="flex items-center gap-3 h-8.25">
              <UserIcon style={{ height: '100%' }} />
              <h3 className="text-h3">Статус</h3>
            </div>
            <div className="flex flex-row justify-between gap-2 mt-3">
              <p className="text-sm">{status}</p>
              <Switch onChange={() => {}} checked />
            </div>
          </Card>
          <Card>Установлен Битрикс.24.Диск 30.11.2025, объем - 56.49 КБ</Card>
        </section>
        <EmployeeDetails profile={employee} />
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
  )
}

export const Component = ViewEmployees
