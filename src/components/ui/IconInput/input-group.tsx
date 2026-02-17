import type { ComponentProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils.clsx'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input/Input'
import { Textarea } from '@/components/ui/Textarea'
import { buttonVariants } from '@/components/ui/button/Button.styles'
import type { ButtonProps } from '../button/Button.types'

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

const inputGroupAddonVariants = cva(
  "text-text caret-(--caret) cursor-(--input-border-active) text-h5 font-display flex h-auto items-center justify-center gap-2 py-1.5 select-none [&>svg:not([class*='size-'])]:size-6 [&>kbd]:rounded-[calc(var(--radius)-5px)] group-data-[disabled=true]/input-group:opacity-50",
  {
    variants: {
      align: {
        'inline-start': 'order-first pl-3 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]',
        'inline-end': 'order-last pr-3 has-[>button]:mr-[-0.45rem] has-[>kbd]:mr-[-0.35rem]',
        'block-start':
          'order-first w-full justify-start px-3 pt-3 [.border-b]:pb-3 group-has-[>input]/input-group:pt-2.5',
        'block-end': 'order-last w-full justify-start px-3 pb-3 [.border-t]:pt-3 group-has-[>input]/input-group:pb-2.5'
      }
    },
    defaultVariants: {
      align: 'inline-start'
    }
  }
)

function InputGroupAddon({
  className,
  align = 'inline-start',
  ...props
}: ComponentProps<'div'> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(
        inputGroupAddonVariants({ align }),
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

function InputGroupText({ className, ...props }: ComponentProps<'span'>) {
  return (
    <span
      className={cn(
        "text-muted-foreground flex items-center gap-2 text-sm [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function InputGroupInput({ className, ...props }: ComponentProps<'input'>) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        'flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent',
        className
      )}
      {...props}
    />
  )
}

function InputGroupTextarea({ className, ...props }: ComponentProps<'textarea'>) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn('flex-1 resize-none rounded-none border-0 focus-visible:ring-0 ', className)}
      {...props}
    />
  )
}

export { InputGroup, InputGroupAddon, InputGroupButton, InputGroupText, InputGroupInput, InputGroupTextarea }
