import mockPhoto from '@/mockData/mock_photo.jpg'
import type { IEmployee } from './employees.types'

const initialEmployeesData = [
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

export const EMPLOYEES: IEmployee[] = initialEmployeesData.map((emp, index) => ({
  id: emp.id,
  avatar: mockPhoto,
  personal_info: {
    first_name: emp.name.split(' ')[1] || emp.name,
    last_name: emp.name.split(' ')[0] || '',
    middle_name: emp.name.split(' ')[2] || ''
  },
  contacts: {
    phone: emp.phone,
    email: emp.email,
    city: emp.city
  },
  job_info: {
    department: emp.department,
    position: emp.position,
    role: emp.level === 'A' ? 'Администратор' : `Менеджер ${emp.level} звена`,
    chief: {
      first_name: emp.manager,
      last_name: '',
      middle_name: 'Михайлович'
    }
  },
  access_level: 'Ограниченный доступ',
  status: index % 2 === 0 ? 'inactive' : 'active',
  created_at: '2024-02-01T09:00:00Z',
  updated_at: '2024-02-01T09:00:00Z'
}))
