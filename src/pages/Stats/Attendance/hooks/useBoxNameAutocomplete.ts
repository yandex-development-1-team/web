import { useCallback, useMemo, useState } from 'react'

const UNKNOWN_BOX_MESSAGE = 'Коробка с таким названием не найдена. Введите другое название'

export function useBoxNameAutocomplete(boxNames: string[] | undefined) {
  const [query, setQuery] = useState('')
  const [pickedName, setPickedName] = useState<string | null>(null)
  const [listOpen, setListOpen] = useState(false)
  const [invalid, setInvalid] = useState(false)
  const [hint, setHint] = useState('')

  const suggestions = useMemo(() => {
    if (!boxNames?.length) return []
    if (!query) return boxNames
    const q = query.toLowerCase()
    return boxNames.filter(name => name.toLowerCase().includes(q))
  }, [query, boxNames])

  const matchesKnownName = useCallback(
    (value: string) => !!boxNames?.some(name => name.toLowerCase() === value.toLowerCase()),
    [boxNames]
  )

  const validate = useCallback(
    (value: string) => {
      if (!value) {
        setInvalid(false)
        setHint('')
        return true
      }

      const ok = matchesKnownName(value)
      setInvalid(!ok)
      setHint(!ok ? UNKNOWN_BOX_MESSAGE : '')
      return ok
    },
    [matchesKnownName]
  )

  const onQueryChange = useCallback(
    (value: string) => {
      setQuery(value)
      setListOpen(true)
      setPickedName(null)
      if (invalid) {
        validate(value)
      }
    },
    [invalid, validate]
  )

  const pickName = useCallback((name: string) => {
    setPickedName(name)
    setQuery(name)
    setListOpen(false)
    setInvalid(false)
    setHint('')
  }, [])

  const onBlur = useCallback(() => {
    setListOpen(false)
    validate(query)
  }, [validate, query])

  const reset = useCallback(() => {
    setQuery('')
    setPickedName(null)
    setListOpen(false)
    setInvalid(false)
    setHint('')
  }, [])

  return {
    query,
    pickedName,
    suggestions,
    listOpen,
    setListOpen,
    invalid,
    hint,
    onQueryChange,
    pickName,
    onBlur,
    validate,
    reset
  }
}

export type BoxNameAutocompleteState = ReturnType<typeof useBoxNameAutocomplete>
