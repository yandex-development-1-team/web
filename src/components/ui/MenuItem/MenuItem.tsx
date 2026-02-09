import { NavLink } from 'react-router-dom'
import type { MenuItemProps } from './MenuItem.types'

export const MenuItem = ({ Icon, title, route }: MenuItemProps) => {
  return (
    <NavLink to={route}>
      {({ isActive }) => (
        <div
          className={`
            pr-[8px] pl-[12px] rounded-xl flex items-center gap-2 cursor-pointer
            hover:bg-grey-extra-light group active:bg-system-background
            ${isActive ? 'bg-yellow-light' : ''}
          `}
        >
          <Icon className="w-15 h-15 group-active:text-yellow-accent-light text-text" />
          <h5 className="text-text text-h5 font-display">{title}</h5>
        </div>
      )}
    </NavLink>
  )
}
