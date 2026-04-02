import { BoxOperationIcon, DownloadIcon } from '@/assets/icons'
import { Button, ToggleButton } from '@/components/ui'
import { Dropdown } from '@/components/ui/Dropdown'
import type { TScheduleControl } from './ScheduleControl.type'

export const ScheduleControl = ({ options, onSelect, onToggle }: TScheduleControl) => {
  return (
    <div className="flex justify-between">
      <div>
        <ToggleButton leftLabel="Таблица" rightLabel="Календарь" onToggle={onToggle} />
      </div>
      <div className="flex gap-2.5">
        <Dropdown options={options} onSelect={onSelect} className="-left-4">
          <BoxOperationIcon className="size-8" />
        </Dropdown>
        <Button variant="secondary" className="size-11.5 border-grey-light">
          <DownloadIcon />
        </Button>
      </div>
    </div>
  )
}
