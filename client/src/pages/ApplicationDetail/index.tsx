import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  useGetAllQuery,
  useGetByUserQuery,
} from '../../__redux__/services/application.ts'
import { userSelector } from '../../__redux__/selectors/userSelectors.ts'
import { ContentContainer, PageContainer } from './style.ts'
import { Typography } from '@mui/material'

export const ApplicationDetails = () => {
  const { id } = useParams()
  const user = useSelector(userSelector)

  const { data: userData } = useGetByUserQuery(user.id)
  const { data: allData } = useGetAllQuery({})

  const data = user.role === 'USER' ? userData : allData

  let application
  if (data) {
    application = data.application.find((app) => app.id.toString() === id)
  }

  return (
    <PageContainer>
      {application ? (
        <ContentContainer>
          <Typography
            variant="h5"
            sx={{
              borderBottom: '2px solid #E6E8EC',
              paddingBottom: '10px',
              fontWeight: '500',
            }}
          >
            Детали заявления
          </Typography>
          <p>Номер автомобиля: {application.carNumber}</p>
          <p>Описание: {application.description}</p>
          <p>Статус: {application.status}</p>
        </ContentContainer>
      ) : (
        <p>Заявление не найдено.</p>
      )}
    </PageContainer>
  )
}
