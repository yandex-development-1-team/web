import { DeleteIcon, DownloadIcon } from '@/assets/icons'
import { Button, DataTable } from '@/components/ui'
import { Card } from '@/components/ui/Card'
import { useModal } from '@/components/ui/Modal/useModal'
import { Pagination } from '@/components/ui/Pagination'
import { Tabs } from '@/components/ui/Tabs'
import { useTabs } from '@/components/ui/Tabs/hooks/useTabs'
import { applicationColumns } from '@/mockData/mockApplications'
import { mockBoxApplicationData } from '@/mockData/mockBoxApplicationData'
import { type ApplicationListItem } from './applications.types'
import { TABS } from './applicationsTabs.config'
import { useApplications } from './hooks/useApplications'
import { Toolbar } from './Toolbar'
import { BoxApplicationModal } from './ui/BoxApplicationModal'

const renderActions = (row: ApplicationListItem) => (
  <>
    <Button variant="ghost" onClick={() => console.log('Delete', row.id)}>
      <DeleteIcon style={{ height: 24, width: 24 }} />
    </Button>
    <Button variant="ghost" onClick={() => console.log('Download', row.id)}>
      <DownloadIcon style={{ height: 24, width: 24 }} />
    </Button>
  </>
)

const Applications = () => {
  const { applications, pagination, isLoading } = useApplications()
  const { activeTab, onTabClick } = useTabs(TABS)
  const { isOpen, open, close } = useModal()

  const handleApplicationClick = (data: ApplicationListItem) => {
    open(data)
  }
  const handleDelete = async () => {}
  const handleModify = async () => {}

  return (
    <div className="flex flex-col gap-5">
      <Card>
        <h1 className=" text-text-black-dark text-h2">Заявки</h1>
        <Tabs activeTab={activeTab} onTabClick={onTabClick} tabs={TABS} className="w-full" />
        <Toolbar className="mt-4" />
      </Card>
      <Card>
        <DataTable<ApplicationListItem>
          idKey={'id'}
          data={applications}
          columns={applicationColumns}
          enableCheckboxes
          rowActions={renderActions}
          isLoading={isLoading}
          onRowClick={handleApplicationClick}
          pagination={<Pagination pagination={pagination} className="p-4 pt-0" />}
        />
      </Card>
      <BoxApplicationModal
        isOpen={isOpen}
        onClose={close}
        onDelete={handleDelete}
        onModify={handleModify}
        data={mockBoxApplicationData}
      />
    </div>
  )
}

export const Component = Applications
