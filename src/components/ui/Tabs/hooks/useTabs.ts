import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { ITab } from '../Tabs.types'

export const useTabs = <T extends string>(tabs: ITab<T>[]) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const activeTab = useMemo(() => {
    const tabType = searchParams.get('type')
    return tabType ?? tabs[0]?.path ?? ''
  }, [searchParams, tabs]) as ITab<T>['path']

  const onTabClick = (path: ITab<T>['path']) => {
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
