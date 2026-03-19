import type { Column } from '@/components/DataTable/DataTable.types'
import type { StatusType } from './types'
import { InlineStatus } from './ui/EditableStatus'
import type { BookingRequest } from '@/mockData/bookingRequestsMock'

export const headerTableData = (onStatusChange: (id: number, status: StatusType) => void): Column<BookingRequest>[] => [
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
    render: (_, row) => (
      <InlineStatus initialStatus={row.status} onChange={newStatus => onStatusChange(row.id, newStatus)} />
    )
  }
]
