import { useSearchParams } from 'react-router-dom'

export const usePaginationLimit = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const changeLimit = (newLimit: number | undefined) => {
    if (!newLimit) return

    const newParams = new URLSearchParams(searchParams)

    newParams.set('limit', newLimit.toString())
    newParams.delete('offset')

    setSearchParams(newParams)
  }

  return { changeLimit }
}
