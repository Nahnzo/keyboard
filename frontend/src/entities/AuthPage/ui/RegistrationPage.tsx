import { useState } from 'react'
import { CustomInput } from '../../../shared/ui'
import { registerUser } from '../../../shared/api/authService'
import { Link } from 'react-router-dom'
import CustomButton from '../../../shared/ui/CustomButton'
import styles from './authPage.module.css'

const RegistrationPage = () => {
  const [username, setUserName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleRegister = () => {
    registerUser({ email, username, password })
  }

  return (
    <div className={styles.inputsContainer}>
      <CustomInput placeholder="Username" width={400} height={30} padding={7} onChange={(e) => setUserName(e.target.value)} />
      <CustomInput placeholder="Email" width={400} height={30} padding={7} onChange={(e) => setEmail(e.target.value)} />
      <CustomInput placeholder="Password" width={400} height={30} padding={7} onChange={(e) => setPassword(e.target.value)} />
      <CustomButton width={100} height={35} handler={handleRegister} padding={5} margin={2}>
        Регистрация
      </CustomButton>
      <Link to="/login">Есть аккаунт?</Link>
    </div>
  )
}

export default RegistrationPage
