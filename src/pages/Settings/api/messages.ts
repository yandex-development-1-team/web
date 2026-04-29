import { api } from '@/app/providers/axios'
import { API_ROUTES } from '@/services/api/routes'
import type { ITextFieldValue } from '../Settings.types'
import { textFields } from '../settingsData'

export const settingsMessagesServerNames = {
  welcome_message: 'welcome_message',
  record_confirmation: 'record_confirmation',
  event_reminder_for_week: 'event_reminder_for_week',
  event_reminder_for_24_hours: 'event_reminder_for_24_hours',
  cancellation_message: 'cancellation_message',
  thanks_message: 'thanks_message',
  system_err_message: 'system_err_message'
}

export interface MessagesDTO {
  welcome_message?: string
  record_confirmation?: string
  event_reminder_for_week?: string
  event_reminder_for_24_hours?: string
  cancellation_message?: string
  thanks_message?: string
  system_err_message?: string
}

export const getMessages = async ({ signal }: { signal: AbortSignal }) => {
  const response = await api.get<MessagesDTO>(API_ROUTES.settings.messages, { signal })
  const data = response.data

  const textFieldsValues: ITextFieldValue[] = [
    { id: 0, value: data.welcome_message || '' },
    { id: 1, value: data.record_confirmation || '' },
    { id: 2, value: data.event_reminder_for_week || '' },
    { id: 3, value: data.event_reminder_for_24_hours || '' },
    { id: 4, value: data.cancellation_message || '' },
    { id: 5, value: data.thanks_message || '' },
    { id: 6, value: data.system_err_message || '' }
  ]

  return textFieldsValues
}

export const putMessages = (values: ITextFieldValue[]) => {
  const data = textFields.reduce((acc, field) => {
    const item = values.find(v => v.id === field.id)
    acc[field.serverName as keyof MessagesDTO] = item?.value || ''
    return acc
  }, {} as MessagesDTO)
  return api.put<void>(API_ROUTES.settings.messages, data)
}
