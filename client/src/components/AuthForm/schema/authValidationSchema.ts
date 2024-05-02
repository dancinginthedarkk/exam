import * as Yup from 'yup'
import { AuthFormValues } from '../types/AuthFormValues.ts'

export const authValidationSchema: Yup.ObjectSchema<AuthFormValues> =
  Yup.object().shape({
    login: Yup.string()
      .required('Логин не может быть пустым')
      .trim()
      .max(80, 'Логин должен быть не более 80 символов')
      .min(3, 'Логин должен быть не менее 3 символов'),
    password: Yup.string()
      .required('Пароль не может быть пустым')
      .min(3, 'Пароль должен содержать не менее 3 символов')
      .max(20, 'Пароль должен содержать не более 20 символов'),
  })
