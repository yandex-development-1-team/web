import { BoxOperationIcon } from '@/assets/icons'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils.clsx'
import { DropdownMenu } from 'radix-ui'
import { type ComponentProps } from 'react'

type IDropdownItem = {
  value: string
  label: string
  active: boolean
}

type IDropdown = {
  options: IDropdownItem[]
  onSelect?: (value: IDropdownItem['value']) => void
  className?: string
} & ComponentProps<typeof DropdownMenu.Root>

export const Dropdown = ({ options, onSelect, className }: IDropdown) => {
  const handleSelect = (selectedItem: IDropdownItem) => {
    onSelect?.(selectedItem.value)
  }
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button variant="secondary" className="size-11.5 border-grey-light ">
          <BoxOperationIcon className=" size-8" />
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={cn(
            `bg-white text-text
          data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)
          rounded-lg border border-(--select-content-border) shadow-(--select-content-shadow)
          relative z-50 max-h-(--radix-select-content-available-height) min-w-32
          overflow-x-hidden overflow-y-auto ${className}`
          )}
          align="end"
        >
          {options.map(item => (
            <DropdownMenu.Item
              key={item.value}
              className={cn(
                `relative flex w-full items-center gap-2 font-display text-text
                    rounded-sm py-2 pr-8 pl-2 text-xs outline-hidden
                    focus:bg-(--select-option-hover) focus:text-accent-foreground
                    cursor-pointer
                    ${item.active ? 'bg-(--select-option-hover) text-accent-foreground' : 'hover:bg-(--select-option-hover) hover:text-accent-foreground'}
                    *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2`
              )}
              onClick={() => handleSelect(item)}
            >
              {item.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
