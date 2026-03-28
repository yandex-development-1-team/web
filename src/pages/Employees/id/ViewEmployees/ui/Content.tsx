import type { ComponentProps, ReactNode } from 'react'

type TContentProps = {
  children: ReactNode
} & ComponentProps<'div'>

export const Content = ({ children, className, ...props }: TContentProps) => {
  return (
    <div className={`w-full h-auto mt-5 grid grid-cols-[380px_1fr] gap-5 max-h-max ${className}`} {...props}>
      {children}
    </div>
  )
}
