import { formatDateISO, parseToDate } from '@/lib/utils.date'
import type { BoxData, TimeSlot } from '@/types/solutions'
import type {
  BoxSolutionFormData,
  BoxSolutionModalData,
  IBox,
  ICreateBoxRequest,
  IUpdateBoxRequest,
  StatusType
} from './ManageBoxModal.type'

export const FORM_TO_API_KEYS: Record<keyof BoxSolutionFormData, keyof Omit<BoxData, 'id'> | null> = {
  name: 'name',
  isActive: 'is_active_in_bot',
  timeSlots: 'time_slots',
  location: 'location',
  description: 'description',
  rules: 'rules',
  cost: 'price',
  organizer: 'organizer',
  image: 'image',
  imageUrl: 'image'
} as const

export const getFormValues = (boxData?: BoxSolutionModalData): BoxSolutionFormData => {
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
      cost: boxData.price !== null && boxData.price !== undefined ? String(boxData.price) : '',
      organizer: boxData.organizer || '',
      image: null,
      imageUrl: ''
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
    image: null,
    imageUrl: ''
  }
}

export const mapIBoxToModalData = (box: IBox | undefined): BoxSolutionModalData | undefined => {
  if (!box) return undefined
  return {
    id: box.id,
    name: box.name,
    description: box.description,
    rules: box.rules,
    location: box.location,
    price: box.price,
    image: box.image,
    organizer: box.organizer,
    time_slots: box.slots.map(box => {
      return { date: box.date, time_from: box.timeFrom, time_to: box.timeTo }
    }),
    is_active_in_bot: box.status === 'active'
  }
}

export const mapFormDataToBoxData = (data: BoxSolutionFormData, imageBase64?: string): Partial<Omit<BoxData, 'id'>> => {
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
    price: Number(data.cost),
    organizer: data.organizer,
    image: imageBase64 || ''
  }
}

export function mapFormDataToBoxRequest(data: BoxSolutionFormData, id: string, img?: string): IUpdateBoxRequest

export function mapFormDataToBoxRequest(data: BoxSolutionFormData, img?: string): ICreateBoxRequest

export function mapFormDataToBoxRequest(
  data: BoxSolutionFormData,
  id?: string,
  imageBase64?: string
): IUpdateBoxRequest | ICreateBoxRequest {
  const time_slots = data.timeSlots
    .filter(slot => slot.date && slot.timeRange?.from && slot.timeRange?.to)
    .map(slot => ({
      date: formatDateISO(slot.date) || '',
      time_from: slot.timeRange?.from || '',
      time_to: slot.timeRange?.to || ''
    }))

  const status = (data.isActive ? 'active' : 'inactive') as StatusType

  const request = {
    name: data.name,
    status,
    slots: time_slots,
    location: data.location,
    description: data.description,
    rules: data.rules,
    price: Number(data.cost),
    organizer: data.organizer,
    ...(imageBase64 && { image: imageBase64 })
  }

  return id ? { ...request, id } : request
}
