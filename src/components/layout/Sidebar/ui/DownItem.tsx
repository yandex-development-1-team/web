import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import type { DownItemProps } from './DownItem.types'
import { LabelInDevelopment } from '@/components/ui'

export const DownItem = ({ Icon, title, route, onClick, isExpanded, inDevelopment }: DownItemProps) => {
  const [isButtonActive, setIsButtonActive] = useState(false)
  const content = (isActive: boolean = false) => (
    <div
      className={`
        pr-[8px] pl-[17px] rounded-xl flex items-center cursor-pointer gap-[8px]
        hover:bg-grey-extra-light group active:bg-system-background relative
        transition-[background-color] duration-400
        ${isActive ? 'bg-yellow-light' : ''}
      `}
    >
      <div className="w-[40px] h-[40px] flex-shrink-0">
        <Icon
          className={`
            w-full h-full text-text group-active:text-yellow-accent-light transition-[color] duration-400 ease-in-out
          `}
        />
      </div>

      <div
        className={`
        transition-[width] duration-400 ease-in-out overflow-hidden ${isExpanded ? 'w-[180px]' : 'w-0'}
      `}
      >
        <h5
          className={`
            text-text text-h5 w-[180px]
          `}
        >
          {title}
        </h5>
      </div>

      {inDevelopment && (
        <LabelInDevelopment
          className={`
            transition-[right] duration-400 ease-in-out
            ${isExpanded ? '-right-[2px]' : 'right-[0px]'}
          `}
        />
      )}
    </div>
  )

  const handleButtonClick = () => {
    setIsButtonActive(prev => !prev)
    onClick?.()
  }

  return (
    <div className={`h-10 transition-[width] duration-400 ease-in-out ${isExpanded ? 'w-[284px]' : 'w-[73px]'}`}>
      {route ? (
        <NavLink to={route} onClick={onClick}>
          {({ isActive }) => content(isActive)}
        </NavLink>
      ) : (
        <button type="button" onClick={handleButtonClick} className="text-left w-full">
          {content(isButtonActive)}
        </button>
      )}
    </div>
  )
}
