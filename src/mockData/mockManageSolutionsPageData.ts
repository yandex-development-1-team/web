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
    is_active_in_bot: true,
    time_slots: [
      {
        date: '2024-03-15',
        time_from: '10:00',
        time_to: '12:00'
      },
      {
        date: '2024-03-16',
        time_from: '10:00',
        time_to: '12:00'
      },
      {
        date: '2024-03-17',
        time_from: '10:00',
        time_to: '12:00'
      }
    ],
    location: 'Государственная Третьяковская галерея (Лаврушинский переулок, дом 10)',
    description: 'Обзорная экскурсия по залам русской живописи XIX-XX веков',
    rules: 'Не трогать экспонаты, фотосъемка без вспышки',
    cost: 800,
    organizer: 'Екатерина Волкова'
  },
  {
    id: 1,
    name: 'Искусство Древнего Египта',
    is_active_in_bot: true,
    time_slots: [
      {
        date: '2024-03-16',
        time_from: '14:00',
        time_to: '15:30'
      }
    ],
    location: 'Пушкинский музей (улица Волхонка, дом 12)',
    description: 'Знакомство с коллекцией древнеегипетского искусства',
    rules: 'Верхнюю одежду сдать в гардероб, большие сумки запрещены',
    cost: 600,
    organizer: 'Александр Соколов'
  },
  {
    id: 2,
    name: 'Научное шоу "Чудеса физики"',
    is_active_in_bot: false,
    time_slots: [
      {
        date: '2024-03-17',
        time_from: '11:00',
        time_to: '12:30'
      }
    ],
    location: 'Экспериментаниум (Ленинградский проспект, дом 80, корпус 11)',
    description: 'Интерактивное научное шоу с экспериментами',
    rules: 'Дети до 12 лет только в сопровождении взрослых',
    cost: 1200,
    organizer: 'Дмитрий Новиков'
  },
  {
    id: 3,
    name: 'Мастер-класс по керамике',
    is_active_in_bot: true,
    time_slots: [
      {
        date: '2024-03-18',
        time_from: '16:00',
        time_to: '18:00'
      },
      {
        date: '2024-03-19',
        time_from: '12:00',
        time_to: '14:00'
      }
    ],
    location: 'Пушкинский музей (улица Волхонка, дом 12)',
    description: 'Создание керамических изделий своими руками',
    rules: 'Необходима предварительная запись, количество мест ограничено',
    cost: 1500,
    organizer: 'Ольга Морозова'
  }
]

export const mockProjects: Pick<IProject, 'id' | 'title'>[] = [
  { id: 0, title: 'Название спецпроекта' },
  { id: 1, title: 'Название спецпроекта' },
  { id: 2, title: 'Название спецпроекта' },
  { id: 3, title: 'Название спецпроекта' }
]
