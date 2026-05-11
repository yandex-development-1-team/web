import { useState } from 'react'
import { Link } from 'react-router-dom'
import { DownItem, Item } from '@/components/layout/Sidebar/ui'
import { ArrowIcon, ArrowReturnIcon, EventIcon } from '@/assets/icons'
import { ROUTES } from '@/app/router'
import { MENU_ADMIN, MENU_DOWN, MENU_MANAGER } from './menu'
import { useLogout } from '@/hooks/useLogout'
import { UserIcon } from '@/assets/icons'
import { usePermissions } from '@/hooks/usePermissions'
import { useUserInfo } from '@/hooks/useUserInfo'

export const Sidebar = () => {
  const { hasRole, hasAccess } = usePermissions()
  const { data: user } = useUserInfo()
  const logout = useLogout()

  const [isExpanded, setIsExpanded] = useState<boolean>(true)
  const menu = hasRole('admin') ? MENU_ADMIN : MENU_MANAGER

  return (
    <aside
      className={`${isExpanded ? 'w-[328px]' : 'w-[120px]'} transition-[width] duration-400 ease-in-out h-screen
        px-[20px] pb-[20px] flex flex-col border-r border-grey-blue-light sticky top-0`}
    >
      <div
        className={`
          border-grey-extra-light transition-[margin] duration-400 ease-in-out
          relative
          ${isExpanded ? 'mb-[44px]' : 'mb-[84px]'}
        `}
      >
        <div
          className={`
            overflow-hidden transition-[width,margin] duration-400 ease-in-out
            mt-[17px] mb-[12px]
            ${isExpanded ? 'w-[81px] ml-[3px]' : 'w-[33px] ml-[25px]'}
          `}
        >
          <Link to={ROUTES.home}>
            <EventIcon />
          </Link>
        </div>
        <div
          className={`
            h-[1px] bg-grey-extra-light
            transition-[opacity] duration-400 ease-in-out
            w-full
            ${isExpanded ? 'opacity-0' : 'opacity-100'}
          `}
        />
        <button
          className={`
            border border-grey-extra-light rounded-[8px] cursor-pointer hover:border-yellow-light
            active:bg-yellow-light active:border-yellow-accent-dark focus-visible:border-yellow-accent-dark
            transition-[border-color,background-color,width,top] duration-400 ease-in-out
            absolute -right-[1px] h-12
            ${isExpanded ? 'top-1 w-12' : 'top-[63px] w-20'}
          `}
          onClick={() => setIsExpanded(state => !state)}
        >
          <ArrowReturnIcon
            className={`
              absolute inset-0 m-auto w-[20px] h-[20px] rotate-180 text-grey-dark
              transition-[opacity] duration-400 ease-in-out
              ${isExpanded ? 'opacity-100' : 'opacity-0'}
            `}
          />
          <ArrowIcon
            className={`
              absolute inset-0 m-auto w-[15px] h-[15px] -rotate-90 text-grey-dark stroke-3
              transition-[opacity] duration-400 ease-in-out
              ${isExpanded ? 'opacity-0' : 'opacity-100'}
            `}
          />
        </button>
      </div>

      <div
        className={`
          flex border-b border-grey-extra-light
          transition-[padding] duration-400 ease-in-out
          mb-8
          ${isExpanded ? 'pb-[11px]' : 'pb-[7px]'}
        `}
      >
        <div
          className={`
            h-[48px] p-[4px] rounded-full border border-yellow-accent-light flex-shrink-0
            transition-[margin] duration-400 ease-in-out
            w-[48px] mr-[11px] 
            ${isExpanded ? 'ml-0' : 'ml-4'}
          `}
        >
          {(user.photo && (
            <img
              src={user.photo}
              alt="Фото пользователя"
              className="object-cover object-center w-[40px] h-[40px] rounded-full"
            />
          )) || <UserIcon className="text-text-grey-light" />}
        </div>
        <div
          className={`
          overflow-hidden transition-[width] duration-400 ease-in-out ${isExpanded ? 'w-[200px]' : 'w-0'}
        `}
        >
          <div className="flex flex-col w-[200px]">
            <span className="button-text mb-1">{user.name}</span>
            <span className="text-xs ml-[1px]">
              {hasRole('admin') ? 'Администратор' : `Менеджер ${user.grade} звена`}
            </span>
          </div>
        </div>
      </div>

      <nav className="flex flex-col justify-between flex-1 overflow-hidden -mx-[20px] [&>div]:px-[20px]">
        <div
          className={`
            flex flex-col transition-[margin] duration-400 ease-in-out
            overflow-y-auto narrow-scrollbar [scrollbar-gutter:stable]
            ${isExpanded ? 'mb-5 mt-2' : 'mb-4 mt-0'}
          `}
        >
          {menu.map(
            (item, index) =>
              (!item.accessName || hasRole('admin') || hasAccess(item.accessName)) && (
                <div
                  className={`
                    transition-[margin] duration-400 ease-in-out
                    ${index !== 0 && (isExpanded ? 'mt-5' : 'mt-4')}
                  `}
                >
                  <Item
                    key={`${item.route}-${index}`}
                    Icon={item.Icon}
                    title={item.title}
                    route={item.route}
                    childrenItems={item.childrenItems}
                    isExpanded={isExpanded}
                    inDevelopment={item.inDevelopment}
                  />
                </div>
              )
          )}
        </div>
        <div
          className={`
            flex flex-col border-t border-grey-extra-light flex-shrink-0
            transition-[margin,padding] duration-400 ease-in-out
            ${isExpanded ? 'pt-4 ml-0' : 'pt-3 ml-[5px]'}
          `}
        >
          {MENU_DOWN.map((item, index) => (
            <div
              className={`
                  transition-[margin] duration-400 ease-in-out
                  ${index === 0 && (isExpanded ? 'mb-4' : 'mb-3')}
                `}
            >
              <DownItem
                key={`${item.route}-down`}
                Icon={item.Icon}
                title={item.title}
                route={item.route}
                isExpanded={isExpanded}
                onClick={item.title === 'Выход' ? logout.logout : undefined}
                inDevelopment={item.inDevelopment}
              />
            </div>
          ))}
        </div>
      </nav>
    </aside>
  )
}
