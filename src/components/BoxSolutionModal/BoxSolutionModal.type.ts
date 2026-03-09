export type ModalAction = 'create' | 'edit'

export type BoxSolutionModalType = {
  isOpen: boolean
  onClose: () => void
  action: ModalAction
}
