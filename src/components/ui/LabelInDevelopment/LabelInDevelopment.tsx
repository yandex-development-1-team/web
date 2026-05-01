export interface LabelInDevelopmentProps {
  className?: string
}

function LabelInDevelopment({ className }: LabelInDevelopmentProps) {
  return (
    <div
      className={`
        text-xxs -right-[2px] top-1/2 -translate-y-1/2 -rotate-35
        rounded-[4px] outline-offset-[1px] outline-1 text-rating-second outline-rating-second
        pointer-events-none whitespace-nowrap leading-none absolute ${className}
      `}
    >
      В разработке
    </div>
  )
}

export { LabelInDevelopment }
