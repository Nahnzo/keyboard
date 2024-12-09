import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../../app/store/store'
import { useTimer } from '../../../shared/hooks/hooks'
import { handleExpiredTimer } from '../model/timerSlice'
import { useState } from 'react'
import styles from './timer.module.css'

const Timer = () => {
  const [timeForTimer, setTimerForTimer] = useState<string>('15')
  const { isActive } = useSelector((state: RootState) => state.timer)
  const { seconds, hasExpired } = useTimer(timeForTimer, isActive)
  const dispatch = useAppDispatch()
  if (hasExpired) {
    dispatch(handleExpiredTimer(true))
  }

  return (
    <>
      <details>
        <summary>Выберите время</summary>
        <select onChange={(event) => setTimerForTimer(event.target.value)}>
          <option value="15">15 sec</option>
          <option value="30">30 sec</option>
          <option value="45">45 sec</option>
          <option value="60">60 sec</option>
        </select>
      </details>
      <div className={styles.timerContainer}>{seconds} sec.</div>
    </>
  )
}

export default Timer
