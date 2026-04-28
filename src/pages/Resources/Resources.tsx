import { v4 as uuidv4 } from 'uuid'
import { Block, InfoForm, LinkForm } from './ui'
import type { LinkBlockKey } from './Resources.types'
import type { InfoFormData, LinkFormFields } from './ui/Form/Form.types'
import { usePermissions, PERMISSIONS } from '@/hooks/usePermissions'
import { useResources } from '@/pages/Resources/hooks/useResources'
import { Loader } from '@/components/ui'

const Resources = () => {
  const {
    organizationInfo,
    usefulLinks,
    faq,
    eventSchedule,
    isLoadingOrganizationInfo,
    isLoadingFaq,
    isLoadingEventSchedule,
    updateOrganizationInfo,
    deleteOrganizationLink,
    updateFaq,
    deleteFaqLink,
    updateEventSchedule,
    deleteEventScheduleLink
  } = useResources()

  const handleSaveInfo = (infoData: InfoFormData) => {
    updateOrganizationInfo.mutate({ content: infoData.info, links: usefulLinks })
  }

  const handleDeleteInfo = () => {
    updateOrganizationInfo.mutate({ content: '', links: usefulLinks })
  }

  const addLink = (blockKey: LinkBlockKey) => (linkData: LinkFormFields) => {
    const linkWithId = { ...linkData, id: uuidv4() }

    const actions = {
      usefulLinks: () => {
        updateOrganizationInfo.mutate({
          content: organizationInfo,
          links: [...usefulLinks, linkWithId]
        })
      },
      faq: () => {
        updateFaq.mutate([...faq, linkWithId])
      },
      eventSchedule: () => {
        updateEventSchedule.mutate([...eventSchedule, linkWithId])
      }
    }

    actions[blockKey]()
  }

  const removeLink = (blockKey: LinkBlockKey) => (id: string) => {
    const actions = {
      usefulLinks: () => {
        deleteOrganizationLink.mutate(id)
      },
      faq: () => {
        deleteFaqLink.mutate(id)
      },
      eventSchedule: () => {
        deleteEventScheduleLink.mutate(id)
      }
    }

    actions[blockKey]()
  }

  const { hasAccess } = usePermissions()

  return (
    <div className="flex flex-col gap-5">
      {hasAccess(PERMISSIONS.about) && (
        <Block title="Информация об организации">
          {isLoadingOrganizationInfo ? (
            <Loader />
          ) : (
            <InfoForm defaultValue={organizationInfo} onSaveInfo={handleSaveInfo} onDeleteInfo={handleDeleteInfo} />
          )}
        </Block>
      )}
      <Block title="Полезные ссылки">
        {isLoadingOrganizationInfo ? (
          <Loader />
        ) : (
          <LinkForm
            links={usefulLinks || []}
            onAddLink={addLink('usefulLinks')}
            onRemoveLink={removeLink('usefulLinks')}
          />
        )}
      </Block>
      {hasAccess(PERMISSIONS.faq) && (
        <Block title="FAQ">
          {isLoadingFaq ? (
            <Loader />
          ) : (
            <LinkForm links={faq || []} onAddLink={addLink('faq')} onRemoveLink={removeLink('faq')} />
          )}
        </Block>
      )}
      {hasAccess(PERMISSIONS.affiche) && (
        <Block title="Афиша Partner Relations">
          {isLoadingEventSchedule ? (
            <Loader />
          ) : (
            <LinkForm
              links={eventSchedule || []}
              onAddLink={addLink('eventSchedule')}
              onRemoveLink={removeLink('eventSchedule')}
            />
          )}
        </Block>
      )}
    </div>
  )
}

export const Component = Resources
