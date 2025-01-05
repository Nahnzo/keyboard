import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../../app/store/store'
import styles from './user.module.css'
import { logoutUserThunk } from '../../../shared/api/authService'

const User = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { isAuth, username } = useSelector((state: RootState) => state.userReducer)
  const handleAuthUser = () => {
    if (isAuth) {
      dispatch(logoutUserThunk())
    } else {
      navigate('/login')
    }
  }
  return (
    <div className={styles.container}>
      <p>{username}</p>
      <button onClick={handleAuthUser}>{isAuth ? 'Выйти' : 'Войти'}</button>
      <div className={styles.userAvatar}></div>
    </div>
  )
}

export default User
