import { queryClient } from '@/app/providers/tanstack-query/queryClient'
import { deleteLinks } from '@/pages/Resources/api/deleteLinks' // Импортируем функцию удаления
import { useMutation, useQuery } from '@tanstack/react-query'
import type { IResourcesResponseData } from '@/pages/Resources/Resources.types'
import type { LinkWithId } from '@/pages/Resources/ui/Form/Form.types'
import { getResources } from '@/pages/Resources/api/getResources'
import { putResources } from '@/pages/Resources/api/putResources'
import { useNotification } from '@/app/providers/notification'

export const useResources = () => {
  const { showNotification } = useNotification()

  const { data: organizationInfo, isLoading: isLoadingOrganizationInfo } = useQuery({
    queryKey: ['ResourcesOrganizationInfo'],
    queryFn: () => getResources.getOrganizationInfo()
  })

  const { data: faq, isLoading: isLoadingFaq } = useQuery({
    queryKey: ['ResourcesFaq'],
    queryFn: () => getResources.getFaq()
  })

  const { data: eventSchedule, isLoading: isLoadingEventSchedule } = useQuery({
    queryKey: ['ResourcesEventSchedule'],
    queryFn: () => getResources.getEventSchedule()
  })

  const updateOrganizationInfo = useMutation({
    mutationFn: (data: Partial<IResourcesResponseData>) => putResources.putOrganizationInfo(data),
    onMutate: async newData => {
      await queryClient.cancelQueries({ queryKey: ['ResourcesOrganizationInfo'] })

      const previousData = queryClient.getQueryData<IResourcesResponseData>(['ResourcesOrganizationInfo'])

      queryClient.setQueryData<IResourcesResponseData>(['ResourcesOrganizationInfo'], old => {
        if (!old) return old
        return {
          ...old,
          content: newData.content !== undefined ? newData.content : old.content,
          links: newData.links !== undefined ? newData.links : old.links
        }
      })

      return { previousData }
    },
    onSuccess: () => {
      showNotification({ status: 'success', message: 'Информация об организации обновлена' })
    },
    onError: (_err, _newData, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['ResourcesOrganizationInfo'], context.previousData)
      }
      showNotification({ status: 'error', message: 'Не удалось обновить информацию об организации' })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['ResourcesOrganizationInfo'] })
    }
  })

  const deleteOrganizationLink = useMutation({
    mutationFn: (linkId: string) => deleteLinks.OrganizationLink(linkId),
    onMutate: async deletedLinkId => {
      await queryClient.cancelQueries({ queryKey: ['ResourcesOrganizationInfo'] })

      const previousData = queryClient.getQueryData<IResourcesResponseData>(['ResourcesOrganizationInfo'])

      queryClient.setQueryData<IResourcesResponseData>(['ResourcesOrganizationInfo'], old => {
        if (!old) return old
        return {
          ...old,
          links: old.links.filter(link => link.id !== deletedLinkId)
        }
      })

      return { previousData }
    },
    onSuccess: () => {
      showNotification({ status: 'success', message: 'Ссылка успешно удалена' })
    },
    onError: (_err, _deletedLinkId, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['ResourcesOrganizationInfo'], context.previousData)
      }
      showNotification({ status: 'error', message: 'Не удалось удалить ссылку' })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['ResourcesOrganizationInfo'] })
    }
  })

  const updateFaq = useMutation({
    mutationFn: (links: LinkWithId[]) => putResources.putFaq({ links }),
    onMutate: async newLinks => {
      await queryClient.cancelQueries({ queryKey: ['ResourcesFaq'] })

      const previousData = queryClient.getQueryData<{ links: LinkWithId[] }>(['ResourcesFaq'])

      queryClient.setQueryData<{ links: LinkWithId[] }>(['ResourcesFaq'], old => {
        if (!old) return { links: newLinks }
        return { ...old, links: newLinks }
      })

      return { previousData }
    },
    onSuccess: () => {
      showNotification({ status: 'success', message: 'FAQ успешно обновлены' })
    },
    onError: (_err, _newLinks, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['ResourcesFaq'], context.previousData)
      }
      showNotification({ status: 'error', message: 'Не удалось обновить FAQ' })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['ResourcesFaq'] })
    }
  })

  const deleteFaqLink = useMutation({
    mutationFn: (linkId: string) => deleteLinks.FaqLink(linkId),
    onMutate: async deletedLinkId => {
      await queryClient.cancelQueries({ queryKey: ['ResourcesFaq'] })

      const previousData = queryClient.getQueryData<{ links: LinkWithId[] }>(['ResourcesFaq'])

      queryClient.setQueryData<{ links: LinkWithId[] }>(['ResourcesFaq'], old => {
        if (!old) return old
        return {
          ...old,
          links: old.links.filter(link => link.id !== deletedLinkId)
        }
      })

      return { previousData }
    },
    onSuccess: () => {
      showNotification({ status: 'success', message: 'Ссылка успешно удалена' })
    },
    onError: (_err, _deletedLinkId, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['ResourcesFaq'], context.previousData)
      }
      showNotification({ status: 'error', message: 'Не удалось удалить ссылку' })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['ResourcesFaq'] })
    }
  })

  const updateEventSchedule = useMutation({
    mutationFn: (links: LinkWithId[]) => putResources.putEventSchedule({ links }),
    onMutate: async newLinks => {
      await queryClient.cancelQueries({ queryKey: ['ResourcesEventSchedule'] })

      const previousData = queryClient.getQueryData<{ links: LinkWithId[] }>(['ResourcesEventSchedule'])

      queryClient.setQueryData<{ links: LinkWithId[] }>(['ResourcesEventSchedule'], old => {
        if (!old) return { links: newLinks }
        return { ...old, links: newLinks }
      })

      return { previousData }
    },
    onSuccess: () => {
      showNotification({ status: 'success', message: 'Афиша успешно обновлена' })
    },
    onError: (_err, _newLinks, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['ResourcesEventSchedule'], context.previousData)
      }
      showNotification({ status: 'error', message: 'Не удалось обновить афишу' })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['ResourcesEventSchedule'] })
    }
  })

  const deleteEventScheduleLink = useMutation({
    mutationFn: (linkId: string) => deleteLinks.EventScheduleLink(linkId),
    onMutate: async deletedLinkId => {
      await queryClient.cancelQueries({ queryKey: ['ResourcesEventSchedule'] })

      const previousData = queryClient.getQueryData<{ links: LinkWithId[] }>(['ResourcesEventSchedule'])

      queryClient.setQueryData<{ links: LinkWithId[] }>(['ResourcesEventSchedule'], old => {
        if (!old) return old
        return {
          ...old,
          links: old.links.filter(link => link.id !== deletedLinkId)
        }
      })

      return { previousData }
    },
    onSuccess: () => {
      showNotification({ status: 'success', message: 'Ссылка успешно удалена' })
    },
    onError: (_err, _deletedLinkId, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['ResourcesEventSchedule'], context.previousData)
      }
      showNotification({ status: 'error', message: 'Не удалось удалить ссылку' })
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['ResourcesEventSchedule'] })
    }
  })

  return {
    organizationInfo: organizationInfo?.content || '',
    usefulLinks: organizationInfo?.links || [],
    faq: faq?.links || [],
    eventSchedule: eventSchedule?.links || [],

    isLoadingOrganizationInfo,
    isLoadingFaq,
    isLoadingEventSchedule,

    updateOrganizationInfo,
    deleteOrganizationLink,
    updateFaq,
    deleteFaqLink,
    updateEventSchedule,
    deleteEventScheduleLink
  }
}
