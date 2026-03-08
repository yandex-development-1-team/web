import { AddIcon, BoxIcon } from '@/assets/icons'
import { Button } from '@/components/ui'
import { Loader } from '@/components/ui/Loader'
import { useBoxSolutions } from './hooks/useBoxSolutions'
import { Box } from './ui/Box'

const BoxSolutions = () => {
  const { boxes, isError, isPending } = useBoxSolutions()

  if (isError) return <div className="text-text">Ошибка при получении данных</div>
  if (!boxes?.length && !isPending) return <div className="text-text">Нет сохраненных коробок</div>

  return (
    <div className="max-w-382">
      <div className="flex justify-between h-18 mb-5">
        <h1 className="text-h2 text-text">Коробочные решения</h1>
        <Button variant={'default'} className="text-text p-5 w-85 ">
          <BoxIcon style={{ width: 'auto', height: '100%' }} />
          <p className="mr-auto">Создать коробку</p>
          <AddIcon style={{ width: 'auto', height: '100%' }} className="border border-white bg-white rounded-lg" />
        </Button>
      </div>
      {isPending ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,344px)] gap-5">
          {boxes?.map(box => {
            return <Box box={box} key={box.id} />
          })}
        </div>
      )}
    </div>
  )
}

export const Component = BoxSolutions
