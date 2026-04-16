import { getFullName } from '@/lib/utils.fullName'
import type { IEmployee } from '@/pages/Employees/employees.types'

export const getEmployeeDetails = (employee: IEmployee) => [
  {
    title: 'Контактная информация',
    items: [
      { label: 'Телефон', value: employee.contacts.phone },
      { label: 'Email', value: employee.contacts.email },
      { label: 'Место проживания', value: employee.contacts.city }
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
