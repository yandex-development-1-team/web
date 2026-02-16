import type { SwitchProps } from './Switch.types'

export const Switch = ({ onChange, checked = false, paleStyle = true, className }: SwitchProps) => {
  const handleChange = () => {
    onChange(!checked)
  }

  const switchBackgroundColorChecked = paleStyle ? 'bg-yellow-light' : 'bg-yellow-accent-light'
  const switchBackgroundColorUnchecked = paleStyle ? 'bg-white' : 'bg-grey-extra-light'

  const switchBorderColorChecked = paleStyle ? 'border-yellow-accent-dark' : 'border-yellow-accent-light'
  const switchBorderColorUnchecked = paleStyle ? 'border-grey-blue-light' : 'border-grey-dark'

  const switchOutlineColorChecked = 'outline-transparent'
  const switchOutlineColorUnchecked = paleStyle ? 'outline-grey-blue-light' : 'outline-grey-dark'

  const thumbBackgroundColorChecked = 'bg-white'
  const thumbBackgroundColorUnchecked = paleStyle ? 'bg-grey-light' : 'bg-grey-dark'

  const thumbBorderColorChecked = 'border-white'
  const thumbBorderColorUnchecked = paleStyle ? 'border-white' : 'border-grey-extra-light'

  return (
    <>
      <input type="checkbox" checked={checked} className="hidden" onChange={() => {}} />
      <div
        className={`
          w-[52px]
          h-[32px]
          rounded-[16px]
          relative
          transition-[background-color,border-color,outline-color]
          duration-300
          ease-in-out
          border-1
          outline-2
          outline-offset-[-2px]
          ${
            checked
              ? `${switchBackgroundColorChecked} ${switchBorderColorChecked} ${switchOutlineColorChecked}`
              : `${switchBackgroundColorUnchecked} ${switchBorderColorUnchecked} ${switchOutlineColorUnchecked}`
          }
          ${className}
        `}
        onClick={handleChange}
      >
        <span
          className={`
            absolute
            w-[24px]
            h-[24px]
            border-4
            rounded-full
            top-[3px]
            transition-[background-color,border-color,left]
            duration-300
            ease-in-out
            ${
              checked
                ? `${thumbBackgroundColorChecked} ${thumbBorderColorChecked}  left-[23px]`
                : `${thumbBackgroundColorUnchecked} ${thumbBorderColorUnchecked} left-[3px]`
            }
          `}
        />
      </div>
    </>
  )
}
