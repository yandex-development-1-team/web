import { MessageIcon, PhoneIcon, VideoIcon } from '@/assets/icons'
import type { FC, SVGProps } from 'react'

type TContactAction = {
  id: string
  label: string
  link: string
  variant: 'primary' | 'outline' | 'ghost'
  Icon: FC<SVGProps<SVGSVGElement>>
  onClick?: () => void
}

type EmployeeContacts = {
  phone: string
  email: string
}

export const getEmployeeActions = (contacts: EmployeeContacts): TContactAction[] => {
  return [
    {
      id: 'msg',
      link: `mailto:${contacts.email}`,
      label: 'Написать сообщение',
      variant: 'primary',
      Icon: MessageIcon,
      onClick: () => console.log('Message')
    },
    {
      id: 'call',
      link: `tel:${contacts.phone.replace(/\D/g, '')}`,
      label: 'Позвонить',
      variant: 'outline',
      Icon: PhoneIcon,
      onClick: () => console.log('Call')
    },
    {
      id: 'video',
      link: '',
      label: 'Видеозвонок',
      variant: 'outline',
      Icon: VideoIcon,
      onClick: () => console.log('Video')
    }
  ]
}
