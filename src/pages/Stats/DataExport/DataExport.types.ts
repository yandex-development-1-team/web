import type { ComponentProps, FC, SVGProps } from 'react'

export type TPath = 'employees' | 'attendance' | 'boxes' | 'users'

export interface ITabs {
  id: string
  path: TPath
  title: string
  Icon: FC<SVGProps<SVGSVGElement>>
}

export interface ITabsProps extends ComponentProps<'div'> {
  tabs: ITabs[]
  activeTab: string
  onTabClick: (path: TPath) => void
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
