import type { IBox } from '../BoxSolutions.types'
import type { IBoxDTO } from './types'

export const mapBoxDTOToBox = (box: IBoxDTO): IBox => {
  return {
    id: box.id,
    name: box.name,
    slug: box.slug,
    description: box.description,
    rules: box.rules,
    slots: (box.slots || []).map(slot => ({
      date: slot.date,
      timeFrom: slot.time_from,
      timeTo: slot.time_to
    })),
    location: box.location,
    price: box.price,
    image: box.image || '',
    status: box.status,
    organizer: box.organizer,
    createdAt: box.created_at,
    updatedAt: box.updated_at
  }
}

export const mapBoxesDTOToBoxes = (boxes: IBoxDTO[]): IBox[] => {
  return boxes.map(box => {
    return mapBoxDTOToBox(box)
  })
}
