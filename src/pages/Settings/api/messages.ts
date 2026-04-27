import { api } from '@/app/providers/axios'
import { API_ROUTES } from '@/services/api/routes'
import type { ITextFieldValue } from '../Settings.types'

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

export const putMessages = (values: string[]) => {
  const data: MessagesDTO = {
    welcome_message: values[0] || '',
    record_confirmation: values[1] || '',
    event_reminder_for_week: values[2] || '',
    event_reminder_for_24_hours: values[3] || '',
    cancellation_message: values[4] || '',
    thanks_message: values[5] || '',
    system_err_message: values[6] || ''
  }

  return api.put<void>(API_ROUTES.settings.messages, data)
}
