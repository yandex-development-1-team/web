import { DownItem, MenuItem } from '@/components/ui/MenuItem'
import { MENU_ADMIN, MENU_DOWN, MENU_MANAGER } from './menu'

export const Sidebar = ({ role }: { role: 'manager' | 'admin' }) => {
  const menu = role === 'manager' ? MENU_MANAGER : MENU_ADMIN
  return (
    <aside className="w-[328px] min-h-screen p-[20px] flex flex-col justify-between">
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
