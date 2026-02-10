import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Arrow from '@/assets/icons/Arrow.svg?react'
import type { MenuItemProps } from './MenuItem.types'

export const MenuItem = ({ Icon, title, route, childrenItems }: MenuItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <div className="flex flex-col gap-[13px]">
      <NavLink to={route}>
        {({ isActive }) => (
          <div
            className={`
            pr-[8px] pl-[12px] rounded-[12px] flex items-center gap-[8px] cursor-pointer
            hover:bg-grey-extra-light group active:bg-system-background relative
            ${isActive ? 'bg-yellow-light' : ''}
          `}
          >
            <Icon className="w-[60px] h-[60px] group-active:text-yellow-accent-light text-text" />
            <h5 className="text-text text-h5 font-display w-[180px]">{title}</h5>
            {childrenItems?.length && (
              <button
                type="button"
                onClick={e => {
                  e.preventDefault()
                  e.stopPropagation()
                  setIsOpen(state => !state)
                }}
                className="absolute inset-y-[30%] right-[12px] cursor-pointer"
              >
                <Arrow
                  className={`
                    w-[24px] h-[24px] text-text transition-transform duration-200
                    ${isOpen ? '-rotate-180' : ''}
                  `}
                />
              </button>
            )}
          </div>
        )}
      </NavLink>
      {childrenItems?.length && isOpen && (
        <div className="pl-[77px] pr-[12px] flex flex-col gap-[21.5px]">
          {childrenItems.map(item => (
            <NavLink to={item.route}>
              {({ isActive }) => (
                <div
                  className={`
              py-[8px] pr-[9px] pl-[21px] hover:rounded-xl cursor-pointer leading-[1.1]
              hover:bg-grey-extra-light active:bg-system-background border-b border-transparent hover:border-transparent
              ${isActive ? 'border-yellow-accent-dark' : ''}
            `}
                >
                  <span className="text-text text-xs font-display">{item.title}</span>
                </div>
              )}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  )
}
