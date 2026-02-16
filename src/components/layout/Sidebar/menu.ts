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
    route: ROUTES.specialProjects
  },
  {
    Icon: ApplicationIcon,
    title: 'Заявки',
    route: ROUTES.applications
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
    childrenItems: [
      { title: 'Средняя посещаемость на коробку', route: ROUTES.statsAttendance },
      { title: 'Работа с заяками', route: ROUTES.statsApplications },
      { title: 'Популярность коробочных решений', route: ROUTES.statsPopularity },
      { title: 'Экспорт данных', route: ROUTES.statsDataExport },
      { title: 'Аналитика пользователей', route: ROUTES.statsUsers }
    ]
  },
  {
    Icon: BoxIcon,
    title: 'Управление коробками',
    route: ROUTES.manageSolutions
  },
  {
    Icon: ScheduleIcon,
    title: 'Управление расписанием',
    route: ROUTES.schedule
  },
  {
    Icon: UsersIcon,
    title: 'Управление правами и пользователями',
    route: ROUTES.employees
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
    route: ROUTES.notFound
  },
  {
    Icon: ExitIcon,
    title: 'Выход',
    route: ROUTES.login
  }
]
