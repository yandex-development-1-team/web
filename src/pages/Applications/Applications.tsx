import { DeleteIcon, DownloadIcon } from '@/assets/icons'
import { Button, DataTable } from '@/components/ui'
import { Card } from '@/components/ui/Card'
import { Pagination } from '@/components/ui/Pagination'
import { Tabs } from '@/components/ui/Tabs'
import { useTabs } from '@/components/ui/Tabs/hooks/useTabs'
import { applicationColumns } from '@/mockData/mockApplications'
import { type ApplicationListItem } from './Applications.types'
import { useApplications } from './hooks/useApplications'
import { TABS } from './mockData'

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

  return (
    <>
      <Card>
        <h1 className=" text-text-black-dark text-h2">Заявки</h1>
        <Tabs activeTab={activeTab} onTabClick={onTabClick} tabs={TABS} className="w-full" />
      </Card>
      <Card>
        <DataTable<ApplicationListItem>
          idKey={'id'}
          data={applications}
          columns={applicationColumns}
          enableCheckboxes
          rowActions={renderActions}
          isLoading={isLoading}
          pagination={<Pagination pagination={pagination} />}
        />
      </Card>
    </>
  )
}

export const Component = Applications
