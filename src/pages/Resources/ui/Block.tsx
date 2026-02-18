import type { BlockType } from './Block.types'

export const Block = ({ title }: BlockType) => {
  return (
    <div className="p-[20px] rounded-[8px] bg-system-background flex flex-col gap-[20px]">
      <h2 className="font-display text-h2 text-black">{title}</h2>
    </div>
  )
}
