import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from 'app/store/store'
import { useTimer } from 'shared/hooks/hooks'
import { handleExpiredTimer, handleTimer } from '../model/timerSlice'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './timer.module.css'

const timeVariation = ['15', '30', '45', '60']

const Timer = () => {
  const [timeForTimer, setTimeForTimer] = useState<string>('15')
  const { isActive } = useSelector((state: RootState) => state.timer)
  const { seconds, hasExpired } = useTimer(timeForTimer, isActive)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (hasExpired) {
      dispatch(handleExpiredTimer(true))
      dispatch(handleTimer(false))
      navigate('/results')
    }
  }, [hasExpired, dispatch, navigate])

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
