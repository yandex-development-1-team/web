import box_image from '@/mockData/box_image.jpg'
import type { BoxStatus } from '@/pages/BoxSolutions/BoxSolutions.types'
import type { IBox } from '@/types/solutions'

export const MOCK_BOXES: IBox[] = Array.from({ length: 35 }, (_, index) => {
  const id = index + 1

  return {
    id: id,
    name: `Private Excursion #${id}`,
    slug: `secret-box-${id}`,
    description: 'Уютное путешествие по шедеврам русского искусства с персональным гидом.',
    rules: '1. Участвовать могут лица старше 18 лет. 2. Оплата производится заранее. 3. Доставка включена.',
    date: '25122024',
    time: '18:00',
    location: 'Москва, ул. Примерная, д. 10',
    price: Math.floor(Math.random() * (5000 - 500 + 1)) + 500,
    image: box_image,
    status: index % 3 === 0 ? 'active' : ('inactive' as BoxStatus),
    organizer: 'Secret Events Team',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: 101
  }
})
