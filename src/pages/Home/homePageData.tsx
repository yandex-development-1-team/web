import type { Column } from '@/components/ui/DataTable/DataTable.types'
import type { BookingRequest } from './types'
import { InlineStatus } from './ui/EditableStatus'
import { formatDateTime } from '@/lib/utils.date'

export const headerTableData: Column<BookingRequest>[] = [
  {
    key: 'created_at',
    label: 'Дата заявки',
    render: value => formatDateTime(value),
    sortable: true
  },
  {
    key: 'telegram_nick',
    label: 'Tg-аккаунт'
  },
  {
    key: 'name',
    label: 'Имя клиента'
  },
  {
    key: 'service_type',
    label: 'Услуга'
  },
  {
    key: 'service_name',
    label: 'Название проекта'
  },
  {
    key: 'status',
    label: 'Статус',
    render: (_, row) => <InlineStatus initialStatus={row.status} />
  }
]
