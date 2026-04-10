import box_image from '@/mockData/box_image.jpg'
import box_image_1 from '@/mockData/box_image_1.jpg'
import box_image_2 from '@/mockData/box_image_2.jpg'
import box_image_3 from '@/mockData/box_image_3.jpg'
import box_image_4 from '@/mockData/box_image_4.jpg'
import type { IBox } from '@/pages/BoxSolutions/BoxSolutions.types'

const names = ['Олимп', 'Спартак', 'Лидер', 'Арена Сити', 'Вымпел', 'Старт', 'Рекорд', 'Титан']

const streets = ['Ленина', 'Мира', 'Советская', 'Гагарина', 'Лесная', 'Полевая', 'Новая', 'Садовая']

const descriptions = [
  'Современная площадка с профессиональным покрытием для мини-футбола. Современная площадка с профессиональным покрытием для мини-футбола',
  'Универсальный зал для баскетбола и волейбола с отличным освещением.',
  'Открытая зона с искусственным газоном последнего поколения.',
  'Многофункциональный комплекс для командных видов спорта и тренировок. Многофункциональный комплекс для командных видов спорта и тренировок.',
  'Уютная площадка в тихом районе, идеально для любительских матчей.'
]

const rulesList = [
  'Сменная обувь обязательна. Курение запрещено.',
  'Только чистая спортивная обувь. Проход со своими мячами разрешен.',
  'Соблюдайте чистоту. Вода разрешена только в закрытых бутылках. Сменная обувь обязательна. Курение запрещено.',
  'Запрещено использование шиповок. Бережное отношение к инвентарю.',
  'Приходить за 10 минут до начала. Вход строго по записи.'
]

export const MOCK_BOXES: IBox[] = Array.from({ length: 72 }, (_, index) => {
  const id = 300 + index
  const randomDay = Math.floor(Math.random() * 20) + 10
  const startHour = Math.floor(Math.random() * 5) + 10
  const images = [box_image, box_image_1, box_image_2, box_image_3, box_image_4]
  return {
    id,
    name: `Спортивный комплекс "${names[Math.floor(Math.random() * names.length)]}"`, //`Private Excursion #${id}`,
    slug: `secret-box-${id}`,
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    rules: rulesList[Math.floor(Math.random() * rulesList.length)],
    date: '25122024',
    slots: [
      {
        date: `2024-03-${randomDay}`,
        timeFrom: `${startHour}:00`,
        timeTo: `${startHour + 2}:00`
      },
      {
        date: `2024-03-${randomDay + 1}`,
        timeFrom: `${startHour + 4}:00`,
        timeTo: `${startHour + 6}:00`
      }
    ],
    location: `ул. ${streets[Math.floor(Math.random() * streets.length)]}, д. ${Math.floor(Math.random() * 90) + 1}`,
    price: Math.floor(Math.random() * (5000 - 500 + 1)) + 500,
    image: index % 4 === 0 ? '' : images[index % 5],
    status: index % 3 === 0,
    organizer: 'Secret Events Team',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: 101
  }
})
