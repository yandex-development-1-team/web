import { MOCK_BOXES } from '@/mockData/mock_box_solutions'
import type { IBox } from './BoxSolutions.types'
import { Box } from './ui/Box'

const BoxSolutions = () => {
  const box = MOCK_BOXES[0] as IBox
  return (
    <>
      <div className="grid">
        <Box box={box}></Box>
      </div>
    </>
  )
}

export const Component = BoxSolutions
