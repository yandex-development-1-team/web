import { useNotification } from '@/app/providers/notification'
import { DeleteModal } from '@/components/ui'
import { Card } from '@/components/ui/Card'
import { Loader } from '@/components/ui/Loader'
import { TABS } from '@/pages/Stats/DataExport/mockData.constants'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { deleteFile } from './api/deleteFile'
import { getFiles } from './api/fetchFiles'
import { FileUploderList } from './ui/FileUploaderList'
import { PageTabs } from './ui/PageTabs'

const DataExport = () => {
  const [fileToDelete, setFileToDelete] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]['path']>(TABS[0].path)
  const { showNotification } = useNotification()

  const { data, isPending, isError } = useQuery({
    queryKey: ['data-export', activeTab],
    queryFn: () => getFiles(activeTab)
  })

  if (isError) {
    showNotification({
      message: 'Не удалось получить список файлов',
      status: 'error'
    })
  }

  return (
    <div className={`flex flex-col gap-5`}>
      <Card>
        <h1 className=" text-text-black-dark text-h2">Экспортированные файлы</h1>
        <PageTabs tabs={TABS} onTabClick={setActiveTab} activeTab={activeTab} className="" />
      </Card>
      <Card>{isPending ? <Loader /> : <FileUploderList files={data} onDelete={setFileToDelete} />}</Card>

      <DeleteModal
        title="Удалить документ!"
        isOpen={!!fileToDelete}
        onDelete={() => deleteFile(fileToDelete ?? '')}
        onClose={() => setFileToDelete(null)}
        itemId={fileToDelete}
        queryKey={['data-export']}
      >
        <div>{'Вы действительно хотите удалить этот документ?'}</div>
      </DeleteModal>
    </div>
  )
}

export const Component = DataExport
