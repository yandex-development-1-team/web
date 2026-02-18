import type { ComponentProps, FC, SVGProps } from 'react'

export interface ITabs {
  id: string
  Icon: FC<SVGProps<SVGSVGElement>>
  title: string
}

export interface ITabsProps extends ComponentProps<'div'> {
  tabs: ITabs[]
}
