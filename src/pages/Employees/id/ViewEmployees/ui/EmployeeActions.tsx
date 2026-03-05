import { Switch } from '@/components/ui'
import { MOCK_ACTIONS } from '@/mockData/mock_view_employees'
import type { StatusType } from '@/pages/Employees/employees.types'
import { Actions } from './ActionsGroup'
import { Avatar } from './Avatar'
import { Card } from '@/components/ui/Card'

const STATUS_MAP: Record<StatusType, { checked: boolean; label: string; description: string }> = {
  active: {
    checked: true,
    label: 'Активен',
    description: 'При отключении сотрудник потеряет доступ к системе '
  },
  inactive: {
    checked: false,
    label: 'Не активен',
    description: 'Доступ временно отключен'
  }
}

type EmployeeActionType = {
  avatar: string
  status: StatusType
  onStatusChange: (checked: boolean) => void
}

export const EmployeeActions = ({ avatar, status, onStatusChange }: EmployeeActionType) => {
  const { checked, label, description } = STATUS_MAP[status]

  return (
    <section className="flex flex-col gap-5 text-text">
      <Card className="flex justify-center items-center h-60">
        <Avatar src={avatar} width={146} height={146} shadow />
      </Card>
      <Actions actions={MOCK_ACTIONS} />
      <Card className="flex flex-row">
        <div className="flex flex-col gap-2">
          <h4 className="text-h4sb">Статус сотрудника</h4>
          <p className="text-h5">{label}</p>
          <p className="text-text-grey-dark text-xxs">{description}</p>
        </div>
        <Switch onChange={() => onStatusChange(!checked)} checked={checked} className="self-center ml-auto min-w-13" />
      </Card>
      <Card>Установлен Битрикс.24.Диск 30.11.2025, объем - 56.49 КБ</Card>
    </section>
  )
}
