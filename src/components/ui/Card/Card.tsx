import type { ComponentProps, ReactNode } from 'react'

type TCardProps = {
  children: ReactNode
} & ComponentProps<'div'>

export const Card = ({ children, className, ...props }: TCardProps) => {
  return (
    <div className={`bg-white p-[18px_20px] rounded-md ${className}`} {...props}>
      {children}
    </div>
  )
}
