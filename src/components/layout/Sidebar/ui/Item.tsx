import { useState } from 'react'
import { NavLink, useMatch } from 'react-router-dom'
import { ArrowIcon } from '@/assets/icons'
import type { ItemProps } from './Item.types'
import { LabelInDevelopment } from '@/components/ui'

export const Item = ({ Icon, title, route, childrenItems, isExpanded, inDevelopment }: ItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const isCurrentRoute = useMatch(route)

  const handleMenuItemClick = () => {
    if ((!isOpen || isCurrentRoute) && isExpanded) {
      setIsOpen(state => !state)
    }
  }

  const handleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOpen(state => !state)
  }

  return (
    <div className="flex flex-col gap-[13px]">
      <NavLink to={route}>
        {({ isActive }) => (
          <div
            onClick={(childrenItems?.length && handleMenuItemClick) || undefined}
            className={`
            pr-[8px] pl-[12px] rounded-[12px] flex items-center gap-[8px] cursor-pointer
            hover:bg-grey-extra-light group active:bg-system-background relative
            ${isActive ? 'bg-yellow-light' : ''}
          `}
          >
            <div className="w-[60px] h-[60px] flex-shrink-0">
              <Icon className="w-full h-full text-text group-active:text-yellow-accent-light" />
            </div>
            <div className="overflow-hidden">
              <h5 className="text-text text-h5 w-[174px]">{title}</h5>
            </div>
            {inDevelopment && <LabelInDevelopment />}

            {childrenItems?.length && (
              <div
                onClick={handleClick}
                className={`
                  flex justify-center items-center
                  absolute right-[7px] cursor-pointer h-[32px] top-[14px]
                  overflow-hidden transition-[width,opacity] duration-400
                  ${isExpanded ? 'w-[32px] opacity-100' : 'w-0 opacity-0'}
                `}
              >
                <ArrowIcon
                  className={`
                    w-[24px] h-[24px] text-text transition-transform duration-200
                    ${isOpen ? '-rotate-180' : ''}
                  `}
                />
              </div>
            )}
          </div>
        )}
      </NavLink>

      {childrenItems?.length && isOpen && (
        <div className="pl-[77px] pr-[12px] flex flex-col gap-[21.5px]">
          {childrenItems.map(item => (
            <NavLink key={item.route} to={item.route}>
              {({ isActive }) => (
                <div
                  className={`
                    py-[8px] pr-[9px] pl-[21px] hover:rounded-xl cursor-pointer leading-[1.1]
                    hover:bg-grey-extra-light active:bg-system-background border-b border-transparent
                    hover:border-transparent relative
                    ${isActive ? 'border-yellow-accent-dark' : ''}
                  `}
                >
                  <span className="text-text text-xs">{item.title}</span>
                  {item.inDevelopment && <LabelInDevelopment />}
                </div>
              )}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}
