import styled from 'styled-components'
import { ListItem, ListItemText } from '@mui/material'

type ListItemProps = {
  status: string
}

export const ListItemData = styled(ListItem)`
  &.MuiListItem-root {
    display: flex;
    flex-direction: row;
    border-radius: 10px;
    padding: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    justify-content: space-between;
    align-items: center;
    background-color: #f8f8fd;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 30%);
  }
`

export const ListItemStatus = styled(ListItemText)<ListItemProps>`
  padding: 7px 10px;
  border-radius: 50px;
  border: 1px solid;
  display: inline-block;
  border-color: ${({ status }) =>
    status === 'Принят'
      ? '#66bb6a'
      : status === 'Отклонен'
        ? '#f44336'
        : '#4640DE'};

  color: ${({ status }) =>
    status === 'Принят'
      ? '#66bb6a'
      : status === 'Отклонен'
        ? '#f44336'
        : '#4640DE'};

  > span {
    &.MuiTypography-root {
      font-size: 14px;
      font-weight: 600;
    }
  }
`
