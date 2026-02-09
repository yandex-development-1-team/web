import type { MenuItemProps } from '@/components/ui/MenuItem/MenuItem.types'
import Home from '@/assets/icons/Home.svg?react'
import Boxes from '@/assets/icons/Boxes.svg?react'
import SpecialProjects from '@/assets/icons/Special_Projects.svg?react'
import Application from '@/assets/icons/Application.svg?react'
import Afisha from '@/assets/icons/Afisha.svg?react'
import { ROUTES } from '@/app/router'

export const MENU_MANAGER: MenuItemProps[] = [
  {
    Icon: Home,
    title: 'Главная',
    route: ROUTES.home
  },
  {
    Icon: Boxes,
    title: 'Коробочные решения',
    route: ROUTES.boxSolutions
  },
  {
    Icon: SpecialProjects,
    title: 'Спецпроекты',
    route: ROUTES.specialProjects
  },
  {
    Icon: Application,
    title: 'Заявки',
    route: ROUTES.applications
  },
  {
    Icon: Afisha,
    title: 'Ссылки и ресурсы',
    route: ROUTES.resources
  }
]
