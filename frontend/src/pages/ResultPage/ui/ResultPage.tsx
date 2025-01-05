import { useSelector } from 'react-redux'
import { Accuracy } from '../../../features/Accuracy'
import { RootState, useAppDispatch } from '../../../app/store/store'
import { useEffect } from 'react'
import { refreshAllCounts } from '../../../entities/TextBlock/model/TextBlockSlice'
import { WPM } from '../../../features/WPM'
import { Link } from 'react-router-dom'
import styles from './resultPage.module.css'

const ResultPage = () => {
  const totalPassedChars = useSelector((state: RootState) => state.textBlock.countCountPassedWords)
  const counterErrors = useSelector((state: RootState) => state.textBlock.countErrors)
  const dispatch = useAppDispatch()
  useEffect(() => {
    return () => {
      dispatch(refreshAllCounts())
    }
  }, [dispatch])
  return (
    <div className={styles.resultContainer}>
      <h3>
        Для сохранения статистики <Link to="/login">войдите </Link> в аккаунт или <Link to="/registration">зарегистрируйтесь</Link>
      </h3>
      <Accuracy errors={counterErrors} totalPassedChars={totalPassedChars} />
      <WPM totalPassedChars={totalPassedChars} />
    </div>
  )
}

export default ResultPage
