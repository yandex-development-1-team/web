export const MOCK_BOXS_NAME = [
  'Третьяковская галерея: Шедевры живописи',
  'Государственный музей изобразительных искусств имени А.С. Пушкина',
  'Экспериментариум: Научное шоу для детей',
  'Эрмитаж: Главный музейный комплекс',
  'Русский музей: Древнерусское искусство',
  'Музей космонавтики: Путешествие в космос',
  'Дарвиновский музей: Эволюция жизни',
  'Политехнический музей: История науки и техники',
  'Центр современного искусства Винзавод',
  'Музей Москвы: История столицы'
]

export const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const generateDatesBetween = (startDate: string, endDate: string): string[] => {
  const dates: string[] = []
  const start = new Date(startDate)
  const end = new Date(endDate)

  for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
    dates.push(new Date(d).toISOString().split('T')[0])
  }

  return dates
}

export const generateMockBoxData = (boxId: number, boxName: string, dates: string[]) => {
  return {
    id: boxId,
    name: boxName,
    data: dates.map(date => ({
      date: date,
      records: randomInt(50, 500),
      visitors: randomInt(100, 1000)
    }))
  }
}
