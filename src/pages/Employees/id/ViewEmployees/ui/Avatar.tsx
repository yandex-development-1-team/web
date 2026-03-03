import { cn } from '@/lib/utils.clsx'
import type { ComponentProps } from 'react'

type TAvatarProps = {
  src: string
  alt?: string
  width?: number
  height?: number
  shadow?: boolean
} & ComponentProps<'img'>

export const Avatar = ({ src, width = 100, height = 100, alt = 'Фото пользователя', shadow = false }: TAvatarProps) => {
  return (
    <div
      className={cn(shadow && 'border-b border-grey-extra-light shadow-[0_4px_4px_-2px_rgba(12,12,13,0.05)]')}
      style={{ width: width, height: height }}
    >
      <div
        className={cn(`flex justify-center items-center p-1 rounded-full border border-yellow-accent-light shrink-0`)}
      >
        <img
          src={src}
          alt={alt}
          className={cn(`object-cover object-center border rounded-full border-yellow-accent-light`)}
          style={{ width: width - width / 10, height: height - height / 10 }}
        />
      </div>
    </div>
  )
}
