import { BoxIcon, UserIcon, UsersIcon } from '@/assets/icons'
import type { ITabs } from '@/pages/Stats/DataExport/DataExport.types'

export const TABS: ITabs[] = [
  {
    id: '0',
    path: 'employees',
    title: 'Сотрудники',
    Icon: UserIcon
  },
  {
    id: '1',
    path: 'attendance',
    title: 'Посещаемость',
    Icon: BoxIcon
  },
  {
    id: '2',
    path: 'boxes',
    title: 'Коробки',
    Icon: BoxIcon
  },
  {
    id: '3',
    path: 'users',
    title: 'Пользователи',
    Icon: UsersIcon
  }
] as const satisfies ITabs[]
