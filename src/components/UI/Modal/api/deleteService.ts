import axios from 'axios'

// Имитация функции уведомления
const notification = ({ status, message }: { status: 'success' | 'error'; message: string }) => {
  alert(`${status === 'success' ? 'OK' : 'Error'} ${message}`)
}

/**
 * Функция удаления элемента по ID.
 * Использует axios для запроса и обрабатывает уведомления.
 */
export async function deleteItemById(id: string | number) {
  // В реальности здесь будет базовый URL
  const PATH = '/api/items'

  try {
    const response = await axios.delete(`${PATH}/${id}`)

    notification({
      status: 'success',
      message: 'Успешно удалено'
    })

    return response.data
  } catch (error) {
    notification({
      status: 'error',
      message: 'Не удалось удалить'
    })

    throw error
  }
}
