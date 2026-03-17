import { DataTable } from '@/components/DataTable'
import { BoxButton, Button } from '@/components/ui'
import { bookingRequestsMock, headerTableData } from './mockData'
import { Application2 } from '@/assets/icons'
import { useState } from 'react'
import FilterDropdown from './ui/FilterDropdown'
import type { StatusType } from './types'

const Home = () => {
  const [statusFilter, setStatusFilter] = useState('all')
  const [data, setData] = useState(bookingRequestsMock)

  const countQueue = data.filter(item => item.status === 'queue').length
  const countInProgress = data.filter(item => item.status === 'progress').length
  const countDone = data.filter(item => item.status === 'done').length

  const stats = [
    { title: 'Новые заявки', value: countQueue },
    { title: 'Заявки в работе', value: countInProgress }
  ]

  const handleBoxCreate = () => {}

  const handleSpecProjectCreate = () => {}

  const handleStatusChange = (id: number, newStatus: StatusType) => {
    setData(prev => prev.map(item => (item.id === id ? { ...item, status: newStatus } : item)))
  }

  const filteredData = statusFilter === 'all' ? data : data.filter(item => item.status === statusFilter)

  return (
    <div className="flex flex-col gap-[20px] flex-1 w-full max-w-full">
      <h2 className="text-h2">Главная страница</h2>

      <div className="flex gap-[20px] ">
        {stats.map((stat, index) => (
          <div key={stat.title} className="flex flex-col flex-1 ">
            <span className="text-h5 mb-[8px] text-grey-dark">{stat.title}</span>

            <Button
              className={`min-w-[308px] h-[92px] text-[48px] font-bold ${
                index === 1 ? 'bg-white border border-grey-light' : ''
              }`}
            >
              {stat.value}
            </Button>
          </div>
        ))}

        <BoxButton onClick={handleBoxCreate} icon="box" className="min-w-[407px] max-w-[412px] mt-[30px]">
          Создать коробку
        </BoxButton>
      </div>

      <div className="flex gap-[20px] h-[92px] ">
        <div className="flex justify-between items-center flex-1 min-w-[638px] border-box  border border-grey-light rounded-[8px] px-[43px]">
          <div className="flex  gap-[8px]  max-w-[844px] ">
            <Application2 width={32} height={32} />
            <span className="text-h5 font-semibold">Мои заявки</span>
          </div>

          <div className="flex gap-[20px] ">
            <div className="flex flex-col justify-center items-center p-[20px] gap-[4px] text-grey-dark w-[185px]">
              <span className="text-h5 ">В работе: </span>
              <span className="text-h3 font-bold">{countInProgress}</span>
            </div>

            <div className="flex flex-col justify-center items-center gap-[4px] text-grey-dark w-[185px]">
              <span className="text-h5 ">Обработаны: </span>
              <span className="text-h3 font-bold">{countDone}</span>
            </div>
          </div>
        </div>

        <BoxButton onClick={handleSpecProjectCreate} icon="special_projects" className="min-w-[407px] max-w-[412px]">
          Создать спецпроект
        </BoxButton>
      </div>

      <div>
        <h3 className="mb-[12px] text-h3">Заявки на бронирование</h3>

        <div className="min-w-[320px]">
          <div className="flex flex-col gap-[4px] mb-[19px]">
            <span className="text-xxs text-grey-dark">Фильтр</span>
            <FilterDropdown
              onChange={setStatusFilter}
              className="text-grey-light text-small italic  px-[6px]  py-[12px] border border-grey-light rounded-[8px] pl-[12px]   min-w-[320px] max-w-[494px] bg-white"
            />
          </div>
          <DataTable idKey="id" data={filteredData} enableLoadMore columns={headerTableData(handleStatusChange)} />
        </div>
      </div>
    </div>
  )
}
export const Component = Home
