import mockPhoto from '@/mockData/mock_photo.jpg'
import type { IEmployee } from './employees.types'

export type Employee = {
  id: number
  name: string
  department: string
  manager: string
  position: string
  level: string
  phone: string
  email: string
  city: string
}

export const employees: Employee[] = [
  {
    id: 1023,
    name: 'Смирнова Ксения',
    department: 'Маркетинг',
    manager: 'Гаврилов Сергей',
    position: 'Администратор',
    level: 'A',
    phone: '+7 921 457-83-16',
    email: 'ks.sm@gmail.com',
    city: 'Москва'
  },
  {
    id: 1024,
    name: 'Пупышкин Николай',
    department: 'Маркетинг',
    manager: 'Гаврилов Сергей',
    position: 'Менеджер',
    level: '3',
    phone: '+7 921 457-83-16',
    email: 'nik.pup@gmail.com',
    city: 'Санкт-Петербург'
  },
  {
    id: 1025,
    name: 'Винокуров Владимир',
    department: 'Маркетинг',
    manager: 'Гаврилов Сергей',
    position: 'Менеджер',
    level: '2',
    phone: '+7 921 457-83-16',
    email: 'vinokurov@gmail.com',
    city: 'Москва'
  },
  {
    id: 1026,
    name: 'Белый Сергей',
    department: 'Маркетинг',
    manager: 'Гаврилов Сергей',
    position: 'Маркетолог',
    level: '1',
    phone: '+7 921 457-83-16',
    email: 'bely@gmail.com',
    city: 'Санкт-Петербург'
  },
  {
    id: 1027,
    name: 'Косаткин Денис',
    department: 'Маркетинг',
    manager: 'Гаврилов Сергей',
    position: 'Администратор',
    level: 'A',
    phone: '+7 921 457-83-16',
    email: 'kosatkin@gmail.com',
    city: 'Москва'
  },
  {
    id: 1028,
    name: 'Артемьев Илья',
    department: 'Маркетинг',
    manager: 'Гаврилов Сергей',
    position: 'PR',
    level: '1',
    phone: '+7 921 457-83-16',
    email: 'artemyev@gmail.com',
    city: 'Санкт-Петербург'
  },
  {
    id: 1029,
    name: 'Честокин Александр',
    department: 'Маркетинг',
    manager: 'Гаврилов Сергей',
    position: 'Маркетолог',
    level: '1',
    phone: '+7 921 457-83-16',
    email: 'chestokin@gmail.com',
    city: 'Москва'
  },
  {
    id: 1030,
    name: 'Жучкин Мопс',
    department: 'Маркетинг',
    manager: 'Гаврилов Сергей',
    position: 'Менеджер',
    level: '1',
    phone: '+7 921 457-83-16',
    email: 'mops@gmail.com',
    city: 'Санкт-Петербург'
  },
  {
    id: 1031,
    name: 'Заборская Виктория',
    department: 'Маркетинг',
    manager: 'Гаврилов Сергей',
    position: 'Менеджер',
    level: '2',
    phone: '+7 921 457-83-16',
    email: 'zaborskaya@gmail.com',
    city: 'Москва'
  },
  {
    id: 1032,
    name: 'Саркисян Амир',
    department: 'Маркетинг',
    manager: 'Гаврилов Сергей',
    position: 'Менеджер',
    level: '3',
    phone: '+7 921 457-83-16',
    email: 'amir@gmail.com',
    city: 'Санкт-Петербург'
  },
  {
    id: 1033,
    name: 'Головченко Дмитрий',
    department: 'Маркетинг',
    manager: 'Гаврилов Сергей',
    position: 'Администратор',
    level: 'A',
    phone: '+7 921 457-83-16',
    email: 'golovchenko@gmail.com',
    city: 'Москва'
  }
]

export const EMPLOYEES: IEmployee[] = Array.from({ length: 11 }, (_, index) => {
  const { id, department, email, name, position, manager, level, phone, city } = employees[index]

  return {
    id,
    avatar: mockPhoto,
    personal_info: {
      first_name: name,
      last_name: '',
      middle_name: ''
    },
    contacts: {
      phone: phone,
      email,
      city: city
    },
    job_info: {
      department,
      position,
      role: level === 'A' ? 'Администратор' : `Менеджер ${level} звена`,
      chief: {
        first_name: manager,
        last_name: '',
        middle_name: 'Михайлович'
      }
    },
    access_level: 'Ограниченный доступ',
    status: index % 2 === 0 ? 'inactive' : 'active',
    created_at: '2024-02-01T09:00:00Z',
    updated_at: '2024-02-01T09:00:00Z'
  } as const
})
