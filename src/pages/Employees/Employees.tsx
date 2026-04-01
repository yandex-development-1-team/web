import { BoxFilter, DownloadIcon, SearchIcon, SortByNumbersIcon } from '@/assets/icons'
import { Button, DataTable, Input } from '@/components/ui'
import { useState } from 'react'
import { employees, type Employee } from './mockData'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/app/router'
import type { Column } from '@/components/ui/DataTable/DataTable.types'
import { sortData } from '@/components/ui/DataTable/helpers'

const Employees = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState(false)
  const [select, setSelect] = useState<Employee[]>([])
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Employee
    direction: 'asc' | 'desc'
  } | null>(null)

  const sortOptions = [
    { label: 'По отделу', key: 'department' },
    { label: 'По должности', key: 'position' },
    { label: 'По уровню', key: 'level' }
  ]

  const handleOpenFilter = () => {
    setFilter(prev => !prev)
  }

  const handleSort = (key: keyof Employee) => {
    setSortConfig(prev =>
      prev?.key === key ? { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' } : { key, direction: 'asc' }
    )
  }

  const handleDownload = () => void select

  const filtered = employees.filter(e => e.name.toLowerCase().includes(search.toLowerCase()))

  const sorted = sortData(filtered, sortConfig)

  const addEmployees = () => {
    navigate(ROUTES.employeesCreate)
  }

  const columns: Column<Employee>[] = [
    { key: 'id', label: 'ID' },
    {
      key: 'name',
      label: 'Имя сотрудника',
      sortable: true,
      render: (value, row) => (
        <span className="cursor-pointer" onClick={() => navigate(`/employees/${row.id}`)}>
          {value}
        </span>
      )
    },
    {
      key: 'department',
      label: 'Отдел, руководитель',
      render: (_, row) => (
        <div className="flex flex-col">
          <div>{row.department}</div>
          <div className="text-grey-dark text-sm">{row.manager ?? '—'}</div>
        </div>
      )
    },
    { key: 'position', label: 'Должность' },
    {
      key: 'level',
      label: 'Уровень',
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <span>{row.level}</span>
          <Button
            onClick={() => handleSort('level')}
            className="bg-transparent border border-grey-dark p-[8px] w-[40px] h-[40px]"
          >
            <div className="w-[24px] flex items-center justify-center">
              <SortByNumbersIcon />
            </div>
          </Button>
        </div>
      )
    },
    { key: 'phone', label: 'Телефон' },
    { key: 'email', label: 'Эл. адрес' }
  ]

  return (
    <>
      <div className="p-5  bg-white rounded-[8px] mb-[20px]">
        <h2 className="mb-8 text-h2">Управление пользователями и правами</h2>
        <div className="flex items-center gap-5 h-[48px]">
          <Button onClick={addEmployees} className="py-[12px] px-[32px] min-w-[241px]">
            Добавить сотрудника
          </Button>
          <Input
            variant="icon"
            icon={<SearchIcon />}
            onChange={e => setSearch(e.target.value)}
            className="h-[44px] my-0.5 min-w-[241px] py-[14px] w-full pl-[12px] rounded-[8px]"
            placeholder=""
          />

          <div className="flex gap-[10px]">
            <div className="relative">
              <Button className="p-4 bg-transparent  border-grey-border " onClick={handleOpenFilter}>
                <BoxFilter />
              </Button>
              {filter && (
                <div className="absolute top-[58px] right-0 bg-white my-[4px] border border-blue-light text-xs rounded-[8px]">
                  <ul className="w-[144px]">
                    {sortOptions.map(option => (
                      <li
                        key={option.key}
                        className="py-[9px] px-[12px] cursor-pointer hover:bg-grey-blue-light"
                        onClick={() => {
                          handleSort(option.key as keyof Employee)
                          setFilter(false)
                        }}
                      >
                        {option.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <Button onClick={handleDownload} className="p-4 bg-transparent  border-grey-border">
              <DownloadIcon />
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-[8px]">
        <DataTable idKey="id" columns={columns} data={sorted} enableCheckboxes enableLoadMore onSelect={setSelect} />
      </div>
    </>
  )
}

export const Component = Employees
