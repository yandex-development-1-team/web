import { formatDateISO, parseToDate } from '@/lib/utils.date'
import type { BoxData, TimeSlot } from '@/types/solutions'
import type { BoxSolutionFormData } from './BoxSolutionModal.type'

export const FORM_TO_API_KEYS: Record<keyof BoxSolutionFormData, keyof Omit<BoxData, 'id'> | null> = {
  name: 'name',
  isActive: 'is_active_in_bot',
  timeSlots: 'time_slots',
  location: 'location',
  description: 'description',
  rules: 'rules',
  cost: 'cost',
  organizer: 'organizer',
  image: 'image'
} as const

export const getFormValues = (boxData?: BoxData): BoxSolutionFormData => {
  if (boxData) {
    const timeSlots = boxData.time_slots
      .filter(slot => slot.date && slot.time_from && slot.time_to)
      .map(slot => {
        const formattedDate = slot.date.split('-').reverse().join('.')
        return {
          date: parseToDate(formattedDate)!,
          timeRange: {
            from: slot.time_from,
            to: slot.time_to
          }
        }
      })

    return {
      name: boxData.name,
      isActive: boxData.is_active_in_bot,
      timeSlots: timeSlots.length > 0 ? timeSlots : [],
      location: boxData.location || '',
      description: boxData.description || '',
      rules: boxData.rules || '',
      cost: boxData.cost !== null && boxData.cost !== undefined ? String(boxData.cost) : '',
      organizer: boxData.organizer || '',
      image: null
    }
  }

  return {
    name: '',
    isActive: false,
    timeSlots: [
      {
        date: undefined,
        timeRange: undefined
      }
    ],
    location: '',
    description: '',
    rules: '',
    cost: '',
    organizer: '',
    image: null
  }
}

export const mapFormDataToBoxData = (data: BoxSolutionFormData, imageBase64?: string): Omit<BoxData, 'id'> => {
  const time_slots: TimeSlot[] = data.timeSlots
    .filter(slot => slot.date && slot.timeRange?.from && slot.timeRange?.to)
    .map(slot => ({
      date: formatDateISO(slot.date) || '',
      time_from: slot.timeRange?.from || '',
      time_to: slot.timeRange?.to || ''
    }))

  return {
    name: data.name,
    is_active_in_bot: data.isActive,
    time_slots,
    location: data.location,
    description: data.description,
    rules: data.rules,
    cost: Number(data.cost),
    organizer: data.organizer,
    image: imageBase64
  }
}
