import { Card } from '@/components/ui/Card'
import image_placeholder from '@/assets/images/box_image_placeholder.png'
import type { IBox } from '../BoxSolutions.types'
import { BoxActions } from './BoxActions'
import { StatusLabel } from './StatusLabel'

type BoxPropsType = {
  box: Pick<IBox, 'id' | 'name' | 'description' | 'is_active_in_bot' | 'image'>
  onDelete: () => void
  onEdit: () => void
  onDetailsView: (id: string) => void
}

export const Box = ({ box, onDelete, onEdit, onDetailsView }: BoxPropsType) => {
  const { id, name, description, is_active_in_bot, image } = box
  return (
    <Card
      className="flex flex-col relative shadow transition-shadow duration-300  hover:shadow-2xl "
      onClick={() => onDetailsView(String(id))}
    >
      <StatusLabel isActive={is_active_in_bot} className="top-8 right-8" />
      <div className="flex flex-col gap-3 grow">
        <div className="border-0 rounded-xl overflow-hidden h-36">
          <img src={image || image_placeholder} alt="" className="h-full w-full object-cover object-center" />
        </div>
        <p className="text-h4sb text-text">{name}</p>
        <p className="text-text text-xs">{description}</p>
      </div>
      <hr className="my-5 border-t border-grey-extra-light" />
      <BoxActions onDelete={onDelete} onEdit={onEdit} />
    </Card>
  )
}
