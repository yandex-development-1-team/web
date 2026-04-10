import { ROUTES } from '@/app/router'
import { ApplicationIcon, BoxesIcon, ExportIcon, GroupIcon, UsersIcon } from '@/assets/icons'
import type { CardLinkType } from './ui/CardLink/CardLink.types'

export const CARDS: CardLinkType[] = [
  {
    to: ROUTES.statsAttendance,
    icon: GroupIcon,
    title: 'Средняя посещаемость на коробку',
    description: 'Статистика за выбранный период'
  },
  {
    to: ROUTES.statsApplications,
    icon: ApplicationIcon,
    iconSize: 45,
    title: 'Работа с заявками',
    description: 'Модерация заявок'
  },
  {
    to: ROUTES.statsPopularity,
    icon: BoxesIcon,
    iconSize: 45,
    title: 'Популярность коробочных решений',
    description: 'Рейтинг использования коробок'
  },
  {
    to: ROUTES.statsDataExport,
    icon: ExportIcon,
    title: 'Экспорт данных',
    description: 'Экспорт аналитики и списков'
  },
  {
    to: ROUTES.statsUsers,
    icon: UsersIcon,
    iconSize: 45,
    title: 'Аналитика пользователей',
    description: 'Обзор ключевых пользовательских данных'
  }
]
