import type { ComponentProps, ReactNode } from 'react'

type TContentProps = {
  children: ReactNode
} & ComponentProps<'div'>

export const Content = ({ children, className, ...props }: TContentProps) => {
  return (
    <div className={`w-full h-auto ${className}`} {...props}>
      {children}
    </div>
  )
}
