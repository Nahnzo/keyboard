import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutUserThunk } from 'shared/api/authService'
import { CustomButton } from 'shared/ui'
import { isAuthUserSelector, usernameSelector } from '../model/selectors'
import { useAppDispatch } from 'shared/types/types'
import styles from './user.module.css'

const User = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isAuthUser = useSelector(isAuthUserSelector)
  const username = useSelector(usernameSelector)
  const handleAuthUser = () => {
    if (isAuthUser) {
      dispatch(logoutUserThunk())
    } else {
      navigate('/login')
    }
  }
  return (
    <div className={styles.container}>
      <p>{username}</p>
      <CustomButton width={60} height={25} handler={handleAuthUser} margin={10}>
        {isAuthUser ? 'Выйти' : 'Войти'}
      </CustomButton>
      <div className={styles.userAvatar} onClick={() => navigate('/results')}></div>
    </div>
  )
}

export default User
