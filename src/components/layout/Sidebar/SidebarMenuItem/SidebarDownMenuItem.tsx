import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import type { SidebarDownMenuItemProps } from './SidebarDownMenuItem.types'

export const SidebarDownMenuItem = ({ Icon, title, route, onClick, isExpanded }: SidebarDownMenuItemProps) => {
  const [isButtonActive, setIsButtonActive] = useState(false)
  const content = (isActive: boolean = false) => (
    <div
      className={`
        pr-[8px] pl-[12px] rounded-xl flex items-center cursor-pointer gap-[8px]
        hover:bg-grey-extra-light group active:bg-system-background
        ${isActive ? 'bg-yellow-light' : ''}
      `}
    >
      <div className="w-[40px] h-[40px] flex-shrink-0">
        <Icon className="w-full h-full text-text group-active:text-yellow-accent-light" />
      </div>
      <div
        className={`overflow-hidden transition-[width] duration-400
          ${isExpanded ? 'width-[180px]' : 'w-0'}`}
      >
        <h5 className="text-text text-h5 font-display w-[180px]">{title}</h5>
      </div>
    </div>
  )

  const handleButtonClick = () => {
    setIsButtonActive(prev => !prev)
    onClick?.()
  }

  return (
    <div className={`flex flex-col gap-[13px] transition-[width] duration-400 ${isExpanded ? 'w-full' : 'w-[60px]'}`}>
      {route ? (
        <NavLink to={route} onClick={onClick}>
          {({ isActive }) => content(isActive)}
        </NavLink>
      ) : (
        <button type="button" onClick={handleButtonClick} className="text-left">
          {content(isButtonActive)}
        </button>
      )}
    </div>
  )
}
