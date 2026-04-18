import type { Column } from '@/components/ui/DataTable/DataTable.types'
import type { TTableEvent } from '@/types/schedule.types'

export const COLUMN_CALENDAR_CONFIG: Column<TTableEvent>[] = [
  { key: 'box_name', label: 'Название', sortable: true },
  { key: 'time', label: 'Время', sortable: false },
  { key: 'location', label: 'Место', sortable: false }
]

export const COLUMN_TABLE_CONFIG: Column<TTableEvent>[] = [
  { key: 'date', label: 'Дата', sortable: false },
  { key: 'time', label: 'Время', sortable: false },
  { key: 'box_name', label: 'Название', sortable: true },
  { key: 'total_slots', label: 'Количество мест', sortable: false },
  { key: 'occupied_slots', label: 'Забронированные места', sortable: false }
]

export const SORT_OPTIONS_TABLE = [
  { value: 'box_name', label: 'По названию', active: true },
  { value: 'time', label: 'По времени', active: false }
]

export const SORT_OPTIONS_CALENDAR = [
  { value: 'box_name', label: 'По названию', active: true },
  { value: 'location', label: 'По месту', active: false }
]
