import { cn } from '@/lib/utils.clsx'
import { Slot } from 'radix-ui'
import { buttonVariants } from './Button.styles'
import type { ButtonProps } from './Button.types'

function Button({
  className,
  variant = 'primary',
  size,
  asChild = false,
  label,
  children,
  leftIcon,
  rightIcon,
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
      {leftIcon}
      {label}
      {children}
      {rightIcon}
    </Comp>
  )
}

export { Button }
