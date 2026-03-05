import { UserIcon } from '@/assets/icons'
import { Card } from '@/components/ui/Card'
import { getFullName } from '@/lib/utils.fullName'
import type { IEmployee } from '@/pages/Employees/employees.types'

type TEmployeeProfileProps = {
  profile: Pick<IEmployee, 'personal_info' | 'passport' | 'contacts' | 'job_info' | 'additional'>
}

export const EmployeeDetails = ({ profile }: TEmployeeProfileProps) => {
  const { personal_info, passport, contacts, job_info, additional } = profile

  return (
    <Card className="text-text">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 h-8.25">
          <UserIcon style={{ height: '100%' }} />
          <h3 className="text-h3">{getFullName(personal_info)}</h3>
        </div>
        <p className="text-sm">{job_info.role}</p>
      </div>
      <div className="flex flex-col justify-center gap-9 mt-10">
        <div>
          <h4 className="text-h4sb">Контактная информация</h4>
          <div className="flex flex-col justify-center gap-2 mt-3">
            <p className="text-sm">Телефон: {contacts.phone}</p>
            <p className="text-sm">Почта: {contacts.email}</p>
          </div>
        </div>
        <div>
          <h4 className="text-h4sb">Персональная информация</h4>
          <div className="flex flex-col justify-center gap-2 mt-3">
            <p className="text-sm">Гражданство: {passport.citizenship}</p>
            <p className="text-sm">Пол: {passport.gender}</p>
            <p className="text-sm">
              Серия, номер паспорта: {passport.series} {passport.number}
            </p>
          </div>
        </div>
        <div>
          <h4 className="text-h4sb">Должностная информация</h4>
          <div className="flex flex-col justify-center gap-2 mt-3">
            <p className="text-sm">Отдел: {job_info.department}</p>
            <p className="text-sm">Должность: {job_info.position}</p>
            <p className="text-sm">Начальник: {getFullName(job_info.chief)}</p>
          </div>
        </div>
        <div>
          <h4 className="text-h4sb">Дополнительная информация</h4>
          <div className="flex flex-col justify-center gap-2 mt-3">
            <p className="text-sm ">Город: {additional.city}</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
