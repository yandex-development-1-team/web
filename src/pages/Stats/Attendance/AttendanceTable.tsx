import { DeleteIcon } from '@/assets/icons'
import { Button, DataTable } from '@/components/ui'
import type { Column } from '@/components/ui/DataTable/DataTable.types'
import { memo } from 'react'
import type { AttendanceTableRow } from './types'

const columns: Column<AttendanceTableRow>[] = [
  { key: 'period', label: 'Период' },
  { key: 'attendance', label: 'Средняя посещаемость' },
  { key: 'dynamics', label: 'Динамика к предыдущему периоду' }
]

interface AttendanceTableProps {
  data: AttendanceTableRow[]
  onRemove: (id: string) => void
}

export const AttendanceTable = memo(({ data, onRemove }: AttendanceTableProps) => {
  return (
    <div className="min-[1235px]:col-span-2">
      <DataTable
        idKey="id"
        columns={columns}
        data={data}
        enableCheckboxes
        rowActions={row =>
          row.id === '_' ? null : (
            <Button
              variant="ghost"
              aria-label="Удалить строку"
              className="text-grey-dark hover:text-red-500 transition-colors"
              onClick={() => onRemove(row.id)}
            >
              <DeleteIcon className="size-5" />
            </Button>
          )
        }
      />
    </div>
  )
})
