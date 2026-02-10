import { Link } from 'react-router-dom'
import { DownItem, MenuItem } from '@/components/ui/MenuItem'
import Event from '@/assets/icons/Event.svg?react'
import ArrowReturn from '@/assets/icons/Arrow_Return.svg?react'
import { ROUTES } from '@/app/router'
import { MENU_ADMIN, MENU_DOWN, MENU_MANAGER } from './menu'

export const Sidebar = ({ role }: { role: 'manager' | 'admin' }) => {
  const menu = role === 'manager' ? MENU_MANAGER : MENU_ADMIN
  return (
    <aside className="w-[328px] min-h-screen px-[20px] pb-[20px] flex flex-col justify-between border-r border-grey-blue-light">
      <div className="flex justify-between pt-[4px] pb-[3px] pl-[3px] items-center border-b border-grey-extra-light">
        <Link to={role === 'manager' ? ROUTES.home : ROUTES.stats}>
          <Event />
        </Link>
        <button className="p-[13px] border border-grey-extra-light rounded-[8px] cursor-pointer">
          <ArrowReturn className="w-[20px] h-[20px] rotate-180 text-grey-dark" />
        </button>
      </div>
      <nav className="flex flex-col gap-[20px]">
        {menu.map(item => (
          <MenuItem
            Icon={item.Icon}
            title={item.title}
            route={item.route}
            childrenItems={item.childrenItems}
            isOpen={true}
          />
        ))}
      </nav>
      <div className="flex flex-col gap-[16px] border-t border-grey-extra-light pt-[16px]">
        {MENU_DOWN.map(item => (
          <DownItem Icon={item.Icon} title={item.title} route={item.route} />
        ))}
      </div>
    </aside>
  )
}
