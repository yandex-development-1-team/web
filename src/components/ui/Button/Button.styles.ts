import { cva } from 'class-variance-authority'

const baseStyles = `
  inline-flex
  items-center
  justify-center
  gap-2
  whitespace-nowrap
  shrink-0
  cursor-pointer
  rounded-[8px]
  outline-none
  [&_svg]:pointer-events-none
  [&_svg:not([class*='size-'])]:size-4
  [&_svg]:shrink-0
  transition-[background-color,border-color,outline-color,color]
  duration-300
  ease-in-out
  disabled:cursor-default
  outline-2
  outline-transparent
  outline-offset-[-2px]
`

const defaultStyles = `
  bg-yellow-accent-light
  text-black
  text-button
  hover:bg-yellow-light
  active:bg-yellow-accent-dark
  aria-invalid:bg-red-medium
  aria-invalid:text-white
`
const outlineStyles = `
  bg-white
  ring-1
  ring-inset
  ring-yellow-accent-light
  text-black
  text-button
  hover:ring-yellow-light
  active:ring-2
  active:ring-yellow-accent-dark
  aria-invalid:ring-2
  aria-invalid:ring-red-medium
  aria-invalid:text-red-medium
  disabled:bg-transparent
  disabled:ring-grey-light
  disabled:text-grey-dark
`
const underlineStyles = `
  outline-none
  bg-transparent
  text-black
  text-button
  underline
  decoration-yellow-accent-light
  decoration-1
  underline-offset-6
  hover:decoration-yellow-light
  active:decoration-2
  active:decoration-yellow-accent-dark
  disabled:text-grey-dark
  disabled:decoration-grey-light
`

const ghostStyles = `
  outline-none
  bg-transparent
  text-button
  hover:text-yellow-accent-dark
  active:text-yellow-dark
  disabled:text-grey-light
`
const primaryStyles = `
  border-1
  border-yellow-accent-light
  bg-yellow-accent-light
  text-text-black-darker
  text-button
  hover:bg-yellow-light
  hover:border-yellow-light

  active:bg-yellow-accent-dark
  active:border-yellow-accent-dark
  active:outline-yellow-accent-dark

  disabled:bg-grey-extra-light
  disabled:border-grey-extra-light
`

const secondaryStyles = `
  border-1
  border-yellow-accent-light
  text-text
  text-button
  bg-white

  hover:border-yellow-light
  active:border-yellow-accent-dark
  active:outline-yellow-accent-dark

  disabled:border-grey-extra-light
  disabled:outline-transparent
  disabled:text-text-grey-dark
`

const dangerStyles = `
  bg-system-error
  text-white
  text-button

  hover:bg-system-error-light
  active:bg-system-error-medium

  disabled:bg-grey-extra-light
  disabled:text-text-grey-light
`

const elevatedStyles = `
  text-button
  shadow-[0px_1px_3px_0px_rgba(0,0,0,0.15),0px_1px_2px_0px_rgba(0,0,0,0.30)]

  hover:shadow-[0px_6px_12px_0px_rgba(0,0,0,0.18),0px_3px_6px_0px_rgba(0,0,0,0.33)]
  hover:-translate-y-px

  active:shadow-[0px_1px_2px_0px_rgba(0,0,0,0.20),inset_0px_1px_2px_0px_rgba(0,0,0,0.15)]
  active:translate-y-0

  transition-all duration-200 ease-in-out
`

export const buttonVariants = cva('', {
  variants: {
    variant: {
      default: `${baseStyles} ${defaultStyles}`,
      outline: `${baseStyles} ${outlineStyles}`,
      underline: `${baseStyles} ${underlineStyles}`,
      ghost: `${baseStyles} ${ghostStyles}`,
      primary: `${baseStyles} ${primaryStyles}`,
      secondary: `${baseStyles} ${secondaryStyles}`,
      danger: `${baseStyles} ${dangerStyles}`,
      elevated: `${baseStyles} ${elevatedStyles}`
    },
    size: {
      default: 'h-[46px] px-8 py-3',
      'icon-48': 'size-12 p-2 rounded-lg ',
      'icon-44': 'size-11 p-2 rounded-lg ',
      'icon-40': 'size-10 p-2 rounded-lg ',
      'icon-32': 'size-8 p-1.5 rounded-lg ',
      normal: 'w-[168px] min-h-[46px] px-3 py-3'
    }
  },
  defaultVariants: {
    variant: 'primary'
  }
})
