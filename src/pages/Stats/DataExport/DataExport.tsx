import { MOCK_TABS } from '@/mockData/mockDataExportPage'
import { PageTabs } from './PageTabs'

const DataExport = () => {
  return (
    <>
      <div className="bg-white text-text-black-dark text-h2 p-[18px_20px] rounded-md">
        <h1>Экспортированные файлы</h1>
        <PageTabs tabs={MOCK_TABS} className=""></PageTabs>
      </div>

      <p>Страница в разработке...</p>
    </>
  )
}

export const Component = DataExport
