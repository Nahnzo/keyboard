import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { refreshAllCounts } from 'entities/TextBlock/model/TextBlockSlice'
import { Link } from 'react-router-dom'
import { User } from 'widgets/User'
import { ResultListCard } from 'widgets/ResultCard'
import { checkSessionThunk } from 'shared/api/authService'
import { useAppDispatch } from 'shared/types/types'
import { isAuthUserSelector } from '../model/selectors'
import styles from './resultPage.module.css'

const ResultPage = () => {
  const isAuthUser = useSelector(isAuthUserSelector)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(checkSessionThunk())
    return () => {
      dispatch(refreshAllCounts())
    }
  }, [dispatch])
  return (
    <>
      <User />
      <div className={styles.resultContainer}>
        {!isAuthUser && (
          <h3>
            Для сохранения статистики <Link to="/login">войдите </Link> в аккаунт или <Link to="/registration">зарегистрируйтесь</Link>
          </h3>
        )}
        <ResultListCard />
      </div>
    </>
  )
}

export default ResultPage
