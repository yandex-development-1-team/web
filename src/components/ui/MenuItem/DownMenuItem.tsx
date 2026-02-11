import { NavLink } from 'react-router-dom'
import type { MenuItemProps } from './MenuItem.types'

export const DownItem = ({ Icon, title, route, isExpanded }: MenuItemProps) => {
  return (
    <div className="flex flex-col gap-[13px]">
      <NavLink to={route}>
        {({ isActive }) => (
          <div
            className={`
            pr-[8px] pl-[12px] rounded-xl flex items-center cursor-pointer
            hover:bg-grey-extra-light group active:bg-system-background transition-[gap] duration-400
            ${isActive ? 'bg-yellow-light' : ''}
          `}
            style={{ gap: isExpanded ? '8px' : '0px' }}
          >
            <div
              className={`h-[40px] flex-shrink-0 transition-[margin] duration-400 
              ${isExpanded ? 'w-[40px]' : 'w-[40px] mx-auto'}`}
            >
              <Icon className="w-full h-full text-text group-active:text-yellow-accent-light" />
            </div>
            <div
              className={`overflow-hidden transition-[width] duration-400
                  ${isExpanded ? 'width-[180px]' : 'w-0'}`}
            >
              <h5 className="text-text text-h5 font-display w-[180px]">{title}</h5>
            </div>
          </div>
        )}
      </NavLink>
    </div>
  )
}
