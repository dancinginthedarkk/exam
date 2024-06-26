import {
  HeaderContainer,
  HeaderTabs,
  IconButtonLogout,
  LogoTypography,
} from './header.ts'
import { Button, Tab } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import { SyntheticEvent, useEffect, useState } from 'react'
import { headerTabsDataCreation } from './helpers/headerTabsDataCreation.ts'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearAuth } from '../../__redux__/slice/userSlice.ts'
import { BurgerHeader } from './BurgerHeader'

export const Header = () => {
  const [navTabValue, setNavTabValue] = useState('myApplications')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const tabs = headerTabsDataCreation()

  const tabChangeHandler = (_event: SyntheticEvent, newValue: string) => {
    setNavTabValue(newValue)
  }

  const handleExit = () => {
    dispatch(clearAuth())
    navigate('/login')
  }

  useEffect(() => {
    const activeTab = tabs.find((tab) => `/${tab.link}` === location.pathname)
    if (activeTab) {
      setNavTabValue(activeTab.value)
    }
  }, [location.pathname, tabs])

  return (
    <HeaderContainer>
      <LogoTypography>Название продукта |</LogoTypography>
      <HeaderTabs
        value={navTabValue}
        onChange={tabChangeHandler}
        color="primary"
        sx={{
          '& .MuiTabs-indicator': { display: 'none' },
        }}
      >
        {tabs.map((tab) => (
          <Tab
            value={tab.value}
            key={tab.id}
            label={tab.name}
            component={tab.link ? Link : Button}
            to={tab.link ? tab.link : undefined}
            sx={{
              textTransform: 'none',
              fontSize: '16px',
              color: 'black',
            }}
          />
        ))}
      </HeaderTabs>
      <IconButtonLogout onClick={handleExit}>
        <LogoutIcon color="primary" />
      </IconButtonLogout>
      <BurgerHeader />
    </HeaderContainer>
  )
}
