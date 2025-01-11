import { useAppDispatch, RootState } from 'app/store/store'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutUserThunk } from 'shared/api/authService'
import { CustomButton } from 'shared/ui'
import styles from './user.module.css'

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
      <CustomButton width={60} height={25} handler={handleAuthUser} margin={10}>
        {isAuth ? 'Выйти' : 'Войти'}
      </CustomButton>
      <div className={styles.userAvatar} onClick={() => navigate('/results')}></div>
    </div>
  )
}

export default User
