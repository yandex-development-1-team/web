import type { FC } from 'react'
import { EditIcon, PhoneIcon } from '@/assets/icons'

type ContactType = {
  link: string
  action: string
  Icon: FC<React.SVGProps<SVGSVGElement>>
  iconClassName?: string
}

export const getContacts = (email: string, phone: string): ContactType[] => [
  {
    link: `mailto:${email}`,
    action: 'Написать',
    Icon: EditIcon,
    iconClassName: 'w-[16px]'
  },
  {
    link: `tel:${phone.replace(/[^\d+]/g, '')}`,
    action: 'Позвонить',
    Icon: PhoneIcon,
    iconClassName: 'w-[32px] -mr-[6px]'
  }
]
