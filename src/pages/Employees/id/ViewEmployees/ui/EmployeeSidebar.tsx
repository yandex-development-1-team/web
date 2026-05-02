import photo_placeholder from '@/assets/images/photo_placeholder.jpg'
import { Switch } from '@/components/ui'
import { Card } from '@/components/ui/Card'
import { useUpdateUserStatus } from '@/pages/Employees/api/userQueries'
import { STATUS_MAP } from '@/pages/Employees/configs'
import type { UserStatus } from '@/pages/Employees/employees.types'
import { getEmployeeActions } from '../helpers/employeeActions'
import { Actions } from './Actions'
import { Avatar } from './Avatar'

type EmployeeSidebarType = {
  status: UserStatus //Exclude<UserStatus, 'invited'>
  employeeId?: string
  queryKey: readonly string[]
  email?: string
  phone?: string
  avatar?: string
}

export const EmployeeSidebar = ({ avatar, status, queryKey, employeeId, phone, email }: EmployeeSidebarType) => {
  const { toggleStatus, isStatusPending } = useUpdateUserStatus({ userId: employeeId, queryKey })
  const actions = getEmployeeActions({ phone, email })

  const handleToggleStatus = async () => {
    await toggleStatus(STATUS_MAP[status].nextStatus)
  }

  const { checked, label, description } = STATUS_MAP[status]

  return (
    <section className="flex flex-col gap-5 text-text w-full">
      <Card className="flex justify-center items-center h-60">
        <Avatar src={avatar || photo_placeholder} width={146} height={146} />
      </Card>
      <Actions actions={actions} />
      <Card className="flex flex-row">
        <div className="flex flex-col gap-2">
          <h4 className="text-h4sb">Статус сотрудника</h4>
          <p className="text-h5">{label}</p>
          <p className="text-text-grey-dark text-xxs">{description}</p>
        </div>
        <Switch
          onChange={handleToggleStatus}
          checked={checked}
          className="self-center ml-auto min-w-13"
          disabled={isStatusPending || status === 'invited'}
        />
      </Card>
    </section>
  )
}
