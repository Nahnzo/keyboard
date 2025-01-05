import { memo } from 'react'
import styles from './accuracy.module.css'

interface IAccuracy {
  totalPassedChars: number
  errors: number
}

const Accuracy = memo(({ errors, totalPassedChars }: IAccuracy) => {
  const accuracy = ((totalPassedChars - errors) / totalPassedChars) * 100
  return <p className={styles.accText}>Точность {accuracy ? accuracy.toFixed(2) : '-'} %</p>
})

export default Accuracy
