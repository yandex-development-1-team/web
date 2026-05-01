import { Button } from '@/components/ui'
import { cn } from '@/lib/utils.clsx'
import type { ComponentProps, FC, SVGProps } from 'react'
import { LabelInDevelopment } from '@/components/ui'

type TContactAction = {
  id: string
  label: string
  link: string
  variant: 'primary' | 'outline' | 'ghost'
  Icon: FC<SVGProps<SVGSVGElement>>
  onClick?: () => void
}

type TActionProps = {
  actions: TContactAction[]
} & ComponentProps<'div'>

export const Actions = ({ actions, className, ...rest }: TActionProps) => {
  return (
    <div className={cn('flex flex-col gap-3 w-full', className)} {...rest}>
      {actions.map(action => {
        const Icon = action.Icon
        return (
          <div className="relative">
            <Button
              key={action.id}
              variant={action.variant}
              size={'default'}
              onClick={action.onClick}
              className={cn(
                'p-2 w-full',
                'ring-0 shadow-[1px_2px_3px_rgba(0,0,0,0.3)]',
                'transition-all duration-300 ease-in-out',
                'hover:shadow-[1px_4px_5px_rgba(0,0,0,0.3)]'
              )}
            >
              <a
                href={action.link}
                className="flex items-center gap-2 h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon style={{ width: 'auto', height: '100%' }} />
                {action.label}
              </a>
            </Button>
            {action.link === '' && <LabelInDevelopment />}
          </div>
        )
      })}
    </div>
  )
}
