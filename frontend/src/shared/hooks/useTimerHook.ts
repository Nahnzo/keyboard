import { useState, useEffect } from 'react'
const SECOND = 1_000

export const useTimer = (seconds: string, isActiveTimer: boolean, interval = SECOND) => {
  const initialTimespan = Number(seconds) * 1000
  const [timespan, setTimespan] = useState(initialTimespan)
  const [hasExpired, setHasExpired] = useState(false)

  useEffect(() => {
    if (!isActiveTimer) return
    if (timespan <= 0) return

    const intervalId = setInterval(() => {
      setTimespan((_timespan) => {
        const newTimespan = _timespan - interval
        if (newTimespan <= 0) {
          clearInterval(intervalId)
          setHasExpired(true)
          return 0
        }
        return newTimespan
      })
    }, interval)

    return () => clearInterval(intervalId)
  }, [timespan, interval, isActiveTimer])

  useEffect(() => {
    setTimespan(Number(seconds) * 1000)
  }, [seconds])

  return {
    seconds: Math.floor(timespan / SECOND) % 60 === 0 && timespan > 0 ? 60 : Math.floor(timespan / SECOND) % 60,
    hasExpired,
  }
}
