import type { Column } from '@/components/ui/DataTable/DataTable.types'
import { cn } from '@/lib/utils.clsx'
import type { ApplicationListItemType, BookingListItemType, StatusType } from '../applications.types'

export const bookingDataTableColumns: Column<BookingListItemType>[] = [
  {
    key: 'id',
    label: 'ID',
    className: 'w-[80px]'
  },
  {
    key: 'guestName',
    label: 'Имя клиента',
    sortable: true
  },
  {
    key: 'guestContact',
    label: 'Контакт'
  },
  {
    key: 'createdAt',
    label: 'Дата заявки',
    sortable: true,
    render: value => new Date(value).toLocaleDateString('ru-RU')
  },
  {
    key: 'serviceName',
    label: 'Название'
  },
  {
    key: 'status',
    label: 'Статус',
    render: value => {
      const labels: Record<StatusType, { title: string; styles: string }> = {
        pending: {
          title: 'В очереди',
          styles: 'bg-yellow-light'
        },
        confirmed: {
          title: 'В работе',
          styles: 'bg-green-light'
        },
        cancelled: {
          title: 'Завершено',
          styles: 'bg-blue-light'
        }
      }

      const { title, styles } = labels[value as StatusType]
      return <span className={cn(' flex justify-center items-center w-full h-7 rounded-sm', styles)}>{title}</span>
    }
  },
  {
    key: 'managerName',
    label: 'Менеджер'
  }
]

export const appDataTableColumns: Column<ApplicationListItemType>[] = [
  {
    key: 'id',
    label: 'ID',
    className: 'w-[80px]'
  },
  {
    key: 'customerName',
    label: 'Имя клиента',
    sortable: true
  },
  {
    key: 'contactInfo',
    label: 'Tg-аккаунт'
  },
  {
    key: 'createdAt',
    label: 'Дата заявки',
    sortable: true,
    render: value => new Date(value).toLocaleDateString('ru-RU')
  },
  {
    key: 'status',
    label: 'Статус',
    render: value => {
      const labels: Record<StatusType, { title: string; styles: string }> = {
        pending: {
          title: 'В очереди',
          styles: 'bg-yellow-light'
        },
        confirmed: {
          title: 'В работе',
          styles: 'bg-green-light'
        },
        cancelled: {
          title: 'Завершено',
          styles: 'bg-blue-light'
        }
      }

      const { title, styles } = labels[value as StatusType]
      return <span className={cn(' flex justify-center items-center w-full h-7 rounded-sm', styles)}>{title}</span>
    }
  }
]
