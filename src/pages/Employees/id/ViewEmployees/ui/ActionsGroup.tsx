import { Button } from '@/components/ui'
import type { ComponentProps, FC, SVGProps } from 'react'
import { cn } from '@/lib/utils.clsx'

type TContactAction = {
  id: string
  label: string
  variant: 'primary' | 'outline' | 'ghost' // соответствуют вашему ButtonProps
  Icon: FC<SVGProps<SVGSVGElement>>
  onClick?: () => void
}

type TActionProps = {
  actions: TContactAction[]
} & ComponentProps<'div'>

export const ActionsGroup = ({ actions, className, ...rest }: TActionProps) => {
  return (
    <div className={cn('flex flex-col gap-3 w-full', className)} {...rest}>
      {actions.map(action => {
        const Icon = action.Icon
        return (
          <Button
            key={action.id}
            variant={action.variant}
            size={'default'}
            onClick={action.onClick}
            className="flex items-center gap-2 p-1"
          >
            <Icon style={{ width: 'auto', height: '100%' }} />
            {action.label}
          </Button>
        )
      })}
    </div>
  )
}
