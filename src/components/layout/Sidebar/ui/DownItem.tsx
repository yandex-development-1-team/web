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
        hover:bg-grey-extra-light group active:bg-system-background
        ${isActive ? 'bg-yellow-light' : ''}
      `}
    >
      <div className="w-[40px] h-[40px] flex-shrink-0">
        <Icon className="w-full h-full text-text group-active:text-yellow-accent-light" />
      </div>
      <div className={`transition-[width] duration-400 relative ${isExpanded ? 'w-[180px]' : 'w-0'}`}>
        {isExpanded && <h5 className="text-text text-h5 w-[180px]">{title}</h5>}
        {inDevelopment && <LabelInDevelopment className={!isExpanded ? '-right-[6px]' : ''} />}
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
