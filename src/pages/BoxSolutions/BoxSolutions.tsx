import { AddIcon, BoxIcon } from '@/assets/icons'
import { Button } from '@/components/ui'
import { MOCK_BOXES } from '@/mockData/mock_box_solutions'
import type { IBox } from './BoxSolutions.types'
import { Box } from './ui/Box'

const BoxSolutions = () => {
  const boxes = MOCK_BOXES as IBox[]
  return (
    <div className="max-w-382">
      <div className="flex justify-between h-18 mb-5">
        <h1 className="text-h2 text-text">Коробочные решения</h1>
        <Button variant={'default'} className="p-5">
          <BoxIcon style={{ width: 'auto', height: '100%' }} />
          Создать коробку
          <AddIcon style={{ width: 'auto', height: '100%' }} className="border border-white bg-white rounded-lg" />
        </Button>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,344px)] gap-5">
        {boxes.map(box => {
          return <Box box={box} key={box.id} />
        })}
      </div>
    </div>
  )
}

export const Component = BoxSolutions
