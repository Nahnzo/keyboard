import { useSelector } from 'react-redux'
import { useTimer } from 'shared/hooks/useTimerHook'
import { handleExpiredTimer, handleTimer } from '../model/timerSlice'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveUserResults } from 'shared/api/resultsCardService'
import { calculateAccuracy, calculateMinutes } from 'shared/utils/utils'
import { useAppDispatch } from 'shared/types/types'
import { counterErrorsSelector, isActiveTimerSelector, totalPassedCharsSelector } from '../model/selectors'
import styles from './timer.module.css'

const timeVariation = ['15', '30', '45', '60']

const Timer = () => {
  const [timeForTimer, setTimeForTimer] = useState<string>('15')
  const totalPassedChars = useSelector(totalPassedCharsSelector)
  const counterErrors = useSelector(counterErrorsSelector)
  const isActive = useSelector(isActiveTimerSelector)
  const { seconds, hasExpired } = useTimer(timeForTimer, isActive)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const accuracy = calculateAccuracy(counterErrors, totalPassedChars)
  const wpm = String(calculateMinutes(totalPassedChars).wpm)
  const cpm = String(calculateMinutes(totalPassedChars).cpm)
  useEffect(() => {
    if (hasExpired) {
      dispatch(handleExpiredTimer(true))
      dispatch(handleTimer(false))
      saveUserResults({ seconds: timeForTimer, accuracy, wpm, cpm })
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
