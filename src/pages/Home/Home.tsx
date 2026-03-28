import { BoxButton, Button, DataTable } from '@/components/ui'
import { Application2 } from '@/assets/icons'
import { useState } from 'react'
import FilterDropdown from './ui/FilterDropdown'
import { headerTableData } from './homePageData'
import { bookingRequestsMock } from '@/mockData/bookingRequestsMock'

const Home = () => {
  const [statusFilter, setStatusFilter] = useState('all')
  const data = bookingRequestsMock

  const countQueue = data.filter(item => item.status === 'queue').length
  const countInProgress = data.filter(item => item.status === 'progress').length
  const countDone = data.filter(item => item.status === 'done').length

  const stats = [
    { title: 'Новые заявки', value: countQueue },
    { title: 'Заявки в работе', value: countInProgress }
  ]

  const handleBoxCreate = () => {}

  const handleSpecProjectCreate = () => {}

  const filteredData = statusFilter === 'all' ? data : data.filter(item => item.status === statusFilter)

  return (
    <div className="flex flex-col gap-[20px]">
      <h2 className="text-h2">Главная страница</h2>

      <div className="flex gap-[20px] items-end">
        {stats.map((stat, index) => (
          <div key={stat.title} className="flex flex-col flex-1">
            <span className="text-h5 mb-[8px] text-text-grey-dark">{stat.title}</span>

            <Button
              className={`h-[92px] text-[48px] font-bold ${index === 1 ? 'bg-white border border-grey-light' : ''}`}
            >
              {stat.value}
            </Button>
          </div>
        ))}

        <BoxButton onClick={handleBoxCreate} icon="box" className="max-w-[407px]">
          Создать коробку
        </BoxButton>
      </div>

      <div className="flex gap-[20px] h-[92px]">
        <div className="flex justify-between items-center flex-1 border bg-white  border-grey-light  rounded-[8px] px-[43px] min-w-[468px] ">
          <div className="flex items-center lg:gap-[12px] gap-[3px]">
            <Application2 width={32} height={32} />
            <span className="text-h5 font-semibold">Мои заявки</span>
          </div>

          <div className="flex lg:gap-[20px] gap-[10px]">
            <div className="flex flex-col justify-center items-center min-w-[100px] lg:gap-[4px] gap-[2px] xl:min-w-[185px] text-text-grey-dark">
              <span className="text-h5 ">В работе: </span>
              <span className="text-h3 font-bold">{countInProgress}</span>
            </div>

            <div className="flex flex-col justify-center items-center min-w-[100px] gap-[4px] max-w-[185px] text-text-grey-dark ">
              <span className="text-h5 ">Обработаны: </span>
              <span className="text-h3 font-bold">{countDone}</span>
            </div>
          </div>
        </div>

        <BoxButton onClick={handleSpecProjectCreate} icon="special_projects" className="max-w-[407px]">
          Создать спецпроект
        </BoxButton>
      </div>

      <div>
        <h3 className="mb-[12px] text-h3">Заявки на бронирование</h3>

        <div className="min-w-[320px]">
          <div className="flex flex-col gap-[4px] mb-[19px]">
            <span className="text-xxs text-text-grey-dark">Фильтр</span>
            <FilterDropdown
              onChange={setStatusFilter}
              className="text-text-grey-light text-small italic px-[6px] py-[12px] border border-grey-light rounded-[8px] pl-[12px] xl:min-w-[494px]  md:min-w-[320px] bg-white"
            />
          </div>
          <DataTable idKey="id" data={filteredData} enableLoadMore columns={headerTableData} />
        </div>
      </div>
    </div>
  )
}
export const Component = Home
