import type { BoxData, IProject } from '@/types/solutions'
import type { IIndicatorValues } from '@/types/indicators'

export const mockIndicatorsValues: IIndicatorValues[] = [
  { id: 0, value: 5 },
  { id: 1, value: 25 },
  { id: 2, value: 10 },
  { id: 3, value: 4 }
]

export const mockBoxes: BoxData[] = [
  {
    id: 0,
    name: 'Экскурсия по русской живописи',
    isActive: true,
    date: '2024-03-15',
    startTime: '10:00',
    endTime: '12:00',
    location: 'gallery',
    description: 'Обзорная экскурсия по залам русской живописи XIX-XX веков',
    rules: 'Не трогать экспонаты, фотосъемка без вспышки',
    cost: '800',
    organizer: 'Екатерина Волкова'
  },
  {
    id: 1,
    name: 'Искусство Древнего Египта',
    isActive: true,
    date: '2024-03-16',
    startTime: '14:00',
    endTime: '15:30',
    location: 'museum',
    description: 'Знакомство с коллекцией древнеегипетского искусства',
    rules: 'Верхнюю одежду сдать в гардероб, большие сумки запрещены',
    cost: '600',
    organizer: 'Александр Соколов'
  },
  {
    id: 2,
    name: 'Научное шоу "Чудеса физики"',
    isActive: false,
    date: '2024-03-17',
    startTime: '11:00',
    endTime: '12:30',
    location: 'experiment',
    description: 'Интерактивное научное шоу с экспериментами',
    rules: 'Дети до 12 лет только в сопровождении взрослых',
    cost: '1200',
    organizer: 'Дмитрий Новиков'
  },
  {
    id: 3,
    name: 'Мастер-класс по керамике',
    isActive: true,
    date: '2024-03-18',
    startTime: '16:00',
    endTime: '18:00',
    location: 'museum',
    description: 'Создание керамических изделий своими руками',
    rules: 'Необходима предварительная запись, количество мест ограничено',
    cost: '1500',
    organizer: 'Ольга Морозова'
  }
]

export const mockProjects: IProject[] = [
  { id: 0, name: 'Название спецпроекта' },
  { id: 1, name: 'Название спецпроекта' },
  { id: 2, name: 'Название спецпроекта' },
  { id: 3, name: 'Название спецпроекта' }
]
