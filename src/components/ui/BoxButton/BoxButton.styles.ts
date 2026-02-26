import { cva } from 'class-variance-authority'

export const BoxButtonVariants = cva(
  `
    group inline-flex items-center justify-between w-full rounded-lg text-button font-button
    transition-all outline-none cursor-pointer
    focus-visible:ring-2 focus-visible:ring-yellow-accent-dark focus-visible:ring-offset-2
    disabled:pointer-events-none disabled:opacity-50
  `,
  {
    variants: {
      variant: {
        default: `
          bg-white ring-1 ring-inset ring-yellow-accent-light text-black hover:ring-yellow-light
          active:ring-2 active:ring-yellow-accent-dark
        `,
        filled: 'bg-yellow-accent-light text-black hover:bg-yellow-light active:bg-yellow-accent-dark'
      },
      size: {
        default: 'h-[92px] p-5',
        small: 'h-[72px] p-4'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)
