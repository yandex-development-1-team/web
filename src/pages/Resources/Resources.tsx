import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Block, InfoForm, LinkForm } from './ui'
import type { LinkBlockKey, ResourcesData } from './Resources.types'
import type { InfoFormData, LinkFormFields } from './ui/Form/Form.types'

const Resources = () => {
  const [data, setData] = useState<ResourcesData>({
    organizationInfo: '',
    usefulLinks: [],
    faq: [],
    eventSchedule: []
  })

  const handleSaveInfo = (infoData: InfoFormData) => {
    setData(prev => ({ ...prev, organizationInfo: infoData.info }))
  }

  const handleDeleteInfo = () => {
    setData(prev => ({ ...prev, organizationInfo: '' }))
  }

  const addLink = (blockKey: LinkBlockKey) => (linkData: LinkFormFields) => {
    const linkWithId = { ...linkData, id: uuidv4() }
    setData(prev => ({ ...prev, [blockKey]: [...prev[blockKey], linkWithId] }))
  }

  const removeLink = (blockKey: LinkBlockKey) => (id: string) => {
    setData(prev => ({ ...prev, [blockKey]: prev[blockKey].filter(link => link.id !== id) }))
  }

  return (
    <div className="flex flex-col gap-[20px]">
      <Block title="Информация об организации">
        <InfoForm defaultValue={data.organizationInfo} onSaveInfo={handleSaveInfo} onDeleteInfo={handleDeleteInfo} />
      </Block>
      <Block title="Полезные ссылки">
        <LinkForm
          links={data.usefulLinks}
          onAddLink={addLink('usefulLinks')}
          onRemoveLink={removeLink('usefulLinks')}
        />
      </Block>
      <Block title="FAQ">
        <LinkForm links={data.faq} onAddLink={addLink('faq')} onRemoveLink={removeLink('faq')} />
      </Block>
      <Block title="Афиша Partner Relations">
        <LinkForm
          links={data.eventSchedule}
          onAddLink={addLink('eventSchedule')}
          onRemoveLink={removeLink('eventSchedule')}
        />
      </Block>
    </div>
  )
}

export const Component = Resources
