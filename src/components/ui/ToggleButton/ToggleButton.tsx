import { useState } from 'react'
import type { ToggleButtonProps, ButtonState } from './types'

const ToggleButton = ({ leftLabel, rightLabel, onToggle, className }: ToggleButtonProps) => {
  const [selected, setSelected] = useState<ButtonState>('left')

  const handleToggle = (side: ButtonState) => {
    setSelected(side)
    onToggle(side)
  }

  const buttonClasses = `
    flex
    flex-1
    items-center
    justify-center
    transition-[background-color,outline-color,border-color]
    duration-300
    ease-in-out
    relative
    text-text
    text-button
    bg-white
    border-1
    border-yellow-accent-light
    hover:border-yellow-light
    p-[10px_20px]
  `

  const selectedButtonClasses = `
    bg-yellow-accent-light
    hover:bg-yellow-light
    hover:text-text-black-darker
    active:bg-yellow-accent-dark
    active:text-text-black-darker
  `

  const borderElementClasses = `
    absolute
    w-[calc(100%+1px)]
    h-[calc(100%+2px)]
    border-1
    border-transparent
    outline-2
    outline-transparent
    outline-offset-[-2px]
    hover:border-yellow-light
    active:border-yellow-accent-dark
    active:outline-yellow-accent-dark
    transition-[border-color,outline-color]
    duration-300
    ease-in-out
  `

  const leftRoundedBorderClasses = 'rounded-tl-[8px] rounded-bl-[8px]'
  const rightRoundedBorderClasses = 'rounded-tr-[8px] rounded-br-[8px]'

  return (
    <div className={`flex cursor-pointer h-full ${className}`}>
      <button
        type="button"
        className={`
          border-r-0
          ${buttonClasses}
          ${leftRoundedBorderClasses}
          ${selected === 'left' && selectedButtonClasses}
        `}
        onClick={() => handleToggle('left')}
      >
        {leftLabel}
        <div
          className={`
          left-[-1px]
          ${borderElementClasses}
          ${leftRoundedBorderClasses}
          ${selected !== 'left' && rightRoundedBorderClasses}
        `}
        />
      </button>
      <button
        type="button"
        className={`
          border-l-0
          ${buttonClasses}
          ${rightRoundedBorderClasses}
          ${selected === 'right' && selectedButtonClasses}
        `}
        onClick={() => handleToggle('right')}
      >
        {rightLabel}
        <div
          className={`
          left-0
          ${borderElementClasses}
          ${rightRoundedBorderClasses}
          ${selected !== 'right' && leftRoundedBorderClasses}
        `}
        />
      </button>
    </div>
  )
}

export default ToggleButton
