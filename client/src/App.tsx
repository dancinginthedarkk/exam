import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ErrorPage } from './pages/ErrorPage'
import { MyApplicationsPage } from './pages/MyApplicationsPage'
import { CreateApplicationPage } from './pages/CreateApplicationPage'
import AuthUser from './components/AuthUser'
import { useDispatch, useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode'
import { setIsAuth, setUser } from './__redux__/slice/userSlice'
import { useCheckUserQuery } from './__redux__/services/user'
import { LoadingSpinnerPage } from './pages/LoadingSpinnerPage'
import ApplicationDetails from './pages/ApplicationDetail'
import { MainPage } from './pages/MainPage'
import { userSelector } from './__redux__/selectors/userSelectors.ts'

function App() {
  const dispatch = useDispatch()
  const { data, isLoading } = useCheckUserQuery({})

  const { isAuth } = useSelector(userSelector)

  console.log(isAuth)

  if (isLoading) {
    return <LoadingSpinnerPage />
  }
  if (!isLoading && data) {
    const decodeUser = jwtDecode(data.token)
    console.log(decodeUser)
    dispatch(setUser(decodeUser))
    dispatch(setIsAuth(true))
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<AuthUser />} />
          <Route path="/registration" element={<AuthUser />} />
          <Route
            path="/"
            element={<MainPage />}
            errorElement={<ErrorPage />}
            children={[
              <Route
                key="my-applications"
                path="/applications"
                element={<MyApplicationsPage />}
              />,
              <Route
                key="create-application"
                path="/applications/create"
                element={<CreateApplicationPage />}
              />,
              <Route
                key="application-details"
                path="/application/:id"
                element={<ApplicationDetails />}
              />,
            ]}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
