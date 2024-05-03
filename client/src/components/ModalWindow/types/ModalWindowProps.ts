import { ReactNode } from 'react'

export type ModalWindowProps = {
  className?: string
  children?: ReactNode
  isOpen: boolean
  title?: string
  maxWidth?: false
  onClose: () => void
}
