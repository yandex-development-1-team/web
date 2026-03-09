import { Card } from '@/components/ui/Card'
import image_placeholder from '@/mockData/box_image_placeholder.png'
import type { IBox } from '../BoxSolutions.types'
import { BoxActions } from './BoxActions'
import { StatusLabel } from './StatusLabel'

export const Box = ({ box }: { box: IBox }) => {
  return (
    <>
      <Card className="max-w-86 relative">
        <StatusLabel status={box.status} className="top-8 right-8" />
        <div className="flex flex-col gap-3">
          <div className="border-0 rounded-xl overflow-hidden h-36">
            <img src={box.image || image_placeholder} alt="" className="h-full w-full object-cover object-center" />
          </div>
          <p className="text-h4sb text-text">{box.name}</p>
          <p className="text-text text-xs">{box.description}</p>
        </div>
        <hr className="my-5 border-t border-grey-extra-light" />
        <BoxActions onDelete={() => {}} onEdit={() => {}} />
      </Card>
    </>
  )
}
