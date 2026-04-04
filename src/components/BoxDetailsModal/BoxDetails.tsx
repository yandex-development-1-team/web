import type { IBox } from '@/pages/BoxSolutions/BoxSolutions.types'
import { StatusLabel } from '@/pages/BoxSolutions/ui/StatusLabel'

export const BoxDetails = ({ box }: { box: IBox }) => {
  if (!box) return null

  const { name, date, image, price, organizer, description, location, rules, time_slots, is_active_in_bot } = box

  const formattedDate = date.replace(/(\d{2})(\d{2})(\d{4})/, '$1.$2.$3')

  return (
    <div className="flex flex-col gap-8">
      <StatusLabel isActive={is_active_in_bot} className="self-end" />
      <div className="grid grid-cols-[min-content_1fr] gap-3">
        <p className="mr-5">Дата</p>
        <p>{formattedDate}</p>
        <p className="mr-5">Время</p>
        <p>
          с {time_slots[0].time_from} до {time_slots[0].time_to}
        </p>
        <p className="mr-5">Место</p>
        <p>
          {name} ({location})
        </p>
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
