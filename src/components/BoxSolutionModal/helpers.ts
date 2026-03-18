import { formatDateToISO, parseToDate } from '@/lib/utils.date'
import type { BoxData } from '@/types/solutions'
import type { BoxSolutionFormData, ModalAction } from './BoxSolutionModal.type'
import { mockSelectOptions } from '@/mockData/mockSelectOptions'

export const getFormValues = (action: ModalAction, boxData?: BoxData): BoxSolutionFormData => {
  if (action === 'edit' && boxData) {
    const formattedDate = boxData.date?.split('-').reverse().join('.')

    return {
      name: boxData.name,
      isActive: boxData.isActive,
      date: formattedDate ? parseToDate(formattedDate) : undefined,
      timeRange: {
        from: boxData.startTime,
        to: boxData.endTime
      },
      location: boxData.location || mockSelectOptions[0]?.value || '',
      description: boxData.description || '',
      rules: boxData.rules || '',
      cost: boxData.cost ? String(boxData.cost) : '',
      organizer: boxData.organizer || '',
      image: null
    }
  }

  return {
    name: '',
    isActive: false,
    date: undefined,
    timeRange: undefined,
    location: mockSelectOptions[0]?.value || '',
    description: '',
    rules: '',
    cost: '',
    organizer: '',
    image: null
  }
}

export const mapFormDataToBoxData = (data: BoxSolutionFormData, imageBase64?: string): Omit<BoxData, 'id'> => {
  return {
    name: data.name,
    isActive: data.isActive,
    date: formatDateToISO(data.date),
    startTime: data.timeRange?.from,
    endTime: data.timeRange?.to,
    location: data.location,
    description: data.description,
    rules: data.rules,
    cost: Number(data.cost),
    organizer: data.organizer,
    image: imageBase64
  }
}
