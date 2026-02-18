import type { ITabs } from '@/pages/Stats/DataExport/DataExport.types'
import { UserIcon, BoxIcon, UsersIcon } from '@/assets/icons'

export const MOCK_TABS: ITabs[] = [
  {
    id: '0',
    title: 'Сотрудники',
    Icon: UserIcon
  },
  {
    id: '1',
    title: 'Посещаемость',
    Icon: BoxIcon
  },
  {
    id: '2',
    title: 'Коробки',
    Icon: BoxIcon
  },
  {
    id: '3',
    title: 'Пользователи',
    Icon: UsersIcon
  }
]
