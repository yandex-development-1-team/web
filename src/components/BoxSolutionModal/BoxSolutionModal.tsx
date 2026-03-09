import { useState } from 'react'
import { Button, CalendarInput, Input, Modal, Select, Switch, TimeRangeInput } from '@/components/ui'
import { AddIcon } from '@/assets/icons'
import type { BoxSolutionModalType } from './BoxSolutionModal.type'
import type { TimeRange } from '@/lib/utils.time'
import { mockSelectOptions } from '@/mockData/mockSelectOptions'

export const BoxSolutionModal = ({ isOpen, onClose, action }: BoxSolutionModalType) => {
  const [timeRange, setTimeRange] = useState<TimeRange | undefined>()
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${action === 'create' ? 'Создать' : 'Редактировать'} коробочное решение`}
      footer={
        <div className="flex justify-between w-full">
          <Button type="button" label="Отмена" variant="secondary" size="default" />
          <Button type="button" label="Сохранить" variant="primary" size="default" />
        </div>
      }
    >
      <form className="flex flex-col gap-[16px]">
        <div className="grid grid-cols-2 gap-y-[16px] gap-x-[12px]">
          <label className="flex flex-col gap-[3px]">
            <span className="text-xxs text-text-grey-dark">Название</span>
            <Input type="text" variant="text" />
          </label>
          <div className="flex gap-[12px] items-center pt-[4px] pr-[22px] justify-self-end self-start">
            <span className="text-h5">Активно</span>
            <Switch checked={true} onChange={() => {}} />
          </div>
          <CalendarInput variant="single" value={undefined} placeholder="Выберите дату" onChange={() => {}} />
          <TimeRangeInput value={timeRange} onChange={setTimeRange} className="flex-1" />
        </div>

        <label className="flex flex-col gap-[3px]">
          <span className="text-xxs text-text-grey-dark">Место</span>
          <Select options={mockSelectOptions} placeholder="Выберите место" classNames={{ trigger: 'w-full' }} />
        </label>

        <label className="flex flex-col gap-[3px]">
          <span className="text-xxs text-text-grey-dark">Описание</span>
          <Input type="text" variant="text" />
        </label>

        <label className="flex flex-col gap-[3px]">
          <span className="text-xxs text-text-grey-dark">Правила</span>
          <Input type="text" variant="text" />
        </label>

        <div className="flex gap-[12px]">
          <label className="flex flex-col gap-[3px] flex-1">
            <span className="text-xxs text-text-grey-dark">Стоимость</span>
            <Input type="text" variant="text" />
          </label>
          <label className="flex flex-col gap-[3px] flex-1">
            <span className="text-xxs text-text-grey-dark">Организатор</span>
            <Input type="text" variant="text" />
          </label>
        </div>

        <div
          className="flex gap-[12px] justify-center items-center py-[23px] 
          bg-grey-extra-light border border-grey-light rounded-[8px] text-xs"
        >
          <Button size="icon-48">
            <AddIcon className="size-full" />
          </Button>
          <span className="text-xs">Загрузить изображение</span>
        </div>
      </form>
    </Modal>
  )
}
