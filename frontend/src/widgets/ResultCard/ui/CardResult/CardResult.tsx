import { ICardProps } from '../../model/types'
import styles from './cardResult.module.css'
const CardResult = (props: ICardProps) => {
  const { accuracy, charactersPerMinute, created_At, seconds, wordsPerMinute } = props
  return (
    <div className={styles.cardContainer}>
      <div>{seconds}</div>
      <div>{accuracy}</div>
      <div>{wordsPerMinute}</div>
      <div>{charactersPerMinute}</div>
      <div>{created_At}</div>
      <button>Удалить</button>
    </div>
  )
}

export default CardResult
