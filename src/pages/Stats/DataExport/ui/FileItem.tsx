import { cn } from '@/lib/utils.clsx'
import { DeleteIcon, DownloadIcon, CloseIcon } from '@/assets/icons'
import { formatFileSize } from '@/lib/fileUtils/formatFileSize'
import type { IFileItem } from '../DataExport.types'
import { Button } from '@/components/ui'
import { useDownloadFile } from '../hooks/useDownloadFile'
import { ProgressBar } from '@/components/ui/ProgressBar'

export const FileItem = ({ file, onDelete, className, ...props }: IFileItem) => {
  const { id, name, size } = file
  const { start, cancel, progress, isDownloading } = useDownloadFile(id)

  const parsedSize = formatFileSize(size)

  return (
    <li
      className={cn(
        'relative',
        'flex flex-col gap-3',
        'p-3 w-full min-h-20.5',
        'border-b-2 border-grey-extra-light',
        `${className}`
      )}
      {...props}
    >
      <div className="flex flex-row gap-3 items-center justify-between">
        <Button
          variant={'ghost'}
          className={`
            w-10.5 h-10.5 border focus:ring-offset-2 focus:border-yellow-accent-dark
            active:bg-yellow-light active:border-yellow-light transition-[border-color,bg-color,shadow] duration-300
          `}
          onClick={start}
        >
          <DownloadIcon color="var(--color-black)" />
        </Button>
        <div className="self-start w-76.5">
          <span className="block">{name}</span>
          <span className="block">{parsedSize}</span>
        </div>
        {isDownloading ? (
          <Button variant={'ghost'} className="w-8 h-8" onClick={cancel}>
            <CloseIcon />
          </Button>
        ) : (
          <Button
            variant={'ghost'}
            className={`
              w-8 h-8 hover:ring-1 hover:ring-yellow-light focus:ring-1 focus:ring-yellow-accent-dark
              active:bg-yellow-light transition-[bg-color,shadow] duration-300
            `}
            onClick={() => onDelete?.(id)}
          >
            <DeleteIcon color="var(--color-black)" />
          </Button>
        )}
      </div>
      {isDownloading && <ProgressBar progress={progress} />}
    </li>
  )
}
