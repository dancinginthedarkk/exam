import { IconButton, List, ListItemText, Typography } from '@mui/material'
import { useEffect, useState, MouseEvent } from 'react'
import {
  useGetAllQuery,
  useGetByUserQuery,
  useUpdateStatusApplicationMutation,
} from '../../__redux__/services/application.ts'
import { useSelector } from 'react-redux'
import DoneIcon from '@mui/icons-material/Done'
import ClearIcon from '@mui/icons-material/Clear'
import { useNavigate } from 'react-router-dom'
import { DataPagination } from '../../components/DataPagination'
import { userSelector } from '../../__redux__/selectors/userSelectors.ts'
import { ListItemData, ListItemStatus } from './style.ts'

export const MyApplicationsPage = () => {
  const itemsPerPage = 5
  const [page, setPage] = useState(1)
  const user = useSelector(userSelector)

  const { data: userData, refetch: userDataRefetch } = useGetByUserQuery(
    user.id
  )
  const { data: allData, refetch: allDataRefetch } = useGetAllQuery({})

  const data = user.role === 'USER' ? userData : allData

  const [updateStatusApplication] = useUpdateStatusApplicationMutation()

  const handleChange = (value: number) => {
    setPage(value)
  }

  const getDataSlice = () => {
    const startIndex = (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return data.application.slice(startIndex, endIndex)
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
  }

  const handleUpdateStatus = (
    id: string,
    isAccepted: boolean,
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation()
    updateStatusApplication({ id, isAccepted })
    allDataRefetch()
  }

  const navigate = useNavigate()

  useEffect(() => {
    if (user.role === 'USER' && userDataRefetch) {
      userDataRefetch()
    } else if (allDataRefetch) {
      allDataRefetch()
    }
  }, [user.role, userDataRefetch, allDataRefetch])

  return (
    <>
      <Typography sx={{ fontSize: '20px', fontWeight: '450' }}>
        Мои заявления
      </Typography>
      <div>
        {!data?.application.length && (
          <Typography>Актуальные заявления отсутствуют</Typography>
        )}
        {data && data?.application.length > 0 && (
          <List sx={{ height: '100%', minHeight: '680px', p: 0 }}>
            {getDataSlice().map((application: any) => (
              <ListItemData
                key={application.id}
                onClick={() => navigate(`/application/${application.id}`)}
              >
                <div style={{ flex: '1' }}>
                  <ListItemText>
                    <strong>Номер автомобиля:</strong> {application.carNumber}
                  </ListItemText>
                  <ListItemText>
                    <strong>Описание:</strong>{' '}
                    {truncateText(application.description, 150)}
                  </ListItemText>
                  <ListItemStatus status={application.status}>
                    {application.status}
                  </ListItemStatus>
                </div>
                {application.status === 'В ожидании' &&
                  user.role !== 'USER' && (
                    <div>
                      <IconButton
                        onClick={(e) =>
                          handleUpdateStatus(application.carNumber, true, e)
                        }
                        size="medium"
                      >
                        <DoneIcon fontSize="medium" color="success" />
                      </IconButton>
                      <IconButton
                        onClick={(e) =>
                          handleUpdateStatus(application.carNumber, false, e)
                        }
                        size="medium"
                      >
                        <ClearIcon fontSize="medium" color="error" />
                      </IconButton>
                    </div>
                  )}
              </ListItemData>
            ))}
          </List>
        )}
        {data && data.application.length > 0 && (
          <DataPagination
            pageCount={Math.ceil(data.application.length / itemsPerPage)}
            currentPage={page}
            onPageChange={handleChange}
          />
        )}
      </div>
    </>
  )
}
