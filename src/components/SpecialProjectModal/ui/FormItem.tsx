import { cn } from '@/lib/utils.clsx'

interface FormItemProps extends React.PropsWithChildren {
  labelSetting?: {
    text?: string
    id?: string
    cls?: string
  }
  className?: string
  errorMessage?: string
}

export function FormItem({ labelSetting, children, className, errorMessage }: FormItemProps) {
  return (
    <div className={cn('[&_input]:caret-yellow-accent-dark', className)}>
      <label htmlFor={labelSetting?.id} className={cn('text-small', labelSetting?.cls)}>
        {labelSetting?.text}
      </label>
      {children}
      {errorMessage && <span className="text-xxs text-text-error">{errorMessage}</span>}
    </div>
  )
}
