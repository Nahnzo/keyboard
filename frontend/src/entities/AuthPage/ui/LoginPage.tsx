import { useEffect, useState } from 'react'
import { CustomInput } from '../../../shared/ui'
import { loginUserThunk } from '../../../shared/api/authService'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../../app/store/store'
import { useNavigate } from 'react-router-dom'
import styles from './authPage.module.css'

const LoginPage = () => {
  const [username, setUserName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { isAuth } = useSelector((state: RootState) => state.userReducer)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isAuth) {
      navigate('/')
    }
  }, [isAuth, navigate])

  return (
    <div className={styles.inputsContainer}>
      <CustomInput placeholder="Username" width={400} height={30} padding={7} onChange={(e) => setUserName(e.target.value)} />
      <CustomInput placeholder="Password" width={400} height={30} padding={7} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={() => dispatch(loginUserThunk({ username, password }))}>Войти</button>
    </div>
  )
}

export default LoginPage
