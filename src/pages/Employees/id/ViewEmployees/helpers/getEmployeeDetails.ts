import type { User } from '@/pages/Employees/employees.types'

export const getEmployeeDetails = (employee: User) => [
  {
    title: 'Контактная информация',
    items: [
      { label: 'Телефон', value: employee.phoneNumber },
      { label: 'Email', value: employee.email },
      { label: 'Место проживания', value: employee.address }
    ]
  },
  {
    title: 'Должностная информация',
    items: [
      { label: 'Отдел', value: employee.department },
      { label: 'Должность', value: employee.position },
      { label: 'Начальник', value: employee.supervisor }
    ]
  }
]
