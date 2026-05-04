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

export const getEmployeeActions = ({ phone, email }: { phone?: string; email?: string }): TContactAction[] => {
  return [
    {
      id: 'msg',
      link: email ? `mailto:${email}` : '',
      label: 'Написать сообщение',
      variant: 'primary',
      Icon: MessageIcon,
      onClick: () => console.log('Message')
    },
    {
      id: 'call',
      link: phone ? `tel:${phone.replace(/\D/g, '')}` : '',
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
