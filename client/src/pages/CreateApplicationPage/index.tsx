import { useState } from 'react'
import { TextField, Typography, Box } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useCreateApplicationMutation } from '../../__redux__/services/application'
import { useSelector } from 'react-redux'
import { SnackbarSimple } from '../../components/Snackbar'
import { PageContainer, Container } from './style.ts'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { CreateApplicationFormValues } from './types/CreateApplicationFormValues.ts'
import { createApplicationDefaultValues } from './schema/createApplicationDefaultValues.ts'
import { createApplicationValidationSchema } from './schema/createApplicationValidationSchema.ts'
import { userSelector } from '../../__redux__/selectors/userSelectors.ts'

export const CreateApplicationPage = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const [createApplication, { isLoading, error }] =
    useCreateApplicationMutation()
  const user = useSelector(userSelector)

  const form = useForm<CreateApplicationFormValues>({
    defaultValues: createApplicationDefaultValues,
    mode: 'onChange',
    resolver: yupResolver(createApplicationValidationSchema),
  })

  const {
    register,
    clearErrors,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = form

  const onSubmit = (data: CreateApplicationFormValues) => {
    const { car, description } = data
    createApplication({
      carNumber: car,
      description: description,
      userId: user.id,
    }).then(() => {
      reset()
      clearErrors()
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
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          autoComplete="off"
        >
          <TextField
            {...register('car')}
            fullWidth
            label="Гос. регистрационный номер"
            variant="outlined"
            sx={{ mb: 1 }}
            required
            error={!!errors.car}
            helperText={errors.car?.message || ' '}
          />
          <TextField
            {...register('description')}
            fullWidth
            label="Описание нарушения"
            variant="outlined"
            multiline
            rows={4}
            required
            sx={{ mb: 1 }}
            inputProps={{ maxLength: 250 }}
            error={!!errors.description}
            helperText={errors.description?.message || ' '}
          />
          <LoadingButton
            loading={isLoading}
            disabled={!isValid}
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
