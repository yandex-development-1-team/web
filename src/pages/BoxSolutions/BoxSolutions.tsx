import { AddIcon, BoxIcon } from '@/assets/icons'
import { Pagination } from '@/components/Pagination/Pagination'
import { Button } from '@/components/ui'
import { Loader } from '@/components/ui/Loader'
import { useSearchParams } from 'react-router-dom'
import { useBoxSolutions } from './hooks/useBoxSolutions'
import { Box } from './ui/Box'

const BoxSolutions = () => {
  const [searchParams] = useSearchParams()
  const currentPage = Number(searchParams.get('page')) || 1
  const { boxes, isError, isPending } = useBoxSolutions(currentPage)

  const totalPages = 12

  if (isError) return <div className="text-text">Ошибка при получении данных</div>
  if (!boxes?.length && !isPending) return <div className="text-text">Нет сохраненных коробок</div>

  return (
    <div className="max-w-268">
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
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-[repeat(auto-fill,344px)] gap-5">
            {boxes?.map(box => {
              return <Box box={box} key={box.id} />
            })}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} className="ml-auto" />
        </div>
      )}
    </div>
  )
}

export const Component = BoxSolutions
