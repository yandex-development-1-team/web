import { getFullName } from '@/lib/utils.fullName'
import type { IEmployee } from '@/pages/Employees/employees.types'

export const getEmployeeDetails = (employee: IEmployee) => [
  {
    title: 'Контактная информация',
    items: [
      { label: 'Телефон', value: employee.contacts.phone },
      { label: 'Почта', value: employee.contacts.email },
      { label: 'Telegram', value: employee.contacts.telegram_nick || '—' }
    ]
  },
  {
    title: 'Должностная информация',
    items: [
      { label: 'Отдел', value: employee.job_info.department },
      { label: 'Должность', value: employee.job_info.position },
      { label: 'Начальник', value: getFullName(employee.job_info.chief) }
    ]
  }
]
