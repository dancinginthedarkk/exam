import styled from 'styled-components'
import { Button, IconButton } from '@mui/material'
import { Link } from 'react-router-dom'

export const HeaderIconButton = styled(IconButton)`
  && {
    background-color: #4640de;
    color: #e5e3e4;
    max-height: 50px;

    &:hover {
      background-color: #25324b;
    }
  }
`

export const HeaderBurger = styled.div`
  position: relative;
  display: none;

  @media (max-width: 650px) {
    display: block;
  }
`

export const DrawerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 40px 30px 30px 0;
  height: 1000%;
  align-items: end;
`

export const DrawerList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

export const DrawerListItem = styled.li`
  font-size: 20px;
  list-style: none;
  text-align: end;
`

export const DrawerItemLink = styled(Link)`
  text-decoration: none;
  color: white;
`

export const DrawerLogout = styled(Button)`
  &.MuiButtonBase-root {
    text-decoration: none;
    color: white;
    font-size: 18px;
  }
`
