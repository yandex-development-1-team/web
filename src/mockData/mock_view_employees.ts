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

export const MOCK_ACTIONS: TContactAction[] = [
  {
    id: 'msg',
    link: 'https://t.me',
    label: 'Написать сообщение',
    variant: 'primary',
    Icon: MessageIcon,
    onClick: () => console.log('Message')
  },
  {
    id: 'call',
    link: 'tel:+79991234567',
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
] as const
