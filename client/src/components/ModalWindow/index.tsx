import CloseIcon from '@mui/icons-material/Close'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import { ModalWindowProps } from './types/ModalWindowProps.ts'
import { CloseIconButton } from './style.ts'

export const ModalWindow = (props: ModalWindowProps) => {
  const { children, isOpen, onClose, maxWidth, title } = props

  return (
    <Dialog
      open={isOpen}
      onClose={() => onClose()}
      fullWidth
      maxWidth={maxWidth}
    >
      <>
        <DialogTitle>{title}</DialogTitle>
        <CloseIconButton onClick={() => onClose()}>
          <CloseIcon />
        </CloseIconButton>
        <DialogContent>{children}</DialogContent>
      </>
    </Dialog>
  )
}
