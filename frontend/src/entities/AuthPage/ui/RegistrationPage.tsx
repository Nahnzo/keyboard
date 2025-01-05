import { useState } from 'react'
import { CustomInput } from '../../../shared/ui'
import { registerUser } from '../../../shared/api/authService'
import styles from './authPage.module.css'

const RegistrationPage = () => {
  const [username, setUserName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  return (
    <div className={styles.inputsContainer}>
      <CustomInput placeholder="Username" width={400} height={30} padding={7} onChange={(e) => setUserName(e.target.value)} />
      <CustomInput placeholder="Email" width={400} height={30} padding={7} onChange={(e) => setEmail(e.target.value)} />
      <CustomInput placeholder="Password" width={400} height={30} padding={7} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={() => registerUser({ email, username, password })}>Регистрация</button>
    </div>
  )
}

export default RegistrationPage
