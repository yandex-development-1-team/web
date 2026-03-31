import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { ITab } from '../Tabs.types'

export const useTabs = (tabs: ITab[]) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const activeTab = useMemo(() => {
    const tabType = searchParams.get('type')
    return tabType ?? tabs[0]?.path ?? ''
  }, [searchParams, tabs])

  const onTabClick = (path: ITab['path']) => {
    setSearchParams(prev => ({
      ...Object.fromEntries(prev.entries()),
      type: path,
      offset: '0'
    }))
  }

  return {
    activeTab,
    onTabClick
  }
}
