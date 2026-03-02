// import { useState } from 'react'
import { cn } from '@/lib/utils.clsx'
import type { ITabsProps, TPath } from '../DataExport.types'

export const PageTabs = ({ tabs, onTabClick, activeTab, className, ...props }: ITabsProps) => {
  // const [selectedTab, setSelectedTab] = useState<string>(tabs[0].id)

  const handleTabClick = (path: TPath) => {
    onTabClick(path)
  }

  if (!tabs.length) return null

  return (
    <div
      className={cn(
        'flex flex-row items-center gap-8',
        'h-13 w-min mt-5 ',
        'border-b border-b-yellow-light',
        className
      )}
      {...props}
    >
      {tabs.map(tab => {
        const { Icon, id, title, path } = tab
        return (
          <div
            key={id}
            className={cn(
              'flex flex-row items-center gap-1',
              'min-h-full',
              'cursor-pointer',
              'hover:border-b-yellow-accent-dark',
              'transition-[border-color] duration-300',
              'border-transparent border-b',
              activeTab === path && 'border-b-2 border-b-yellow-accent-dark'
            )}
            onClick={() => handleTabClick(path)}
          >
            <div className={`w-6 h-6 shrink-0`}>
              <Icon className={`w-full h-full`} style={{ color: 'text-text-grey' }} />
            </div>
            <h4
              className={`text-h4 font-display font-normal  transition-colors duration-300 ${activeTab !== path && 'text-text-grey-dark'}`}
            >
              {title}
            </h4>
          </div>
        )
      })}
    </div>
  )
}
