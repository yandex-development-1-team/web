import { DeleteModal } from '@/components/ui'
import { Card } from '@/components/ui/Card'
import { Tabs, useTabs } from '@/components/ui/Tabs'
import { TABS } from '@/pages/Stats/DataExport/configs/dataExportTabs.config'
import { useState } from 'react'
import { deleteFile } from './api/deleteFile'
import { useDataExport } from './hooks/useDataExport'
import { FileUploaderList } from './ui/FileUploaderList'

const DataExport = () => {
  const [fileToDelete, setFileToDelete] = useState<string | null>(null)

  const { activeTab, onTabClick } = useTabs(TABS)

  const { data, isPending } = useDataExport(activeTab)

  return (
    <div className={`flex flex-col gap-5`}>
      <Card>
        <h1 className=" text-text-black-dark text-h2">Экспортированные файлы</h1>
        <Tabs tabs={TABS} onTabClick={onTabClick} activeTab={activeTab} />
      </Card>
      <Card>
        <FileUploaderList files={data} isPending={isPending} onDelete={setFileToDelete} />
      </Card>

      <DeleteModal
        title="Удалить документ?"
        isOpen={!!fileToDelete}
        onDelete={() => deleteFile(fileToDelete)}
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
