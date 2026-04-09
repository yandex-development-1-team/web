import type { FC } from 'react'

export type TeammateCardType = {
  name: string
  grade: number
  isActive: boolean
  email: string
  phone: string
}

export type ContactType = {
  link: string
  action: string
  Icon: FC<React.SVGProps<SVGSVGElement>>
  iconClassName?: string
}
