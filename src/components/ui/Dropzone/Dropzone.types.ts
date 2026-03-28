import type { ReactNode } from 'react'
import type { Accept } from 'react-dropzone'

export type TDropzoneProps = {
  accept?: Accept
  className?: string
  children?: ReactNode
  onFileAccepted: (file: File) => void
}
