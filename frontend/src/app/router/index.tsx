import { createBrowserRouter } from 'react-router-dom'
import { ResultPage } from '../../pages/ResultPage'
import { LoginPage, RegistrationPage } from '../../entities/AuthPage'
import App from '../../App'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/results',
    element: <ResultPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/registration',
    element: <RegistrationPage />,
  },
])
