import { DeleteIcon, DownloadIcon } from '@/assets/icons'
import { Button, LabelInDevelopment } from '@/components/ui'
import type { CSSProperties } from 'react'

type ActionProps = {
  onDelete: (id: string) => void
  onDownload: (id: string) => void
}

export const Actions =
  <T extends { id: number | string }>({ onDelete, onDownload }: ActionProps) =>
  (row: T) => {
    const style: CSSProperties = { height: 24, width: 24 }
    const id = String(row.id)
    return (
      <>
        <Button
          variant="ghost"
          onClick={e => {
            e.stopPropagation()
            onDelete(id)
          }}
        >
          <DeleteIcon style={style} />
        </Button>
        <Button
          className="relative"
          variant="ghost"
          onClick={e => {
            e.stopPropagation()
            onDownload(id)
          }}
        >
          <DownloadIcon style={style} />
          <LabelInDevelopment className="-right-[20px] text-[10px]! -rotate-40" />
        </Button>
      </>
    )
  }
