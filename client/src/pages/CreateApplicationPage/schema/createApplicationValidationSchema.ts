import * as Yup from 'yup'
import { CreateApplicationFormValues } from '../types/CreateApplicationFormValues.ts'

export const createApplicationValidationSchema: Yup.ObjectSchema<CreateApplicationFormValues> =
  Yup.object().shape({
    car: Yup.string()
      .required('Гос.номер не может быть пустым')
      .trim()
      .matches(
        /^[a-zA-Z0-9]+$/,
        'Гос.номер должен состоять только из цифр и букв'
      )
      .max(9, 'Значение не должно превышать 9 символов')
      .min(3, 'Значение должно быть не менее 3 символов'),
    description: Yup.string()
      .required('Описание не может быть пустым')
      .trim()
      .max(250, 'Превышено максимальное количество символов'),
  })
