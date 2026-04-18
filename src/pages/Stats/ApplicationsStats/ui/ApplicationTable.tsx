import { DataTable } from '@/components/ui'
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
}

export const ApplicationTable = memo(({ data }: ApplicationTableProps) => {
  return (
    <div className="min-[1235px]:col-span-2">
      <DataTable idKey="id" columns={columns} data={data} enableCheckboxes />
    </div>
  )
})
