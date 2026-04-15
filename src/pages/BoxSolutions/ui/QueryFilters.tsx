import { SearchIcon } from '@/assets/icons'
import { Input, Select } from '@/components/ui'
import { parseQueryParams } from '@/components/ui/Pagination'
import { cn } from '@/lib/utils.clsx'
import { useCallback, useEffect, useRef, type ChangeEvent, type ComponentProps } from 'react'
import { useSearchParams } from 'react-router-dom'
import type z from 'zod'
import type { ZodObject, ZodRawShape } from 'zod'
import { boxSolutionsParamsSchema, type BoxSolutionsSearchParamsType } from '../BoxSolutions.types'

const statusOptions = {
  options: [
    {
      value: 'all',
      label: 'Все статусы'
    },
    {
      value: 'active',
      label: 'Активен в боте'
    },
    {
      value: 'inactive',
      label: 'Не активен в боте'
    }
  ],
  label: 'Статус',
  placeholder: 'Выберите статус',
  classNames: {
    trigger: 'bg-white min-w-58 w-full text-text',
    value: 'all',
    content: 'text-text',
    item: 'string'
  }
}

const locationOptions = {
  options: [
    {
      value: 'all',
      label: 'Все локации'
    },
    {
      value: 'location_1',
      label: 'Локация 1'
    },
    {
      value: 'location_2',
      label: 'Локация 2'
    },
    {
      value: 'location_3',
      label: 'Локация 3'
    }
  ],
  label: 'Место проведения',
  placeholder: 'Выберите локацию',
  classNames: {
    trigger: 'bg-white min-w-58 w-full text-text',
    value: 'all',
    content: 'text-text',
    item: ''
  }
}

const organizerOptions = {
  options: [
    {
      value: 'all',
      label: 'Все организаторы'
    },
    {
      value: 'organizer_1',
      label: 'Организатор 1'
    },
    {
      value: 'organizer_2',
      label: 'Организатор 2'
    },
    {
      value: 'organizer_3',
      label: 'Организатор 3'
    },
    {
      value: 'organizer_4',
      label: 'Организатор 4'
    }
  ],
  label: 'Организатор',
  placeholder: 'Выберите организатора',
  classNames: {
    trigger: 'bg-white min-w-58 w-full text-text',
    value: 'all',
    content: 'text-text',
    item: ''
  }
}
type ToolbarPropsType = ComponentProps<'div'>

const useUrlFilters = <S extends ZodObject<ZodRawShape>>(schema: S) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const params = parseQueryParams<S>(searchParams, schema) as z.infer<S>

  const updateParams = useCallback(
    (newParams: Partial<z.infer<S>>) => {
      setSearchParams(prev => ({
        ...Object.fromEntries(prev.entries()),
        ...newParams,
        offset: 0
      }))
    },
    [setSearchParams]
  )

  const delayUpdateParams = useCallback(
    (newParams: Partial<z.infer<S>>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        updateParams(newParams)
      }, 500)
    },
    [updateParams]
  )

  return { params, updateParams, delayUpdateParams } as const
}

export const QueryFilters = ({ className, ...props }: ToolbarPropsType) => {
  const { params, updateParams, delayUpdateParams } = useUrlFilters(boxSolutionsParamsSchema)

  const handleSelectChange = (key: keyof BoxSolutionsSearchParamsType) => {
    return (value: string) => {
      updateParams({ [key]: value })
    }
  }

  const handleInputChange = (key: keyof BoxSolutionsSearchParamsType) => {
    return (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
      const value = e.currentTarget.value
      delayUpdateParams({ [key]: value })
    }
  }

  return (
    <div className={cn('flex gap-5', className)} {...props}>
      <div className="flex flex-col">
        <span className=" text-xxs text-grey-light">Название коробки</span>
        <Input
          placeholder=""
          variant="icon"
          icon={<SearchIcon />}
          iconPosition="inline-start"
          onClick={() => {}}
          onChange={handleInputChange('search')}
          className="grow min-w-86 w-full bg-white text-text"
        />
      </div>
      <div>
        <span className="text-xxs text-grey-light">{statusOptions.label}</span>
        <Select
          options={statusOptions.options}
          placeholder={statusOptions.placeholder}
          classNames={statusOptions.classNames}
          defaultValue={params.status ?? statusOptions.options[0].value}
          onValueChange={handleSelectChange('status')}
        />
      </div>
      <div>
        <span className="text-xxs text-grey-light">{locationOptions.label}</span>
        <Select
          options={locationOptions.options}
          placeholder={locationOptions.placeholder}
          classNames={locationOptions.classNames}
          defaultValue={params.location ?? locationOptions.options[0].value}
          onValueChange={handleSelectChange('location')}
        />
      </div>
      <div>
        <span className="text-xxs text-grey-light">{organizerOptions.label}</span>
        <Select
          options={organizerOptions.options}
          placeholder={organizerOptions.placeholder}
          classNames={organizerOptions.classNames}
          defaultValue={params.organizer ?? organizerOptions.options[0].value}
          onValueChange={handleSelectChange('organizer')}
        />
      </div>
    </div>
  )
}
