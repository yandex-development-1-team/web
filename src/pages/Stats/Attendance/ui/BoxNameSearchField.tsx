import { SearchIcon } from '@/assets/icons'
import { Input } from '@/components/ui'
import type { BoxNameAutocompleteState } from '@/pages/Stats/ApplicationsStats/hooks/useBoxNameAutocomplete'

type BoxNameSearchFieldProps = {
  autocomplete: BoxNameAutocompleteState
  disabled?: boolean
} & React.ComponentProps<'div'>

export function BoxNameSearchField({ autocomplete, disabled, ...props }: BoxNameSearchFieldProps) {
  const { query, suggestions, listOpen, setListOpen, invalid, hint, onQueryChange, pickName, onBlur } = autocomplete

  return (
    <div className="flex flex-col relative" {...props}>
      <span className="text-xxs text-text-grey-medium">Название</span>
      <Input
        variant="icon"
        icon={<SearchIcon className="size-4" />}
        onChange={e => onQueryChange(e.target.value)}
        value={query}
        onFocus={() => setListOpen(true)}
        className="h-11 py-3.5 w-full pl-1 rounded-lg"
        placeholder=""
        invalid={invalid}
        onBlur={onBlur}
        disabled={disabled}
      />
      {hint && <div className="text-red-500 text-xs mt-1">{hint}</div>}
      {listOpen && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-grey-light rounded-lg shadow-lg max-h-60 overflow-auto">
          {suggestions.map(name => (
            <div
              key={name}
              className="px-4 py-2 hover:bg-grey-light cursor-pointer"
              onMouseDown={e => {
                e.preventDefault()
                pickName(name)
              }}
            >
              {name}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
