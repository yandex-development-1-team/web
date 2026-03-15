export type RecoveryModalProps = {
  isOpen: boolean
  onClose: () => void
  validateLogin: (value: string) => string
}
