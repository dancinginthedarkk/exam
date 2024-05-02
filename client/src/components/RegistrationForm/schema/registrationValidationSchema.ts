import * as Yup from 'yup'
import { RegistrationFormValues } from '../types/RegistrationFormValues.ts'

export const registrationValidationSchema: Yup.ObjectSchema<RegistrationFormValues> =
  Yup.object().shape({
    login: Yup.string()
      .required('Логин не может быть пустым')
      .trim()
      .max(80, 'Логин должен быть не более 80 символов')
      .min(3, 'Логин должен быть не менее 3 символов'),
    fio: Yup.string()
      .required('ФИО не может быть пустым')
      .trim()
      .matches(
        /^[a-zA-Zа-яА-Я]+(?: [a-zA-Zа-яА-Я]+){1,3}$/,
        'ФИО должны быть разделены пробелом, и состоять только из букв'
      )
      .max(80, 'ФИО должно быть не более 80 символов')
      .min(3, 'ФИО должно быть не менее 3 символов'),
    phone: Yup.string()
      .matches(/^\d{11}$/, 'Номер телефона должен состоять из 11 цифр')
      .required('Номер телефона не может быть пустым'),
    email: Yup.string()
      .email('Введите корректный email')
      .required('Email не может быть пустым'),
    password: Yup.string()
      .required('Пароль не может быть пустым')
      .min(3, 'Пароль должен содержать не менее 3 символов')
      .max(20, 'Пароль должен содержать не более 20 символов'),
  })
