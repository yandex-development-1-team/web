import { Switch } from '@/components/ui'
import { Card } from '@/components/ui/Card'
import { Actions } from './Actions'
import { Avatar } from './Avatar'
import { useStatusChange } from '../../../hooks/useStatusChange'
import { getEmployeeActions } from '../helpers/employeeActions'
import type { StatusType } from '@/pages/Employees/employees.types'

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

type EmployeeSidebarType = {
  avatar: string
  status: StatusType
  employeeId: string
  queryKey: unknown[]
  phone: string
  email: string
}

export const EmployeeSidebar = ({ avatar, status, queryKey, employeeId, phone, email }: EmployeeSidebarType) => {
  const { checked, label, description } = STATUS_MAP[status]
  const { toggleStatus, isStatusUpdating } = useStatusChange({ employeeId, queryKey, status })
  const actions = getEmployeeActions({ phone, email })

  return (
    <section className="flex flex-col gap-5 text-text w-full">
      <Card className="flex justify-center items-center h-60">
        <Avatar src={avatar} width={146} height={146} />
      </Card>
      <Actions actions={actions} />
      <Card className="flex flex-row">
        <div className="flex flex-col gap-2">
          <h4 className="text-h4sb">Статус сотрудника</h4>
          <p className="text-h5">{label}</p>
          <p className="text-text-grey-dark text-xxs">{description}</p>
        </div>
        <Switch
          onChange={toggleStatus}
          checked={checked}
          className="self-center ml-auto min-w-13"
          disabled={isStatusUpdating}
        />
      </Card>
    </section>
  )
}
