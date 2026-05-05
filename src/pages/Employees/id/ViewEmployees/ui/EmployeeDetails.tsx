import { UserIcon } from '@/assets/icons'
import { Card } from '@/components/ui/Card'
import { USER_ROLE_MAP } from '@/pages/Employees/configs'
import type { UserWithDetails } from '@/pages/Employees/employees.types'
import { getEmployeeDetails } from '../helpers/getEmployeeDetails'
import { DetailSection } from './DetailSection'

export const EmployeeDetails = ({ employee }: { employee: UserWithDetails }) => {
  const details = getEmployeeDetails(employee)

  return (
    <Card className="text-text">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 h-8.25">
          <UserIcon style={{ height: '100%' }} />
          <h3 className="text-h3">{`${employee.firstName} ${employee.lastName}`}</h3>
        </div>
        <p className="text-sm">{USER_ROLE_MAP[employee.role].details}</p>
      </div>
      <div className="flex flex-col justify-center gap-9 mt-10">
        {details.map((section, index) => {
          return <DetailSection items={section.items} title={section.title} key={index} />
        })}
      </div>
    </Card>
  )
}
