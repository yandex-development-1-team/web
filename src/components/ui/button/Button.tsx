import type { ComponentProps } from 'react'
import { Slot } from 'radix-ui'
import { type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils.clsx'
import { buttonVariants } from './Button.styles'

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : 'button'

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button }
