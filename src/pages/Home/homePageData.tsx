import type { Column } from '@/components/ui/DataTable/DataTable.types'
import type { BookingRequest } from './types'
import { InlineStatus } from './ui/EditableStatus'

export const headerTableData: Column<BookingRequest>[] = [
  {
    key: 'date',
    label: 'Дата заявки',
    sortable: true
  },
  {
    key: 'account',
    label: 'Tg-аккаунт'
  },
  {
    key: 'clientName',
    label: 'Имя клиента'
  },
  {
    key: 'service',
    label: 'Услуга'
  },
  {
    key: 'projectName',
    label: 'Название проекта'
  },
  {
    key: 'status',
    label: 'Статус',
    render: (_, row) => <InlineStatus initialStatus={row.status} />
  }
]
