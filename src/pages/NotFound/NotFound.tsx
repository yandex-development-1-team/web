import { ErrorPageTemplate } from "@/components/layout/ErrorPageTemplate/ErrorPageTemplate"
import dino404Image from '@/assets/images/Dino404.jpg'

const NotFound = () => {
  return (
    <ErrorPageTemplate
      title={"Страница не найдена"}
      text={"Извините, такой страницы не существует"}
      image={dino404Image}
      code={"404"}
    />
  )
}

export const Component = NotFound
