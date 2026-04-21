import { DataTable, Button } from '@/components/ui'
import { DeleteIcon } from '@/assets/icons'
import type { Column } from '@/components/ui/DataTable/DataTable.types'
import type { BoxStatsTableRow } from '@/pages/Stats/ApplicationsStats/ApplicationStats.types'
import { memo } from 'react'

const columns: Column<BoxStatsTableRow>[] = [
  { key: 'name', label: 'Название коробки' },
  { key: 'period', label: 'Период' },
  { key: 'records', label: 'Количество записей' },
  { key: 'visits', label: 'Реальные посещения' }
]

interface ApplicationTableProps {
  data: BoxStatsTableRow[]
  onRemove: (id: string) => void
}

export const ApplicationTable = memo(({ data, onRemove }: ApplicationTableProps) => {
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
