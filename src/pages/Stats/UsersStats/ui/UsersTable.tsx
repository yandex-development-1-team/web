import { useState, useMemo } from 'react'
import { DataTable } from '@/components/ui'
import type { Column } from '@/components/ui/DataTable/DataTable.types'
import Pagination from '@/components/ui/DataTable/ui/Pagination'
import { Card } from '@/components/ui/Card'
import type { IUsersStats } from '@/types/users_stats'

export const UsersTable = ({ data }: { data: IUsersStats[] }) => {
  const pageSize = 10
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(data.length / pageSize)

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return data.slice(start, start + pageSize)
  }, [data, currentPage, pageSize])

  const handlePageChange = (page: number) => setCurrentPage(page)

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
      <div className="flex justify-end pt-0">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}></Pagination>
      </div>
    </Card>
  )
}
