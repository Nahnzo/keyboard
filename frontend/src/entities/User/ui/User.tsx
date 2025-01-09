import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from 'app/store/store'
import { logoutUserThunk } from 'shared/api/authService'
import CustomButton from 'shared/ui/CustomButton'
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
      <div className={styles.userAvatar}></div>
    </div>
  )
}

export default User
