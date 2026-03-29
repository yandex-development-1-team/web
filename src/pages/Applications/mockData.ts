import { BoxIcon, SpecialProjectsIcon } from '@/assets/icons'
import type { ITab } from '@/components/ui/Tabs/Tabs.types'

export const TABS: ITab[] = [
  {
    id: '0',
    path: 'box',
    title: 'Коробочные решения',
    Icon: BoxIcon
  },
  {
    id: '1',
    path: 'special_project',
    title: 'Спецпроекты',
    Icon: SpecialProjectsIcon
  }
]
