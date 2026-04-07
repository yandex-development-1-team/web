import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/app/router'
import { BoxButton } from '@/components/ui'
import { CardLink } from './ui'
import { CARDS } from './cards'

const Stats = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className="grid grid-cols-3 gap-[20px]">
        <BoxButton icon="box">Создать коробку</BoxButton>
        <BoxButton icon="special_projects">Создать спецпроект</BoxButton>
        <BoxButton icon="users" onClick={() => navigate(ROUTES.employeesCreate)}>
          Добавить пользователя
        </BoxButton>
        {CARDS.map(card => (
          <CardLink key={card.to} {...card} />
        ))}
      </div>
    </>
  )
}

export const Component = Stats
