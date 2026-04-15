export const cardLinkStyles = `
  group 
  flex 
  flex-col 
  gap-[20px]
  justify-between 
  min-h-[280px]
  h-full 
  p-[20px] 
  rounded-[8px] 
  border 
  border-grey-border 
  bg-white
  transition-all 
  cursor-pointer
  shadow-[0px_1px_4px_0px_rgba(12,12,13,0.05)]
  
  hover:border-yellow-light
  hover:shadow-none

  active:border-yellow-accent-dark
  active:border-2
  active:shadow-none
`

export const cardLinkDetailsStyles = `
  inline-flex
  items-center
  justify-center
  gap-2
  whitespace-nowrap
  shrink-0
  rounded-[8px]
  pointer-events-none
  self-end
  h-[46px]
  px-8
  py-3
  
  border-1
  border-yellow-accent-light
  text-text
  button-text
  bg-white
  outline-2
  outline-transparent
  outline-offset-[-2px]
  
  transition-[background-color,border-color,outline-color,color]
  duration-300
  ease-in-out

  group-hover:border-yellow-light
  group-active:border-yellow-accent-dark
`
