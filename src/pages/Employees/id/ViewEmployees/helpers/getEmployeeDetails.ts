import { getFullName } from '@/lib/utils.fullName'
import type { IEmployee } from '@/pages/Employees/employees.types'

export const getEmployeeDetails = (employee: IEmployee) => [
  {
    title: 'Контактная информация',
    items: [
      { label: 'Телефон:', value: employee.contacts.phone },
      { label: 'Почта', value: employee.contacts.email },
      { label: 'Telegram', value: employee.contacts.telegram_nick || '—' }
    ]
  },
  {
    title: 'Персональная информация',
    items: [
      { label: 'Гражданство:', value: employee.passport.citizenship },
      { label: 'Пол:', value: employee.passport.gender },
      { label: 'Серия, номер паспорта:', value: `${employee.passport.series} ${employee.passport.number}` }
    ]
  },
  {
    title: 'Должностная информация',
    items: [
      { label: 'Отдел:', value: employee.job_info.department },
      { label: 'Должность:', value: employee.job_info.position },
      { label: 'Начальник:', value: getFullName(employee.job_info.chief) }
    ]
  },
  {
    title: 'Дополнительная информация',
    items: [{ label: 'Город:', value: employee.additional.city }]
  }
]
