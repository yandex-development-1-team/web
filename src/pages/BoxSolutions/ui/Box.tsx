import box_image_placeholder from '@/assets/images/box_image_placeholder.png'
import { Card } from '@/components/ui/Card'
import { StatusLabel } from '@/components/ui/StatusLabel/StatusLabel'
import type { ComponentProps } from 'react'
import { STATUS_LABEL_MAP } from '../configs'
import type { IBox } from '../types'
import { BoxActions } from './BoxActions'

type BoxPropsType = {
  box: Pick<IBox, 'id' | 'name' | 'description' | 'status' | 'image'>
  onDelete: () => void
  onEdit: () => void
  onDetailsView: (id: string) => void
} & ComponentProps<'div'>

export const Box = ({ box, onDelete, onEdit, onDetailsView }: BoxPropsType) => {
  const { id, name, description, status, image } = box

  return (
    <Card
      className="flex flex-col relative shadow transition-shadow duration-300  hover:shadow-2xl"
      onClick={() => onDetailsView(String(id))}
    >
      <StatusLabel settings={STATUS_LABEL_MAP} status={status} className="top-8 right-8" />
      <div className="flex flex-col gap-3 grow">
        <div className="border-0 rounded-xl overflow-hidden h-36">
          <img src={image || box_image_placeholder} alt="" className="h-full w-full object-cover object-center" />
        </div>
        <p className="text-h4sb text-text">{name}</p>
        <p className="text-text text-xs">{description}</p>
      </div>
      <hr className="my-5 border-t border-grey-extra-light" />
      <BoxActions onDelete={onDelete} onEdit={onEdit} />
    </Card>
  )
}
