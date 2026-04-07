import { BoxIcon, UserIcon, UsersIcon } from '@/assets/icons'
import type { ITab } from '@/components/ui/Tabs'
import type { TPath } from '../DataExport.types'

export const TABS = [
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
] as const satisfies ITab<TPath>[]
