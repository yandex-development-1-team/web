import { MOCK_TABS } from '@/mockData/mockDataExportPage'
import { PageTabs } from './PageTabs'
import { Card } from '@/components/ui/Card'
import { FileUploderList } from './FileUploaderList'
import { MOCK_FILES } from '@/mockData/mockFileUploaderList'

const DataExport = () => {
  return (
    <div className={`flex flex-col gap-5`}>
      <Card>
        <h1 className=" text-text-black-dark text-h2">Экспортированные файлы</h1>
        <PageTabs tabs={MOCK_TABS} className=""></PageTabs>
      </Card>
      <Card>
        <FileUploderList files={MOCK_FILES}></FileUploderList>
      </Card>
    </div>
  )
}

export const Component = DataExport
