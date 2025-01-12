import { useEffect, useState } from 'react'
import { CustomInput } from 'shared/ui'
import { loginUserThunk } from 'shared/api/authService'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch } from 'shared/types/types'
import { errorMessageSelector, isAuthUserSelector } from '../model/selectors'
import CustomButton from 'shared/ui/CustomButton'
import styles from './authPage.module.css'

const LoginPage = () => {
  const [username, setUserName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const isAuthUser = useSelector(isAuthUserSelector)
  const errorMessage = useSelector(errorMessageSelector)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleLogin = () => {
    dispatch(loginUserThunk({ username, password }))
  }

  useEffect(() => {
    if (isAuthUser) {
      navigate('/')
    }
  }, [isAuthUser, navigate])

  return (
    <div className={styles.inputsContainer}>
      <CustomInput placeholder="Username" width={400} height={30} padding={7} onChange={(e) => setUserName(e.target.value)} />
      <CustomInput placeholder="Password" width={400} height={30} padding={7} onChange={(e) => setPassword(e.target.value)} />
      <div className={styles.handlerContainer}>
        <CustomButton width={100} height={35} handler={handleLogin} padding={5} margin={2}>
          Войти
        </CustomButton>
      </div>
      <Link to="/registration">Нет аккаунта?</Link>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  )
}

export default LoginPage
