import { StatusLabel, type StatusSettings } from '@/components/ui/StatusLabel/StatusLabel'
import { Fragment } from 'react/jsx-runtime'
import type { BoxSolutionModalData, StatusType } from '../BoxManageModal/boxManageModal.type'

const STATUS_SETTINGS: StatusSettings<StatusType> = {
  active: {
    title: 'Активен в боте',
    styles: 'bg-labels-yellow-light'
  },
  inactive: {
    title: 'Не активен в боте',
    styles: 'bg-labels-grey-light'
  }
}

export const BoxDetails = ({ box }: { box: BoxSolutionModalData }) => {
  if (!box) return null

  const { name, image, price, organizer, description, location, rules, time_slots, is_active_in_bot } = box

  return (
    <div className="flex flex-col gap-8">
      <StatusLabel settings={STATUS_SETTINGS} status={is_active_in_bot ? 'active' : 'inactive'} className="self-end" />
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-[max-content_1fr] max-h-40 max-w-min overflow-y-auto gap-3 whitespace-nowrap pr-4">
          {time_slots.map((slot, i) => {
            const title = time_slots.length > 1 ? 'Даты' : 'Дата'
            return (
              <Fragment key={i}>
                {i === 0 ? <p className="mr-5">{`${title}`}</p> : <p>{''}</p>}
                <p>
                  {slot?.date || '-'}
                  {time_slots.length > 0 ? ` (с ${time_slots[0]?.time_from} до ${time_slots[0]?.time_to})` : ' - '}
                </p>
              </Fragment>
            )
          })}
        </div>
        <div className="grid grid-cols-[max-content_1fr]">
          <p className="mr-5">Место</p>
          <p>
            {name} ({location})
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-5 border-t border-grey-extra-light pt-8">
        <div className="flex gap-5">
          {image ? <img src={image} width={'186px'} height={'auto'} /> : 'Описание'}
          <p>{description}</p>
        </div>
        <div className="flex">
          <p className="mr-5">Правила</p>
          <p>{rules}</p>
        </div>
      </div>
      <div className="grid grid-cols-[min-content_1fr] gap-3 border-t border-grey-extra-light pt-8">
        <p className="mr-5">Стоимость</p>
        <p>{price} ₽</p>
        <p className="mr-5">Организатор</p>
        <p>{`"${organizer}"`}</p>
      </div>
    </div>
  )
}
