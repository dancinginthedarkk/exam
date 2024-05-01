import { SyntheticEvent } from 'react'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

export const SnackbarSimple = ({
  message,
  isOpen,
  onClose,
}: {
  message: string
  isOpen: boolean
  onClose: () => void
}) => {
  const handleClose = (_event: SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    onClose()
  }

  const action = (
    <>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton size="small" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  )

  return (
    <div>
      <Snackbar
        open={isOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={action}
        color="succeed"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </div>
  )
}
