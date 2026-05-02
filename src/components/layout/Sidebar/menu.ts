import {
  AfishaIcon,
  AnalyticsIcon,
  ApplicationIcon,
  BoxesIcon,
  BoxIcon,
  ExitIcon,
  HomeIcon,
  ScheduleIcon,
  SpecialProjectsIcon,
  SupportIcon,
  SystemSettingsIcon,
  UsersIcon
} from '@/assets/icons'
import { ROUTES } from '@/app/router'
import type { ItemProps } from './ui/Item.types'
import type { DownItemProps } from './ui/DownItem.types'

import { PERMISSIONS } from '@/app/router/permissions'

export const MENU_MANAGER: Omit<ItemProps, 'isExpanded'>[] = [
  {
    Icon: HomeIcon,
    title: 'Главная',
    route: ROUTES.home
  },
  {
    Icon: BoxesIcon,
    title: 'Коробочные решения',
    route: ROUTES.boxSolutions
  },
  {
    Icon: SpecialProjectsIcon,
    title: 'Спецпроекты',
    route: ROUTES.specialProjects,
    accessName: PERMISSIONS.specprojectsView
  },
  {
    Icon: ApplicationIcon,
    title: 'Заявки',
    route: ROUTES.applications,
    accessName: PERMISSIONS.applicationsView
  },
  {
    Icon: AfishaIcon,
    title: 'Ссылки и ресурсы',
    route: ROUTES.resources
  }
]

export const MENU_ADMIN: Omit<ItemProps, 'isExpanded'>[] = [
  {
    Icon: AnalyticsIcon,
    title: 'Аналитика',
    route: ROUTES.stats,
    inDevelopment: true,
    childrenItems: [
      { title: 'Средняя посещаемость на коробку', route: ROUTES.statsAttendance, inDevelopment: true },
      { title: 'Работа с заяками', route: ROUTES.statsApplications, inDevelopment: true },
      { title: 'Популярность коробочных решений', route: ROUTES.statsPopularity, inDevelopment: true },
      { title: 'Экспорт данных', route: ROUTES.statsDataExport, inDevelopment: true },
      { title: 'Аналитика пользователей', route: ROUTES.statsUsers, inDevelopment: true }
    ]
  },
  {
    Icon: BoxIcon,
    title: 'Управление коробками',
    route: ROUTES.manageSolutions,
    inDevelopment: true
  },
  {
    Icon: ScheduleIcon,
    title: 'Управление расписанием',
    route: ROUTES.schedule,
    inDevelopment: true
  },
  {
    Icon: UsersIcon,
    title: 'Управление правами и пользователями',
    route: ROUTES.employees
  },
  {
    Icon: AfishaIcon,
    title: 'Ссылки и ресурсы',
    route: ROUTES.resources
  },
  {
    Icon: SystemSettingsIcon,
    title: 'Системные настройки',
    route: ROUTES.settings
  }
]

export const MENU_DOWN: Omit<DownItemProps, 'isExpanded'>[] = [
  {
    Icon: SupportIcon,
    title: 'Поддержка',
    route: ROUTES.notFound,
    inDevelopment: true
  },
  {
    Icon: ExitIcon,
    title: 'Выход',
    route: ''
  }
]
