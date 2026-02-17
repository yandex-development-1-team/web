import { Slot } from 'radix-ui'
import { cn } from '@/lib/utils.clsx'
import { buttonVariants } from './Button.styles'
import type { ButtonProps } from './Button.types'

function Button({
  className,
  variant = 'primary',
  size = 'default',
  asChild = false,
  label,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : 'button'

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {label}
      {children}
    </Comp>
  )
}

export { Button }
