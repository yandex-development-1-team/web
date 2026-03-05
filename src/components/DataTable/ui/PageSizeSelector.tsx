type Props = {
  pageSize: number
  onPageSizeChange: (size: number) => void
  min?: number
  max?: number
}

export default function PageSizeSelector({ pageSize, onPageSizeChange, min = 1, max = 200 }: Props) {
  return (
    <div className="flex items-center gap-2 text-black">
      <span className="text-xxs">Показывать по</span>

      <input
        type="number"
        value={pageSize}
        min={min}
        max={max}
        onChange={e => {
          const val = e.target.value
          onPageSizeChange(Number(val))
        }}
        onBlur={() => {
          if (pageSize < min) onPageSizeChange(min)
          if (pageSize > max) onPageSizeChange(max)
        }}
        className="w-[36px] h-[36px] text-center outline-none border text-xxs border-gray-300 rounded-[8px] bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
    </div>
  )
}
