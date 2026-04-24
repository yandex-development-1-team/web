import type { StatusType } from './BoxSolutions.types'

export const STATUS_MAP: Record<StatusType, { title: string; styles: string }> = {
  active: {
    title: 'Активен в боте',
    styles: 'bg-labels-yellow-light'
  },
  inactive: {
    title: 'Не активен в боте',
    styles: 'bg-labels-grey-light'
  }
}
