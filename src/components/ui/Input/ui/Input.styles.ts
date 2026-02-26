import { cva } from 'class-variance-authority'

export const inputWithIconVariants = cva(
  "text-text caret-(--caret) cursor-(--input-border-active) text-h5 font-display flex h-auto items-center justify-center gap-2 py-1.5 select-none [&>svg:not([class*='size-'])]:size-6 [&>kbd]:rounded-[calc(var(--radius)-5px)] group-data-[disabled=true]/input-group:opacity-50",
  {
    variants: {
      align: {
        'inline-start': 'order-first pl-3 has-[>button]:ml-[-0.45rem] has-[>kbd]:ml-[-0.35rem]',
        'inline-end': 'order-last pr-3 has-[>button]:mr-[-0.45rem] has-[>kbd]:mr-[-0.35rem]',
        'block-start':
          'order-first w-full justify-start px-3 pt-3 [.border-b]:pb-3 group-has-[>input]/input-group:pt-2.5',
        'block-end': 'order-last w-full justify-start px-3 pb-3 [.border-t]:pt-3 group-has-[>input]/input-group:pb-2.5'
      }
    },
    defaultVariants: {
      align: 'inline-start'
    }
  }
)
