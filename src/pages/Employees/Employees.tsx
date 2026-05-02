import { ROUTES } from '@/app/router'
import { BoxFilter, DownloadIcon } from '@/assets/icons'
import { Button, DataTable, Loader } from '@/components/ui'
import { sortData } from '@/components/ui/DataTable/helpers'
import { Pagination } from '@/components/ui/Pagination'
import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFetchUserList } from './api/userQueries'
import { COLUMNS_CONFIG, SORT_OPTIONS } from './configs'
import type { UserListItem } from './employees.types'
import { useClickOutside } from './hooks/useClickOutside'
import { QueryFilters } from './ui/QueryFilters'

const Employees = () => {
  const navigate = useNavigate()
  const [filter, setFilter] = useState(false)
  const [select, setSelect] = useState<UserListItem[]>([])
  const [sortConfig, setSortConfig] = useState<{
    key: keyof UserListItem
    direction: 'asc' | 'desc'
  } | null>(null)

  const { userList, pagination, isPending } = useFetchUserList()
  const filterRef = useRef<HTMLDivElement>(null)

  useClickOutside(filterRef, () => setFilter(false))

  const handleOpenFilter = () => {
    setFilter(prev => !prev)
  }

  const handleSort = (key: keyof UserListItem) => {
    setSortConfig(prev =>
      prev?.key === key ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' } : { key, direction: 'asc' }
    )
  }

  const handleDownload = () => void select

  if (isPending) return <Loader />

  const sortedUserList = sortData(userList ?? [], sortConfig)

  const handleCreateEmployee = () => {
    navigate(ROUTES.employeesCreate)
  }

  return (
    <>
      <div className="p-5 bg-white rounded-lg mb-5">
        <h2 className="mb-8 text-h2">Управление пользователями и правами</h2>
        <div className="flex items-center gap-5 h-12">
          <Button onClick={handleCreateEmployee} className="py-3 px-8 min-w-60.25">
            Добавить сотрудника
          </Button>
          <QueryFilters className="w-full" />
          <div className="flex gap-2.5">
            <div className="relative" ref={filterRef}>
              <Button className="p-4 bg-transparent border-grey-border" onClick={handleOpenFilter}>
                <BoxFilter />
              </Button>
              {filter && (
                <div className="absolute top-14.5 right-0 bg-white my-1 border border-blue-light text-xs rounded-[8px]">
                  <ul className="w-36">
                    {SORT_OPTIONS.options.map(option => {
                      const isSelected = option.value === sortConfig?.key
                      return (
                        <li
                          key={option.value}
                          className={`py-2 px-3 cursor-pointer hover:bg-grey-blue-light transition-colors duration-300 ${isSelected && 'bg-grey-extra-light'}`}
                          onClick={() => {
                            handleSort(option.value as keyof UserListItem)
                            setFilter(false)
                          }}
                        >
                          {option.label}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
            </div>
            <Button onClick={handleDownload} className="p-4 bg-transparent border-grey-border">
              <DownloadIcon />
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-2">
        <DataTable
          idKey="id"
          columns={COLUMNS_CONFIG}
          data={sortedUserList}
          pagination={<Pagination pagination={pagination} className="m-4" />}
          enableCheckboxes
          enableLoadMore
          onSelect={setSelect}
          onRowClick={data => navigate(`/employees/${data.id}`)}
        />
      </div>
    </>
  )
}

export const Component = Employees
