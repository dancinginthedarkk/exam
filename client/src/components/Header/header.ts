import styled from 'styled-components'
import { Typography } from '@mui/material'

export const HeaderContainer = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #fcfcfd;
  border-bottom: 1px solid #e6e8ec;
  gap: 15px;
`

export const LogoTypography = styled(Typography)`
  &.MuiTypography-root {
    font-size: 18px;
    font-weight: 450;
  }
`
