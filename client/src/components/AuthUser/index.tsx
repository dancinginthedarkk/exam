import { PageContainer } from './style'
import { useLocation } from 'react-router-dom'
import { RegistrationForm } from '../RegistrationForm'
import { AuthForm } from '../AuthForm'

const AuthUser = () => {
  const location = useLocation()
  const isRegistrationForm = location.pathname === '/registration'

  return (
    <PageContainer>
      {isRegistrationForm ? <RegistrationForm /> : <AuthForm />}
    </PageContainer>
  )
}

export default AuthUser
