import styled from 'styled-components'
import { IconButton, Tabs, Typography } from '@mui/material'

export const HeaderContainer = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #fcfcfd;
  border-bottom: 1px solid #e6e8ec;
  gap: 15px;

  @media (max-width: 650px) {
    justify-content: space-between;
  }
`

export const LogoTypography = styled(Typography)`
  &.MuiTypography-root {
    font-size: 18px;
    font-weight: 450;
  }

  @media (max-width: 650px) {
    font-size: 14px;
  }
`

export const HeaderTabs = styled(Tabs)`
  flex: 1;

  @media (max-width: 650px) {
    display: none !important;
  }
`

export const IconButtonLogout = styled(IconButton)`
  @media (max-width: 650px) {
    display: none !important;
  }
`
