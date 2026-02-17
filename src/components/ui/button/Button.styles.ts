import { cva } from 'class-variance-authority'

const commonStylesOld = `cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-button font-button transition-all disabled:pointer-events-none disabled:bg-grey-extra-light disabled:text-grey-dark [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-yellow-accent-dark focus-visible:ring-offset-2`

const commonStylesNew = `border-1
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
        hover:border-yellow-light
        active:border-yellow-accent-dark
        active:outline-yellow-accent-dark
        disabled:cursor-default
        disabled:border-grey-extra-light
        disabled:outline-transparent
        disabled:text-text-grey-dark`

const primaryVariantStyles = `bg-yellow-accent-light
        hover:bg-yellow-light
        hover:text-text-black-darker
        active:bg-yellow-accent-dark
        active:text-text-black-darker
        disabled:bg-grey-extra-light`

export const buttonVariants = cva('', {
  variants: {
    variant: {
      default: `${commonStylesOld} bg-yellow-accent-light text-black hover:bg-yellow-light active:bg-yellow-accent-dark aria-invalid:bg-red-medium aria-invalid:text-white`,
      outline: `${commonStylesOld} bg-white ring-1 ring-inset ring-yellow-accent-light text-black hover:ring-yellow-light active:ring-2 active:ring-yellow-accent-dark aria-invalid:ring-2 aria-invalid:ring-red-medium aria-invalid:text-red-medium disabled:bg-transparent disabled:ring-grey-light disabled:text-grey-dark`,
      underline: `${commonStylesOld} bg-transparent text-black underline decoration-yellow-accent-light decoration-1 underline-offset-6 hover:decoration-yellow-light active:decoration-2 active:decoration-yellow-accent-dark disabled:text-grey-dark disabled:decoration-grey-light`,
      ghost: `${commonStylesOld} bg-transparent hover:text-yellow-accent-dark active:text-yellow-dark disabled:text-grey-light`,
      primary: `${commonStylesNew} ${primaryVariantStyles}`,
      secondary: `${commonStylesNew}`
    },
    size: {
      default: 'h-[46px] px-8 py-3',
      'icon-40': 'size-10 p-2 rounded-lg ',
      'icon-32': 'size-8 p-1.5 rounded-lg '
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default'
  }
})
