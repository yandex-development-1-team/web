import { MenuItem } from '@/components/ui/MenuItem'
import { MENU_ADMIN, MENU_MANAGER } from './menu'

export const Sidebar = ({ role }: { role: 'manager' | 'admin' }) => {
  const menu = role === 'manager' ? MENU_MANAGER : MENU_ADMIN
  return (
    <aside className="w-[328px] p-[20px]">
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
    </aside>
  )
}
