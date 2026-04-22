import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DataTable } from '@/components/ui'
import type { Column } from '@/components/ui/DataTable/DataTable.types'
import { Pagination } from '@/components/ui/Pagination'
import { Card } from '@/components/ui/Card'
import type { IUsersStats } from '@/types/users_stats'

export const UsersTable = ({ data }: { data: IUsersStats[] }) => {
  const pageSize = 10

  const [searchParams] = useSearchParams()
  const offset = Number(searchParams.get('offset')) || 0

  const paginatedData = useMemo(() => {
    return data.slice(offset, offset + pageSize)
  }, [data, offset, pageSize])

  const columns: Column<IUsersStats>[] = [
    { key: 'name', label: 'Пользователь', sortable: true },
    { key: 'recordsCount', label: 'Количество записей' },
    { key: 'visitFrequency', label: 'Частота визитов' },
    { key: 'boxes', label: 'Коробки' },
    { key: 'cancellations', label: 'Отмены' }
  ]

  return (
    <Card className="overflow-hidden rounded-lg px-0 pt-0">
      <DataTable idKey="id" columns={columns} data={paginatedData} />
      <Pagination
        variant="nav"
        pagination={{
          limit: pageSize,
          offset: offset,
          total: data.length
        }}
      />
    </Card>
  )
}
