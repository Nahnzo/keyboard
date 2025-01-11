import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from 'app/store/store'
import { useEffect } from 'react'
import { refreshAllCounts } from 'entities/TextBlock/model/TextBlockSlice'
import { Link } from 'react-router-dom'
import { User } from 'widgets/User'
import { ResultListCard } from 'widgets/ResultCard'
import styles from './resultPage.module.css'

const ResultPage = () => {
  const { isAuth, username } = useSelector((state: RootState) => state.userReducer)
  const dispatch = useAppDispatch()
  useEffect(() => {
    return () => {
      dispatch(refreshAllCounts())
    }
  }, [dispatch])
  return (
    <>
      <User />
      <div className={styles.resultContainer}>
        {!isAuth && (
          <h3>
            Для сохранения статистики <Link to="/login">войдите </Link> в аккаунт или <Link to="/registration">зарегистрируйтесь</Link>
          </h3>
        )}
        {isAuth && <p>{username}, ваш результат</p>}
        <ResultListCard />
      </div>
    </>
  )
}

export default ResultPage
