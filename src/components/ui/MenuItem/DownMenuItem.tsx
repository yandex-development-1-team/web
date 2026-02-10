import { NavLink } from 'react-router-dom'
import type { MenuItemProps } from './MenuItem.types'

export const DownItem = ({ Icon, title, route }: MenuItemProps) => {
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
            <Icon className="w-[40px] h-[40px] group-active:text-yellow-accent-light text-text" />
            <h5 className="text-text text-h5 font-display w-[180px]">{title}</h5>
          </div>
        )}
      </NavLink>
    </div>
  )
}
