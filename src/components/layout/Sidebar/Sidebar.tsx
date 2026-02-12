import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DownMenuItem, MenuItem } from '@/components/ui/MenuItem'
import Event from '@/assets/icons/Event.svg?react'
import ArrowReturn from '@/assets/icons/Arrow_Return.svg?react'
import Arrow from '@/assets/icons/Arrow.svg?react'
import { ROUTES } from '@/app/router'
import { MENU_ADMIN, MENU_DOWN, MENU_MANAGER } from './menu'
import type { MockUserDataProps } from '@/mockData/mockData'

export const Sidebar = ({ user }: { user: MockUserDataProps }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true)
  const menu = user.role === 'manager' ? MENU_MANAGER : MENU_ADMIN

  return (
    <aside
      className={`${isExpanded ? 'w-[328px]' : 'w-[120px]'} transition-[width] duration-400 min-h-screen 
        px-[20px] pb-[20px] flex flex-col border-r border-grey-blue-light`}
    >
      <div
        className={`flex pl-[3px] items-center border-grey-extra-light transition-[flex-direction,margin,padding] duration-400 
          ${isExpanded ? 'flex-row justify-between mb-[32px] border-b pb-[3px] pt-[4px]' : 'flex-col gap-[12px] mb-[17px] pt-[18px]'}`}
      >
        <div
          className={`overflow-hidden transition-[width,margin] duration-400
          ${isExpanded ? 'w-auto' : 'w-[33px] mx-auto'}`}
        >
          <Link to={user.role === 'manager' ? ROUTES.home : ROUTES.stats}>
            <Event />
          </Link>
        </div>
        {!isExpanded && <div className="h-[1px] w-full bg-grey-extra-light" />}
        <button
          className={`border border-grey-extra-light rounded-[8px] cursor-pointer 
            ${isExpanded ? 'px-[13px] py-[13px]' : 'px-[31px] py-[15px]'}`}
          onClick={() => setIsExpanded(state => !state)}
        >
          {isExpanded ? (
            <ArrowReturn className="w-[20px] h-[20px] rotate-180 text-grey-dark" />
          ) : (
            <Arrow className="w-[15px] h-[15px] -rotate-90 text-grey-dark stroke-3" />
          )}
        </button>
      </div>

      <div
        className={`flex border-b border-grey-extra-light transition-[gap] duration-400 
          ${isExpanded ? 'py-[12px] mb-[40px]' : 'py-[7px] mb-[32px]'}`}
        style={{ gap: isExpanded ? '12px' : '0px' }}
      >
        <div
          className={`h-[48px] p-[4px] rounded-full border border-yellow-accent-light flex-shrink-0 
            transition-[margin] duration-400 ${isExpanded ? 'w-[48px]' : 'w-[48px] mx-auto'}`}
        >
          <img
            src={user.photo}
            alt="Фото пользователя"
            className="object-cover object-center w-[40px] h-[40px] rounded-full"
          />
        </div>
        <div className={`overflow-hidden transition-[width] duration-400 ${isExpanded ? 'w-[200px]' : 'w-0'}`}>
          <div className="flex flex-col gap-[4px] w-[200px]">
            <span className="text-button font-display">{user.name}</span>
            <span className="text-xs font-display">
              {user.role === 'manager' ? `Менеджер ${user.grade!} звена` : 'Администратор'}
            </span>
          </div>
        </div>
      </div>

      <nav className="flex flex-col justify-between flex-1">
        <div className="flex flex-col transition-[gap] duration-400" style={{ gap: isExpanded ? '19.5px' : '16px' }}>
          {menu.map(item => (
            <MenuItem
              key={`${item.route}-${isExpanded}`}
              Icon={item.Icon}
              title={item.title}
              route={item.route}
              childrenItems={item.childrenItems}
              isExpanded={isExpanded}
            />
          ))}
        </div>
        <div
          className={`flex flex-col border-t border-grey-extra-light transition-[gap] duration-400
            ${isExpanded ? 'pt-[16px]' : 'pt-[12px] items-center'}`}
          style={{ gap: isExpanded ? '16px' : '12px' }}
        >
          {MENU_DOWN.map((item, index) => (
            <DownMenuItem
              key={`${item.route}-${index}`}
              Icon={item.Icon}
              title={item.title}
              route={item.route}
              isExpanded={isExpanded}
            />
          ))}
        </div>
      </nav>
    </aside>
  )
}
