import type { BlockType } from './Block.types'

export const Block = ({ title, children }: BlockType) => {
  return (
    <div className="p-5 rounded-lg bg-system-background flex flex-col gap-5">
      <h2 className="text-h2 text-black leading-[1.4]">{title}</h2>
      {children}
    </div>
  )
}
