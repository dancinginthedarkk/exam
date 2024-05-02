import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import {
  DrawerItemLink,
  DrawerList,
  DrawerListItem,
  DrawerLogout,
  DrawerWrapper,
  HeaderBurger,
  HeaderIconButton,
} from './style.ts'
import Drawer from '@mui/material/Drawer'
import { clearAuth } from '../../../__redux__/slice/userSlice.ts'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { headerTabsDataCreation } from '../helpers/headerTabsDataCreation.ts'

export const BurgerHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const tabs = headerTabsDataCreation()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleExit = () => {
    dispatch(clearAuth())
    navigate('/login')
  }

  const linkElements = tabs.map((tab) => (
    <DrawerListItem key={tab.id}>
      <DrawerItemLink to={tab.link} onClick={handleMenuToggle}>
        {tab.name}
      </DrawerItemLink>
    </DrawerListItem>
  ))

  return (
    <HeaderBurger>
      <HeaderIconButton
        size="large"
        edge="start"
        color="primary"
        onClick={handleMenuToggle}
      >
        <MenuIcon />
      </HeaderIconButton>
      <Drawer
        anchor="right"
        open={isMenuOpen}
        onClose={handleMenuToggle}
        PaperProps={{
          sx: {
            backgroundColor: '#4640de',
            width: '250px',
            borderRadius: '35px 0px 0px 35px',
          },
        }}
      >
        <DrawerWrapper>
          <DrawerList>{linkElements}</DrawerList>
          <DrawerLogout onClick={handleExit}>Выйти</DrawerLogout>
        </DrawerWrapper>
      </Drawer>
    </HeaderBurger>
  )
}
