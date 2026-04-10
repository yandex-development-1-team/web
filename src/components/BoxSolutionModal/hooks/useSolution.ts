import { getBoxById } from '@/pages/BoxSolutions/api/getBoxById'

import type { IBox } from '@/pages/BoxSolutions/BoxSolutions.types'
import { useQuery } from '@tanstack/react-query'
import type { BoxSolutionModalData } from '../BoxSolutionModal.type'

export const useSolution = (boxId: string | null) => {
  const { data } = useQuery({
    queryKey: ['box', boxId],
    queryFn: () => getBoxById(boxId),
    enabled: !!boxId
  })

  const mapIBoxToModalData = (box: IBox | undefined): BoxSolutionModalData | undefined => {
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
      is_active_in_bot: box.status
    }
  }

  const parsedFormData = mapIBoxToModalData(data)

  return {
    parsedFormData
  }
}
