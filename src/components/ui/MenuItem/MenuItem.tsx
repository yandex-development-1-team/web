import { NavLink } from 'react-router-dom'
import Arrow from '@/assets/icons/Arrow.svg?react'
import type { MenuItemProps } from './MenuItem.types'

export const MenuItem = ({ Icon, title, route, childrenItems, isOpen }: MenuItemProps) => {
  return (
    <div className="flex flex-col gap-[13px]">
      <NavLink to={route}>
        {({ isActive }) => (
          <div
            className={`
            pr-[8px] pl-[12px] rounded-xl flex items-center gap-[8px] cursor-pointer
            hover:bg-grey-extra-light group active:bg-system-background
            ${isActive ? 'bg-yellow-light' : ''}
          `}
          >
            <Icon className="w-[60px] h-[60px] group-active:text-yellow-accent-light text-text" />
            <h5 className="text-text text-h5 font-display">{title}</h5>
            {childrenItems?.length && <Arrow className="text-text w-[24px] h-[24px]" />}
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
