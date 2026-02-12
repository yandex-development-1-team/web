import { ROUTES } from '@/app/router'
import Home from '@/assets/icons/Home.svg?react'
import Boxes from '@/assets/icons/Boxes.svg?react'
import SpecialProjects from '@/assets/icons/Special_Projects.svg?react'
import Application from '@/assets/icons/Application.svg?react'
import Afisha from '@/assets/icons/Afisha.svg?react'
import Analytics from '@/assets/icons/Analytics.svg?react'
import Box from '@/assets/icons/Box.svg?react'
import Schedule from '@/assets/icons/Schedule.svg?react'
import Users from '@/assets/icons/Users.svg?react'
import SystemSettings from '@/assets/icons/System_Settings.svg?react'
import Support from '@/assets/icons/Support.svg?react'
import Exit from '@/assets/icons/Exit.svg?react'
import type { SidebarMenuItemProps } from '@/components/ui/SidebarMenuItem/SidebarMenuItem.types'

export const MENU_MANAGER: Omit<SidebarMenuItemProps, 'isExpanded'>[] = [
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

export const MENU_ADMIN: Omit<SidebarMenuItemProps, 'isExpanded'>[] = [
  {
    Icon: Analytics,
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
    Icon: Box,
    title: 'Управление коробками',
    route: ROUTES.manageSolutions
  },
  {
    Icon: Schedule,
    title: 'Управление расписанием',
    route: ROUTES.schedule
  },
  {
    Icon: Users,
    title: 'Управление правами и пользователями',
    route: ROUTES.employees
  },
  {
    Icon: SystemSettings,
    title: 'Системные настройки',
    route: ROUTES.settings
  }
]

export const MENU_DOWN: Omit<SidebarMenuItemProps, 'isExpanded'>[] = [
  {
    Icon: Support,
    title: 'Поддержка',
    route: ROUTES.login
  },
  {
    Icon: Exit,
    title: 'Выход',
    route: ROUTES.login
  }
]
