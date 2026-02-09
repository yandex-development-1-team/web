import { MenuItem } from '@/components/ui/MenuItem'
import { MENU_MANAGER } from './menu'

export const Sidebar = () => {
  return (
    <aside>
      <nav className="flex flex-col gap-[20px]">
        {MENU_MANAGER.map(item => (
          <MenuItem Icon={item.Icon} title={item.title} route={item.route} />
        ))}
      </nav>
    </aside>
  )
}
