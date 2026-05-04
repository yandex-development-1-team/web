import { DeleteIcon, DownloadIcon } from '@/assets/icons'
import { Button } from '@/components/ui'
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
          variant="ghost"
          onClick={e => {
            e.stopPropagation()
            onDownload(id)
          }}
        >
          <DownloadIcon style={style} />
        </Button>
      </>
    )
  }
