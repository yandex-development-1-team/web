import type { TABS } from '@/pages/Applications/mockData'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { ITab } from '../Tabs.types'

export const useTabs = (tabs: ITab[]) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]['path']>(tabs[0].path)

  const onTabClick = (path: (typeof TABS)[number]['path']) => {
    setActiveTab(path)

    const currentParams = Object.fromEntries(searchParams.entries())

    setSearchParams({
      ...currentParams,
      type: path,
      offset: '0'
    })
  }

  return {
    activeTab,
    onTabClick
  }
}
