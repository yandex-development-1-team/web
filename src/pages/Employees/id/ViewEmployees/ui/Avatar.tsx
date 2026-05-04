import { cn } from '@/lib/utils.clsx'
import { useState, type ComponentProps } from 'react'
import photo_placeholder from '@/assets/images/photo_placeholder.jpg'

type TAvatarProps = {
  src: string
  alt?: string
  width?: number
  height?: number
  shadow?: boolean
  placeholder?: string
} & ComponentProps<'img'>

export const Avatar = ({
  src,
  width = 100,
  height = 100,
  alt = 'Фото пользователя',
  shadow = false,
  placeholder = photo_placeholder
}: TAvatarProps) => {
  const [imgSrc, setImgSrc] = useState(src || placeholder)

  return (
    <div
      className={cn(shadow && 'border-b border-grey-extra-light shadow-[0_4px_4px_-2px_rgba(12,12,13,0.05)]')}
      style={{ width: width, height: height }}
    >
      <div
        className={cn(`flex justify-center items-center p-1 rounded-full border border-yellow-accent-light shrink-0`)}
      >
        <img
          src={imgSrc}
          alt={alt}
          className={cn(`object-cover object-center rounded-full`)}
          style={{ width: width - width / 10, height: height - height / 10 }}
          onError={() => setImgSrc(placeholder)}
        />
      </div>
    </div>
  )
}
