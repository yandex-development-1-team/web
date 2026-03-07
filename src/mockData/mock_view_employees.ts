import { MessageIcon, PhoneIcon, VideoIcon } from '@/assets/icons'
import type { FC, SVGProps } from 'react'

import mockPhoto from '@/mockData/mock_photo.jpg'
import type { IEmployee } from '@/pages/Employees/employees.types'

type TContactAction = {
  id: string
  label: string
  link: string
  variant: 'primary' | 'outline' | 'ghost'
  Icon: FC<SVGProps<SVGSVGElement>>
  onClick?: () => void
}

export const MOCK_ACTIONS: TContactAction[] = [
  {
    id: 'msg',
    link: 'https://t.me',
    label: 'Написать сообщение',
    variant: 'primary',
    Icon: MessageIcon,
    onClick: () => console.log('Message')
  },
  {
    id: 'call',
    link: 'tel:+79991234567',
    label: 'Позвонить',
    variant: 'outline',
    Icon: PhoneIcon,
    onClick: () => console.log('Call')
  },
  {
    id: 'video',
    link: '',
    label: 'Видеозвонок',
    variant: 'outline',
    Icon: VideoIcon,
    onClick: () => console.log('Video')
  }
] as const

export const EMPLOYEES: IEmployee[] = [
  {
    id: 0,
    avatar: mockPhoto,
    personal_info: {
      last_name: 'Иванов',
      first_name: 'Петр',
      middle_name: 'Сергеевич'
    },
    passport: {
      citizenship: 'РФ',
      birthday: '1985-04-12',
      gender: 'М',
      series: '4510',
      number: '112233'
    },
    contacts: {
      phone: '+7 (900) 111-22-33',
      email: 'admin@company.ru',
      telegram_nick: '@system_boss'
    },
    job_info: {
      department: 'IT-департамент',
      position: 'Системный администратор',
      role: 'Администратор',
      chief: {
        first_name: 'Сергей',
        last_name: 'Гаврилов',
        middle_name: 'Михайлович'
      }
    },
    additional: {
      city: 'Находка'
    },
    access_level: 'Полный доступ',
    status: 'active',
    created_at: '2023-01-10T08:00:00Z',
    updated_at: '2024-01-15T12:30:00Z'
  },
  {
    id: 1,
    avatar: mockPhoto,
    personal_info: {
      last_name: 'Кузнецова',
      first_name: 'Елена',
      middle_name: 'Викторовна'
    },
    passport: {
      citizenship: 'РФ',
      birthday: '1992-08-24',
      gender: 'Ж',
      series: 'BM',
      number: '776655'
    },
    contacts: {
      phone: '+7 (999) 444-55-66',
      email: 'kuznetsova.e@company.ru',
      telegram_nick: '@system_boss'
    },
    job_info: {
      department: 'Отдел продаж',
      position: 'Руководитель группы',
      role: 'Менеджер 2 звена',
      chief: {
        first_name: 'Сергей',
        last_name: 'Гаврилов',
        middle_name: 'Михайлович'
      }
    },
    additional: {
      city: 'Находка'
    },
    access_level: 'Ограниченный доступ',
    status: 'inactive',
    created_at: '2023-06-20T10:15:00Z',
    updated_at: '2023-12-01T09:00:00Z'
  },
  {
    id: 2,
    avatar: mockPhoto,
    personal_info: {
      last_name: 'Лебедев',
      first_name: 'Дмитрий',
      middle_name: 'Александрович'
    },
    passport: {
      citizenship: 'РФ',
      birthday: '1998-11-30',
      gender: 'М',
      series: '4615',
      number: '445566'
    },
    contacts: {
      phone: '+7 (911) 000-88-99',
      email: 'lebedev.d@company.ru',
      telegram_nick: '@dmitry_fresh'
    },
    job_info: {
      department: 'Клиентский сервис',
      position: 'Младший менеджер',
      role: 'Менеджер 1 звена',
      chief: {
        first_name: 'Сергей',
        last_name: 'Гаврилов',
        middle_name: 'Михайлович'
      }
    },
    additional: {
      city: 'Воронеж'
    },
    access_level: 'Ограниченный доступ',
    status: 'inactive',
    created_at: '2024-02-01T09:00:00Z',
    updated_at: '2024-02-01T09:00:00Z'
  }
]
