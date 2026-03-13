import { cn } from '@/lib/utils.clsx'
import type { ComponentProps } from 'react'

type PaginationLimitProps = {
  limit: number
  onLimitChange: (val: number | undefined) => void
} & ComponentProps<'div'>

export const PaginationLimit = ({ limit, onLimitChange, className, ...props }: PaginationLimitProps) => {
  const handleChangeLimit = (e: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget
    let num = Number(input.value)

    if (!num || num < 1) num = 6
    if (num > 100) num = 100

    input.value = String(num)
    onLimitChange(num)
    input.blur()
  }

  return (
    <div className={cn('flex items-center gap-2 text-black', className)} {...props}>
      <span className="text-xxs">Показывать по</span>
      <input
        type="number"
        defaultValue={limit}
        onKeyDown={e => e.key === 'Enter' && handleChangeLimit(e)}
        onBlur={handleChangeLimit}
        className={cn(
          'w-10 h-10',
          'text-center text-xxs',
          'outline-none border border-gray-300 rounded-lg bg-white',
          '[appearance:textfield]',
          '[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
        )}
      />
    </div>
  )
}
