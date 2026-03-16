import { Input } from '@/components/ui/Input'
import { useState, type ChangeEvent } from 'react'

type TPageSize = {
  pageSize: number
  onPageSizeChange: (size: number) => void
  min?: number
  max?: number
}

export const PageSize = ({ pageSize, onPageSizeChange, min = 1, max = 100 }: TPageSize) => {
  const [value, setValue] = useState<number | string>(pageSize)

  const handelChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      setValue('')
      return
    }
    const number = Number(e.target.value)
    setValue(number)
  }

  const handelBlur = () => {
    if (value === '') {
      setValue(1)
      onPageSizeChange(1)
      return
    }

    const validValue = Number(value)

    if (validValue < min) {
      setValue(min)
      onPageSizeChange(min)
      return
    }
    if (validValue > max) {
      setValue(max)
      onPageSizeChange(max)
      return
    }
    setValue(validValue)
    onPageSizeChange(validValue)
  }

  return (
    <div className="flex items-center gap-2 text-black">
      <span className="text-xs">Показывать по</span>

      <Input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={handelChange}
        onBlur={handelBlur}
        className="w-12 min-w-12 h-12 p-0 text-center outline-none border text-xs border-gray-300 rounded-lg bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
    </div>
  )
}
