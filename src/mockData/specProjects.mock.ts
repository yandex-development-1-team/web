import type { TSpecialProjectListItemResponse } from '@/types/specialProject.type'
import ImgCard from './box_image.jpg'

export const MOCK_DATA = {
  formLink: 'https://forms.yandex.ru/u/65f2a9c3e4b0a123456789ab/',
  selectData: [
    { value: 'all', label: 'Все' },
    { value: 'active', label: 'Активные' },
    { value: 'inactive', label: 'Не активные' }
  ]
}

export const MOCK_SPEC_PROJECTS_DATA: (TSpecialProjectListItemResponse & {
  image?: string | null | undefined
  description: string
})[] = [
  {
    id: 0,
    is_active_in_bot: true,
    title: 'Большой театр',
    description: 'Театральная площадь, 1',
    image: ImgCard
  },
  {
    id: 1,
    is_active_in_bot: true,
    title: 'Большой театр',
    description: 'Театральная площадь, 2',
    image: undefined
  },
  {
    id: 2,
    is_active_in_bot: false,
    title: 'Большой театр',
    description: 'Театральная площадь, 3',
    image: undefined
  },
  {
    id: 3,
    is_active_in_bot: false,
    title: 'Большой театр',
    description: 'Театральная площадь, 4',
    image: undefined
  },
  {
    id: 4,
    is_active_in_bot: false,
    title: 'Большой театр',
    description: 'Театральная площадь, 5',
    image: undefined
  }
]
