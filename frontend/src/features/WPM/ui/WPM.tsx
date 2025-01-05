import React from 'react'
import styles from './wpm.module.css'

interface IWPM {
  totalPassedChars: number
}

const WPM = ({ totalPassedChars }: IWPM) => {
  // TODO LENGTH WORDS
  const Wpm = totalPassedChars / 5

  return (
    <div>
      <div className={styles.infoResultBlock}>
        <p>Слов в минуту - {Wpm / (15 / 60)}</p>
        <p>Символов в минуту - {totalPassedChars / (15 / 60)}</p>
      </div>
    </div>
  )
}

export default WPM
