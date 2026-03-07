import { Card } from '@/components/ui/Card'
import type { IBox } from '../BoxSolutions.types'

export const Box = ({ box }: { box: IBox }) => {
  return (
    <Card className="max-w-86">
      <div className="flex flex-col gap-3">
        <div className="border-0 rounded-xl overflow-hidden">
          <img src={box.image}></img>
        </div>
        <p className="text-h4sb text-text">{box.name}</p>
        <p className="text-text text-xs">{box.description}</p>
      </div>
    </Card>
  )
}
