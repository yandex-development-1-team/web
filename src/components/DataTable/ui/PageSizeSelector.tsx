type Props = {
  pageSize: number
  onPageSizeChange: (size: number) => void
  min?: number
  max?: number
}

export default function PageSizeSelector({ pageSize, onPageSizeChange, min = 3, max = 200 }: Props) {
  return (
    <div className="flex items-center gap-2 text-black">
      <span className="text-xxs">Показывать по</span>

      <input
        type="numeric"
        value={pageSize}
        min={min}
        max={max}
        onChange={e => onPageSizeChange(Number(e.target.value))}
        className="w-[36px] h-[36px] text-center outline-none border text-xxs border-gray-300 rounded-[8px]  bg-white"
      />
    </div>
  )
}
