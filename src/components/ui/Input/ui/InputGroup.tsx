import type { ComponentProps } from 'react'
import { type VariantProps } from 'class-variance-authority'
import { Button, buttonVariants } from '@/components/ui/Button'
import { InputBasic } from './InputBasic'
import { cn } from '@/lib/utils.clsx'
import type { ButtonProps } from '@/components/ui/Button'
import { inputWithIconVariants } from './Input.styles'

function InputGroup({ disabled, className, ...props }: ComponentProps<'div'> & { disabled?: boolean }) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        'group/input-group relative flex w-full items-center border-(--input-border) border rounded-lg outline-none',
        'h-11 min-w-50 has-[>textarea]:h-auto',
        'hover:border-(--input-border-active) hover:placeholder:text-(--placeholder-active) hover:has-[>[data-slot=input-group-control]]:[&>div]:text-[var(--input-border-active)]',
        'transition-colors duration-200 ease-in-out',

        // Variants based on alignment.
        'has-[>[data-align=inline-start]]:[&>input]:pl-2',
        'has-[>[data-align=inline-end]]:[&>input]:pr-2',
        'has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3',
        'has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3',

        // Focus state.
        'has-[[data-slot=input-group-control]:focus-visible]:border-(--input-border-active) has-[[data-slot=input-group-control]:focus-visible]:placeholder:opacity-0',

        // Error state.
        'has-[[data-slot][aria-invalid=true]]:border-system-error',

        `${disabled ? ' bg-grey-extra-light opacity-40 text-(--input-border) pointer-events-none cursor-not-allowed placeholder:opacity-0' : ''}`,

        'aria-invalid:border-system-error',

        className
      )}
      {...props}
    />
  )
}

function InputGroupAddon({
  className,
  align = 'inline-start',
  ...props
}: ComponentProps<'div'> & VariantProps<typeof inputWithIconVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(
        inputWithIconVariants({ align }),
        'text-(--input-border) transition-colors duration-200 ease-in-out',
        className
      )}
      onClick={e => {
        if ((e.target as HTMLElement).closest('button')) {
          return
        }
        e.currentTarget.parentElement?.querySelector('input')?.focus()
      }}
      {...props}
    />
  )
}

function InputGroupButton({ className, type = 'button', variant = 'ghost', size = 'icon-32', ...props }: ButtonProps) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(buttonVariants({ size, variant }), 'hover:text-text active:text-(--input-border)', className)}
      {...props}
    />
  )
}

function InputGroupInput({ className, ...props }: ComponentProps<'input'>) {
  return (
    <InputBasic
      data-slot="input-group-control"
      className={cn(
        'flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent',
        className
      )}
      {...props}
    />
  )
}

export { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput }
