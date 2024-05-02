import { yupResolver } from '@hookform/resolvers/yup'
import { Link, TextField, Typography } from '@mui/material'
import { FormContainer } from './style'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useLoginMutation } from '../../__redux__/services/user'
import { setUser } from '../../__redux__/slice/userSlice'
import { LoadingButton } from '@mui/lab'
import { useForm } from 'react-hook-form'
import { AuthFormValues } from './types/AuthFormValues.ts'
import { authDefaultValues } from './schema/authDefaultValues.ts'
import { authValidationSchema } from './schema/authValidationSchema.ts'
import { useState } from 'react'
import { SnackbarSimple } from '../Snackbar'

export const AuthForm = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const [authorization, { isLoading, isError, error }] = useLoginMutation()

  const form = useForm<AuthFormValues>({
    defaultValues: authDefaultValues,
    mode: 'onChange',
    resolver: yupResolver(authValidationSchema),
  })

  const {
    register,
    clearErrors,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = form

  const onSubmit = (data: AuthFormValues) => {
    const { login, password } = data
    authorization({ login, password }).then((response: any) => {
      if (response.data) {
        dispatch(setUser(response.data))
        navigate('/applications')
      }
    })
    setSnackbarOpen(true)
    reset()
    clearErrors()
  }

  return (
    <>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <Typography sx={{ fontSize: '20px', fontWeight: '450' }}>
          Вход
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
          Войти
        </LoadingButton>
        <Typography>
          {'Нет аккаунта? '}
          <Link
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate('/registration')}
          >
            Зарегистрироваться
          </Link>
        </Typography>
      </FormContainer>
      {!isLoading && isError && (
        <SnackbarSimple
          message={
            error
              ? `Ошибка при попытке входа: ${error?.data?.message}`
              : 'Ошибка при попытке входа'
          }
          isOpen={snackbarOpen}
          onClose={() => setSnackbarOpen(false)}
        />
      )}
    </>
  )
}
