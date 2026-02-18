import type { ComponentProps } from 'react'
import { Select as SelectPrimitive } from 'radix-ui'
import { cn } from '@/lib/utils.clsx'
import { ArrowIcon, CheckIcon } from '@/assets/icons'

type TSelect = {
  options: {
    value: string
    label: string
  }[]
  placeholder: string
  classNames?: {
    trigger?: string
    value?: string
    content?: string
    item?: string
  }
} & ComponentProps<typeof SelectPrimitive.Root>

export function Select({ options, placeholder, classNames, ...props }: TSelect) {
  return (
    <SelectBase {...props}>
      <SelectTrigger className={classNames?.trigger}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={classNames?.content}>
        {options.map(o => {
          return (
            <SelectItem value={o.value} className={classNames?.item}>
              {o.label}
            </SelectItem>
          )
        })}
      </SelectContent>
    </SelectBase>
  )
}

export function SelectBase({ ...props }: ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

export function SelectGroup({ ...props }: ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

export function SelectValue({ ...props }: ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

export function SelectTrigger({ className, children, ...props }: ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      className={cn(
        `border-(--input-border) border rounded-lg h-11 min-w-37 bg-transparent p-3 pe-2 outline-none
        flex w-fit items-center justify-between gap-2
        font-display text-xs whitespace-nowrap
        data-[placeholder]:text-(--input-border) data-[placeholder]:italic [&_svg:not([class*='text-'])]:text-(--input-border)
        focus-visible:border-(--input-border-active)
        aria-invalid:border-system-error
        disabled:cursor-not-allowed disabled:opacity-40 disabled:bg-grey-extra-light
        data-[state=open]:[&>svg]:rotate-180 transition-[color,box-shadow] transition-transform duration-200 ease-in-out
        *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2
        [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ArrowIcon className="size-8" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

export function SelectContent({
  className,
  children,
  position = 'popper',
  align = 'center',
  ...props
}: ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          `bg-white text-text
          data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)
          rounded-lg border border-(--select-content-border) shadow-(--select-content-shadow)
          relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem]
          overflow-x-hidden overflow-y-auto`,
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className
        )}
        position={position}
        align={align}
        sideOffset={3}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            'py-1.5 px-1',
            position === 'popper' &&
              'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1'
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

export function SelectLabel({ className, ...props }: ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn('font-display px-2 py-1.5 text-xxs', className)}
      {...props}
    />
  )
}

export function SelectItem({ className, children, ...props }: ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        `relative flex w-full cursor-default items-center gap-2 font-display text-text
        rounded-sm py-2 pr-8 pl-2 text-xs outline-hidden
        focus:bg-(--select-option-hover) focus:text-accent-foreground
        [&_svg:not([class*='text-'])]:text-(--select-check) [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4
        data-[disabled]:pointer-events-none data-[disabled]:opacity-50
        *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2`,
        className
      )}
      {...props}
    >
      <span data-slot="select-item-indicator" className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-6" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

export function SelectSeparator({ className, ...props }: ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn('bg-(--input-border-color) pointer-events-none -mx-1 my-1 h-px', className)}
      {...props}
    />
  )
}

export function SelectScrollUpButton({ className, ...props }: ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      {...props}
    >
      <ArrowIcon className="size-5 rotate-180" />
    </SelectPrimitive.ScrollUpButton>
  )
}

export function SelectScrollDownButton({
  className,
  ...props
}: ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn('flex cursor-default items-center justify-center py-1', className)}
      {...props}
    >
      <ArrowIcon className="size-5" />
    </SelectPrimitive.ScrollDownButton>
  )
}
