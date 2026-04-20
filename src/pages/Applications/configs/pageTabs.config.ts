import { BoxIcon, SpecialProjectsIcon } from '@/assets/icons'
import type { ITab } from '@/components/ui/Tabs/Tabs.types'
import type { AppType } from '../applications.types'

export const TABS: ITab<AppType>[] = [
  {
    id: '0',
    path: 'bookings',
    title: 'Коробочные решения',
    Icon: BoxIcon
  },
  {
    id: '1',
    path: 'applications',
    title: 'Спецпроекты',
    Icon: SpecialProjectsIcon
  }
] as const
