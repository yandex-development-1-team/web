import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils.clsx'

function Textarea({ className, ...props }: ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        `border-(--input-border) border rounded-lg outline-none bg-transparent
        flex field-sizing-content min-h-15 w-full py-3 ps-3 pe-2
        font-display text-h5 text-(--color-text) caret-(--caret)
        transition-colors duration-200 ease-in-out
        placeholder:transition-colors placeholder:duration-200 placeholder:text-(--placeholder) placeholder:text-small placeholder:italic
        hover:border-(--input-border-active) hover:placeholder:text-(--placeholder-active)
        focus-visible:border-(--input-border-active) focus:placeholder:opacity-0
        aria-invalid:border-(--color-system-error)
        disabled:bg-(--color-grey-extra-light) disabled:text-(--input-border) disabled:pointer-events-none disabled:cursor-not-allowed disabled:placeholder:opacity-0`,
        'hide-resizer',
        className
      )}
      placeholder={props.placeholder ? props.placeholder : 'Место для текста'}
      {...props}
    />
  )
}

export { Textarea }
