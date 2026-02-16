import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils.clsx'

function Input({ className, type, ...props }: ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        `border-(--input-border) border rounded-lg h-11 w-full min-w-25 bg-transparent py-3 ps-3 pe-1
        font-display text-h5 text-text outline-none caret-(--caret)`,
        'transition-colors duration-200 ease-in-out',
        'placeholder:transition-colors placeholder:duration-200 placeholder:text-(--placeholder) placeholder:text-small placeholder:italic',
        'hover:border-(--input-border-active) hover:placeholder:text-(--placeholder-active)',
        'focus-visible:border-(--input-border-active) focus:placeholder:opacity-0',
        'disabled:bg-grey-extra-light disabled:opacity-40 disabled:pointer-events-none disabled:cursor-not-allowed disabled:placeholder:opacity-0',
        'aria-invalid:border-system-error',
        className
      )}
      placeholder={props.placeholder ? props.placeholder : 'Teкст'}
      {...props}
    />
  )
}
export { Input }
