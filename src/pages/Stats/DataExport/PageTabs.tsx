import { useState } from 'react'
import type { ITabsProps } from './DataExport.types'
import { cn } from '@/lib/utils.clsx'
// import {} from '@/assets/icons'
// import { v4 as UUIDv4 } from 'uuid';

export const PageTabs = ({ tabs, className, ...props }: ITabsProps) => {
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0].id)

  const handleTabClick = (id: string) => {
    setSelectedTab(id)
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
        const { Icon, id, title } = tab
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
              selectedTab === id && 'border-b-2 border-b-yellow-accent-dark'
            )}
            onClick={() => handleTabClick(id)}
          >
            <div className={`w-6 h-6 shrink-0`}>
              <Icon className={`w-full h-full`} />
            </div>
            <h4
              className={`text-xl font-display font-normal  transition-colors duration-300 ${selectedTab !== id && 'text-grey-dark'}`}
            >
              {title}
            </h4>
          </div>
        )
      })}
    </div>
  )
}
