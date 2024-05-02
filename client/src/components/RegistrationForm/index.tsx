import { yupResolver } from '@hookform/resolvers/yup'
import { Link, TextField, Typography } from '@mui/material'
import { FormContainer } from './style'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useRegistrationMutation } from '../../__redux__/services/user'
import { setUser } from '../../__redux__/slice/userSlice'
import { LoadingButton } from '@mui/lab'
import { useForm } from 'react-hook-form'
import { RegistrationFormValues } from './types/RegistrationFormValues.ts'
import { registrationDefaultValues } from './schema/registrationDefaultValues.ts'
import { registrationValidationSchema } from './schema/registrationValidationSchema.ts'
import { SnackbarSimple } from '../Snackbar'
import { useState } from 'react'

export const RegistrationForm = () => {
  const navigate = useNavigate()

  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const dispatch = useDispatch()
  const [registration, { isLoading, isError: isRegError, error }] =
    useRegistrationMutation()

  const form = useForm<RegistrationFormValues>({
    defaultValues: registrationDefaultValues,
    mode: 'onChange',
    resolver: yupResolver(registrationValidationSchema),
  })

  const {
    register,
    clearErrors,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = form

  const onSubmit = (data: RegistrationFormValues) => {
    const { login, fio, phone, email, password } = data
    registration({ login, fio, phone, email, password }).then(
      (response: any) => {
        if (response.data) {
          dispatch(setUser(response.data))
          navigate('/applications')
        }
      }
    )
    setSnackbarOpen(true)
    reset()
    clearErrors()
  }

  return (
    <>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Typography sx={{ fontSize: '20px', fontWeight: '450' }}>
          Регистрация
        </Typography>
        <>
          <TextField
            {...register('login')}
            type="text"
            label="Логин"
            required
            error={!!errors.login}
            helperText={errors.login?.message || ' '}
          />
          <TextField
            {...register('fio')}
            type="text"
            label="ФИО"
            required
            error={!!errors.fio}
            helperText={errors.fio?.message || ' '}
          />
          <TextField
            {...register('phone')}
            type="tel"
            label="Номер телефона"
            required
            error={!!errors.phone}
            helperText={errors.phone?.message || ' '}
          />
          <TextField
            {...register('email')}
            type="email"
            label="Email"
            required
            error={!!errors.email}
            helperText={errors.email?.message || ' '}
          />
          <TextField
            {...register('password')}
            type="password"
            label="Пароль"
            required
            error={!!errors.password}
            helperText={errors.password?.message || ' '}
          />
        </>
        <LoadingButton
          loading={isLoading}
          disabled={!isValid}
          variant="contained"
          type="submit"
          sx={{ p: '8px 16px' }}
        >
          Зарегистрироваться
        </LoadingButton>
        <Typography>
          {'Уже есть аккаунт? '}
          <Link sx={{ cursor: 'pointer' }} onClick={() => navigate('/login')}>
            Войти
          </Link>
        </Typography>
      </FormContainer>
      {!isLoading && isRegError && (
        <SnackbarSimple
          message={
            error
              ? `Ошибка при попытке регистрации: ${error?.data?.message}`
              : 'Ошибка при попытке регистрации'
          }
          isOpen={snackbarOpen}
          onClose={() => setSnackbarOpen(false)}
        />
      )}
    </>
  )
}
