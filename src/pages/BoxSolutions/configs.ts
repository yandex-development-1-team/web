import type { StatusSettings } from '@/components/ui/StatusLabel/StatusLabel'
import type { SelectProps, StatusType } from './types'

export const STATUS_LABEL_MAP: StatusSettings<StatusType> = {
  active: {
    title: 'Активен в боте',
    styles: 'bg-labels-yellow-light'
  },
  inactive: {
    title: 'Не активен в боте',
    styles: 'bg-labels-grey-light'
  }
} as const

export const STATUS_SELECT_OPTIONS: SelectProps = {
  options: [
    {
      value: 'all',
      label: 'Все статусы'
    },
    {
      value: 'active',
      label: 'Активен в боте'
    },
    {
      value: 'inactive',
      label: 'Не активен в боте'
    }
  ],
  placeholder: 'Выберите статус',
  classNames: {
    trigger: 'grow bg-white min-w-58 w-full text-text',
    value: 'all',
    content: 'text-text',
    item: 'string'
  }
} as const
