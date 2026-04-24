export const statusSelectOptions = {
  options: [
    {
      value: 'all',
      label: 'Все статусы'
    },
    {
      value: 'pending',
      label: 'В очереди'
    },
    {
      value: 'confirmed',
      label: 'В работе'
    },
    {
      value: 'cancelled',
      label: 'Завершено'
    }
  ],
  label: 'Статус',
  placeholder: 'Выберите статус',
  classNames: {
    trigger: 'grow bg-white min-w-58 w-full text-text',
    value: 'all',
    content: 'text-text',
    item: 'string'
  }
}
