import { cva } from 'class-variance-authority'

const baseStyles = `
font-display
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

export const buttonVariants = cva('', {
  variants: {
    variant: {
      default: `${baseStyles} ${defaultStyles}`,
      outline: `${baseStyles} ${outlineStyles}`,
      underline: `${baseStyles} ${underlineStyles}`,
      ghost: `${baseStyles} ${ghostStyles}`,
      primary: `${baseStyles} ${primaryStyles}`,
      secondary: `${baseStyles} ${secondaryStyles}`
    },
    size: {
      default: 'h-[46px] px-8 py-3',
      'icon-40': 'size-10 p-2 rounded-lg ',
      'icon-32': 'size-8 p-1.5 rounded-lg '
    }
  },
  defaultVariants: {
    variant: 'primary'
  }
})
