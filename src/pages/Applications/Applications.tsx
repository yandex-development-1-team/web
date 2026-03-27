import { DeleteIcon, DownloadIcon } from '@/assets/icons'
import { Button, DataTable } from '@/components/ui'
import { Card } from '@/components/ui/Card'
import { Pagination } from '@/components/ui/Pagination'
import { applicationColumns } from '@/mockData/mockApplications'
import { type ApplicationListItem } from './Applications.types'
import { useApplications } from './hooks/useApplications'

const renderActions = (row: ApplicationListItem) => (
  <>
    <Button variant="ghost" onClick={() => console.log('Delete', row.id)}>
      <DeleteIcon />
    </Button>
    <Button variant="ghost" onClick={() => console.log('Download', row.id)}>
      <DownloadIcon />
    </Button>
  </>
)

const Applications = () => {
  const { applications, pagination, isLoading } = useApplications()

  return (
    <>
      <h1>Заявки</h1>
      <p>Страница в разработке... </p>
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
