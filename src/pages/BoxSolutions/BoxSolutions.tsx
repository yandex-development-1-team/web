import { MOCK_BOXES } from '@/mockData/mock_box_solutions'
import type { IBox } from './BoxSolutions.types'
import { Box } from './ui/Box'

const BoxSolutions = () => {
  const boxes = MOCK_BOXES as IBox[]
  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,344px)] gap-5">
        {boxes.map(box => {
          return <Box box={box} key={box.id}></Box>
        })}
      </div>
    </>
  )
}

export const Component = BoxSolutions
