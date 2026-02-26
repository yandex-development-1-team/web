import type { ComponentProps } from 'react'
import { Slot } from 'radix-ui'
import { type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils.clsx'
import { BoxButtonVariants } from './BoxButton.styles'
import { AddIcon, BoxIcon, SpecialProjectsIcon, UsersIcon } from '@/assets/icons'

const ICONS = {
  users: UsersIcon,
  special_projects: SpecialProjectsIcon,
  box: BoxIcon
} as const

type IconType = keyof typeof ICONS

function BoxButton({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  icon,
  children,
  ...props
}: ComponentProps<'button'> &
  VariantProps<typeof BoxButtonVariants> & {
    asChild?: boolean
    icon?: IconType
  }) {
  const Comp = asChild ? Slot.Root : 'button'
  const IconComponent = icon ? ICONS[icon] : null

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(BoxButtonVariants({ variant, size, className }))}
      {...props}
    >
      <div className="flex items-center gap-3">
        {IconComponent && (
          <IconComponent
            className={`
          ${icon === 'box' && 'w-[37px] text-text-black-natural'}
          ${icon === 'special_projects' && 'w-[31px]'}
          ${icon === 'users' && 'w-[42px]'}
          shrink-0
        `}
          />
        )}
        {children}
      </div>
      <div
        className={cn(
          'flex size-12 shrink-0 items-center justify-center rounded-lg transition-all',
          variant === 'filled'
            ? 'bg-white'
            : 'bg-yellow-accent-light group-hover:bg-yellow-light group-active:bg-yellow-accent-dark'
        )}
      >
        <AddIcon className="size-6" />
      </div>
    </Comp>
  )
}

export { BoxButton }
