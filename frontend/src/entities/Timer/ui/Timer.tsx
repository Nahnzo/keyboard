import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from 'app/store/store'
import { useTimer } from 'shared/hooks/hooks'
import { handleExpiredTimer, handleTimer } from '../model/timerSlice'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveUserResults } from 'shared/api/resultsCardService'
import { calculateAccuracy, calculateMinutes } from 'shared/utils/utils'
import styles from './timer.module.css'

const timeVariation = ['15', '30', '45', '60']

const Timer = () => {
  const [timeForTimer, setTimeForTimer] = useState<string>('15')
  const totalPassedChars = useSelector((state: RootState) => state.textBlock.countCountPassedWords)
  const counterErrors = useSelector((state: RootState) => state.textBlock.countErrors)
  const { isActive } = useSelector((state: RootState) => state.timer)
  const { seconds, hasExpired } = useTimer(timeForTimer, isActive)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const accuracy = calculateAccuracy(counterErrors, totalPassedChars)
  const wpm = calculateMinutes(totalPassedChars).wpm
  const cpm = calculateMinutes(totalPassedChars).cpm
  useEffect(() => {
    if (hasExpired) {
      dispatch(handleExpiredTimer(true))
      dispatch(handleTimer(false))
      saveUserResults({ seconds: timeForTimer, accuracy, wpm, cpm, created_At: new Date() })
      navigate('/results')
    }
  }, [hasExpired, dispatch, navigate, timeForTimer, accuracy, wpm, cpm])

  return (
    <div className={styles.timerContainer}>
      {timeVariation.map((seconds) => (
        <button
          key={seconds}
          onClick={() => setTimeForTimer(seconds)}
          className={timeForTimer === seconds ? styles.currentTime : styles.timeBtn}
        >
          {seconds}
        </button>
      ))}
      <div className={styles.secondsContainer}>{seconds} sec.</div>
    </div>
  )
}

export default Timer
