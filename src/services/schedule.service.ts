import { api } from '@/app/providers/axios'
import { events as mockEvents } from '@/mockData/mockScheduleData'
import type { TEvent } from '@/types/schedule.types'

export interface IParams {
  date_from: string
  date_to?: string
  limit: number
  offset?: number
  box_id?: number
  status?: string
}

export interface IPagination {
  limit: number
  offset: number
  total: number
}

export interface IEventsResponse {
  items: TEvent[]
  pagination: IPagination
}

const USE_MOCKS = true

const MOCK_EVENTS = [...mockEvents]

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const scheduleApi = {
  getEvents: async (params: IParams): Promise<IEventsResponse> => {
    await delay(500)

    if (USE_MOCKS) {
      const limit = params.limit || 20
      const offset = params.offset || 0

      const paginatedItems = MOCK_EVENTS.slice(offset, offset + limit)

      return {
        items: paginatedItems,
        pagination: {
          limit,
          offset,
          total: MOCK_EVENTS.length
        }
      }
    }

    const response = await api.get('/events', { params })
    return response.data
  },

  updateEvent: async ({ id, ...data }: Partial<TEvent> & { id: number }) => {
    await delay(400)

    if (USE_MOCKS) {
      const index = MOCK_EVENTS.findIndex(e => e.id === id)
      if (index === -1) {
        throw new Error('Event not found')
      }

      MOCK_EVENTS[index] = {
        ...MOCK_EVENTS[index],
        ...data
      }

      return MOCK_EVENTS[index]
    }

    const response = await api.put(`/events/${id}`, data)
    return response.data
  },

  deleteEvent: async (id: number) => {
    await delay(300)

    if (USE_MOCKS) {
      const index = MOCK_EVENTS.findIndex(e => e.id === id)
      if (index === -1) {
        throw new Error('Event not found')
      }

      MOCK_EVENTS.splice(index, 1)
      return { message: 'Event deleted successfully' }
    }

    const response = await api.delete(`/events/${id}`)
    return response.data
  }
}
