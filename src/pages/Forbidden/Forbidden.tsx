import { ErrorPageTemplate } from '@/components/layout/ErrorPageTemplate/ErrorPageTemplate'
import dino403Image from '@/assets/images/Dino403.jpg'

const Forbidden = () => {
  return (
    <ErrorPageTemplate
      title={'Доступ запрещён'}
      text={'У вас нет прав для просмотра этой страницы'}
      image={dino403Image}
      code={'403'}
    />
  )
}

export const Component = Forbidden
