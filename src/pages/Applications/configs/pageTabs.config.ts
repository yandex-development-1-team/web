import { BoxIcon, SpecialProjectsIcon } from '@/assets/icons'
import type { ITab } from '@/components/ui/Tabs/Tabs.types'
import type { AppType } from '../applications.types'

export const TABS: ITab<AppType>[] = [
  {
    id: '0',
    path: 'box',
    title: 'Коробочные решения',
    Icon: BoxIcon
  },
  {
    id: '1',
    path: 'specialProject',
    title: 'Спецпроекты',
    Icon: SpecialProjectsIcon
  }
] as const
