import type { ButtonProps } from './types'

const Button = ({ label, onClick, style = 'primary', type = 'button', className, children }: ButtonProps) => {
  const buttonStyleClasses =
    (style === 'primary' &&
      `
        bg-yellow-accent-light
        hover:bg-yellow-light
        hover:text-text-black-darker
        active:bg-yellow-accent-dark
        active:text-text-black-darker
        disabled:bg-grey-extra-light
      `) ||
    ''

  return (
    <button
      type={type}
      className={`
        border-1
        border-yellow-accent-light
        cursor-pointer
        text-text
        text-button
        rounded-[8px]
        h-full
        px-[20px]
        bg-white
        outline-2
        outline-transparent
        outline-offset-[-2px]
        transition-[background-color,border-color,outline-color,color]
        duration-300
        ease-in-out
        ${buttonStyleClasses}
        hover:border-yellow-light
        active:border-yellow-accent-dark
        active:outline-yellow-accent-dark
        disabled:cursor-default
        disabled:border-grey-extra-light
        disabled:outline-transparent
        disabled:text-text-grey-dark
        ${className}
      `}
      onClick={onClick}
    >
      {label}
      {children}
    </button>
  )
}

export default Button
