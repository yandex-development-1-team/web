import type { Column } from '@/components/DataTable/DataTable.types'
import { InlineStatus } from './ui/EditableStatus'
import type { BookingRequest, StatusType } from './types'

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

export const bookingRequestsMock: BookingRequest[] = [
  {
    id: 1,
    date: '01.01.2025',
    account: '@tgclient',
    clientName: 'Иван Иванов',
    service: 'Спецпроект',
    projectName: 'Третьяковка',
    status: 'done'
  },
  {
    id: 2,
    date: '02.01.2025',
    account: '@art_client',
    clientName: 'Алексей Петров',
    service: 'Спецпроект',
    projectName: 'Эрмитаж',
    status: 'progress'
  },
  {
    id: 3,
    date: '03.01.2025',
    account: '@design_user',
    clientName: 'Мария Смирнова',
    service: 'Экскурсия',
    projectName: 'Третьяковка',
    status: 'queue'
  },
  {
    id: 4,
    date: '04.01.2025',
    account: '@museum_tg',
    clientName: 'Дмитрий Козлов',
    service: 'Спецпроект',
    projectName: 'Русский музей',
    status: 'queue'
  },
  {
    id: 5,
    date: '05.01.2025',
    account: '@culture_user',
    clientName: 'Анна Белова',
    service: 'Экскурсия',
    projectName: 'Третьяковка',
    status: 'queue'
  },
  {
    id: 6,
    date: '06.01.2025',
    account: '@tgclient',
    clientName: 'Иван Иванов',
    service: 'Спецпроект',
    projectName: 'Третьяковка',
    status: 'queue'
  },
  {
    id: 7,
    date: '07.01.2025',
    account: '@gallery_user',
    clientName: 'Олег Орлов',
    service: 'Экскурсия',
    projectName: 'Гараж',
    status: 'queue'
  },
  {
    id: 8,
    date: '08.01.2025',
    account: '@artspace',
    clientName: 'Елена Морозова',
    service: 'Спецпроект',
    projectName: 'Третьяковка',
    status: 'queue'
  }
]
