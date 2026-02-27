import type { ComponentProps, FC, SVGProps } from 'react'

export interface ITabs {
  id: string
  Icon: FC<SVGProps<SVGSVGElement>>
  title: string
}

export interface ITabsProps extends ComponentProps<'div'> {
  tabs: ITabs[]
  activeTab: string
  onTabClick: (id: string) => void
}

export type TFile = {
  id: string
  name: string
  size: number
}

export interface IFileItem extends ComponentProps<'li'> {
  file: TFile
  onDelete?: (id: string) => void
}

export interface TFileUploaderProps extends ComponentProps<'ul'> {
  files: TFile[] | undefined
  onDelete?: (id: string) => void
}
