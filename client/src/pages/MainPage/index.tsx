import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { userSelector } from '../../__redux__/selectors/userSelectors.ts'
import { MainContainer } from './style.ts'
import { Header } from '../../components/Header'

export const MainPage = () => {
  const { isAuth } = useSelector(userSelector)

  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth && location.pathname === '/') {
      navigate('/applications')
    } else if (!isAuth) {
      navigate('/login')
    }
  }, [isAuth, location.pathname, navigate])

  return (
    <div>
      <Header />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </div>
  )
}
