import { Link } from 'react-router-dom'
import { DownItem, MenuItem } from '@/components/ui/MenuItem'
import Event from '@/assets/icons/Event.svg?react'
import ArrowReturn from '@/assets/icons/Arrow_Return.svg?react'
import { ROUTES } from '@/app/router'
import { MENU_ADMIN, MENU_DOWN, MENU_MANAGER } from './menu'
import type { MockUserDataProps } from '@/mockData/mockData'

export const Sidebar = ({ user }: { user: MockUserDataProps }) => {
  const menu = user.role === 'manager' ? MENU_MANAGER : MENU_ADMIN
  return (
    <aside className="w-[328px] min-h-screen px-[20px] pb-[20px] flex flex-col border-r border-grey-blue-light">
      <div className="flex justify-between pt-[4px] pb-[3px] pl-[3px] mb-[32px] items-center border-b border-grey-extra-light">
        <Link to={user.role === 'manager' ? ROUTES.home : ROUTES.stats}>
          <Event />
        </Link>
        <button className="p-[13px] border border-grey-extra-light rounded-[8px] cursor-pointer">
          <ArrowReturn className="w-[20px] h-[20px] rotate-180 text-grey-dark" />
        </button>
      </div>
      <div className="flex gap-[12px] py-[12px] mb-[40px] border-b border-grey-extra-light">
        <div className="w-[48px] h-[48px] p-[4px] rounded-full border border-yellow-accent-light">
          <img
            src={user.photo}
            alt="Фото пользователя"
            className="object-cover object-center w-[40px] h-[40px] rounded-full"
          />
        </div>
        <div className="flex flex-col gap-[4px]">
          <span className="text-button font-display">{user.name}</span>
          <span className="text-xs font-display">
            {user.role === 'manager' ? `Менеджер ${user.grade!} звена` : 'Администратор'}
          </span>
        </div>
      </div>
      <nav className="flex flex-col justify-between flex-1">
        <div className="flex flex-col gap-[19.5px]">
          {menu.map(item => (
            <MenuItem
              Icon={item.Icon}
              title={item.title}
              route={item.route}
              childrenItems={item.childrenItems}
              isOpen={true}
            />
          ))}
        </div>
        <div className="flex flex-col gap-[16px] border-t border-grey-extra-light pt-[16px]">
          {MENU_DOWN.map(item => (
            <DownItem Icon={item.Icon} title={item.title} route={item.route} />
          ))}
        </div>
      </nav>
    </aside>
  )
}
