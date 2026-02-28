import { MOCK_TABS } from '@/mockData/mockDataExportPage'
import { PageTabs } from './ui/PageTabs'
import { Card } from '@/components/ui/Card'
import { FileUploderList } from './ui/FileUploaderList'
import { useState } from 'react'
import { DeleteModal } from './modal/DeleteMoadal'
import { useQuery } from '@tanstack/react-query'
import { getFiles } from './api/fetchFiles'
import { Loader } from '@/components/ui/Loader'

const DataExport = () => {
  const [fileToDelete, setFileToDelete] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>(MOCK_TABS[0].id)

  const { data, isPending } = useQuery({
    queryKey: ['data-export', activeTab],
    queryFn: () => getFiles(activeTab)
  })

  return (
    <div className={`flex flex-col gap-5`}>
      <Card>
        <h1 className=" text-text-black-dark text-h2">Экспортированные файлы</h1>
        <PageTabs tabs={MOCK_TABS} onTabClick={setActiveTab} activeTab={activeTab} className="" />
      </Card>
      <Card>{isPending ? <Loader /> : <FileUploderList files={data} onDelete={setFileToDelete} />}</Card>

      <DeleteModal
        title="Удалить документ!"
        isOpen={!!fileToDelete}
        onClose={() => setFileToDelete(null)}
        itemId={fileToDelete}
      >
        <div>{'Вы действительно хотите удалить этот документ?'}</div>
      </DeleteModal>
    </div>
  )
}

export const Component = DataExport
