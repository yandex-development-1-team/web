import type { BlockType } from './Block.types'

export const Block = ({ title, children }: BlockType) => {
  return (
    <div className="p-[20px] rounded-[8px] bg-system-background flex flex-col gap-[20px]">
      <h2 className="text-h2 text-black leading-[1.4]">{title}</h2>
      {children}
    </div>
  )
}
