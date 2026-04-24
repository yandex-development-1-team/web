import { useQuery } from '@tanstack/react-query'
import { getBox } from '../api/getBox'
import { mapIBoxToModalData } from '../ManageBoxModal/helpers'

export const useBox = (boxId: string | null) => {
  const { data } = useQuery({
    queryKey: ['box', boxId],
    queryFn: () => getBox(boxId),
    enabled: !!boxId
  })

  const parsedFormData = mapIBoxToModalData(data)

  return {
    parsedFormData
  }
}
