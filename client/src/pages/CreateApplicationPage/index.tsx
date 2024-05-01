import { useState } from 'react'
import { TextField, Typography, Box } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useCreateApplicationMutation } from '../../__redux__/services/application'
import { useSelector } from 'react-redux'
import { SnackbarSimple } from '../../components/Snackbar'
import { PageContainer, Container } from './style.ts'

export const CreateApplicationPage = () => {
  const [carRegistration, setCarRegistration] = useState('')
  const [violationDescription, setViolationDescription] = useState('')
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const [createApplication, { isLoading, error }] =
    useCreateApplicationMutation()
  const user = useSelector((state) => state.userSlice)

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    createApplication({
      carNumber: carRegistration,
      description: violationDescription,
      userId: user.id,
    }).then(() => {
      setCarRegistration('')
      setViolationDescription('')
      setSnackbarOpen(true)
    })
  }

  return (
    <PageContainer>
      <Container>
        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
          Формирование заявления о нарушении
        </Typography>
        <Box
          component="form"
          sx={{ mt: 1 }}
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
        >
          <TextField
            fullWidth
            label="Гос. регистрационный номер"
            variant="outlined"
            value={carRegistration}
            onChange={(e) => setCarRegistration(e.target.value)}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Описание нарушения"
            variant="outlined"
            value={violationDescription}
            onChange={(e) => setViolationDescription(e.target.value)}
            multiline
            rows={4}
            required
            sx={{ mb: 2 }}
            inputProps={{ maxLength: 250 }}
          />
          <LoadingButton
            loading={isLoading}
            disabled={!(carRegistration && violationDescription)}
            type="submit"
            variant="contained"
            color="primary"
          >
            Отправить заявление
          </LoadingButton>
        </Box>
      </Container>
      <SnackbarSimple
        message={
          error ? 'Ошибка при отправке заявки' : 'Заявка успешно отправлена'
        }
        isOpen={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
      />
    </PageContainer>
  )
}
