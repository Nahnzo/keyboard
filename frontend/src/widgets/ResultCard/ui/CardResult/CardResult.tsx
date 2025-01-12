import { formatDate } from 'shared/utils/utils'
import { ICardProps } from '../../model/types'
import styles from './cardResult.module.css'
const CardResult = (props: ICardProps) => {
  const { accuracy, cpm, created_At, seconds, wpm } = props
  return (
    <div className={styles.cardContainer}>
      <div>{seconds}</div>
      <div>{accuracy}</div>
      <div>{wpm}</div>
      <div>{cpm}</div>
      <div>{formatDate(created_At)}</div>
      <button>Удалить</button>
    </div>
  )
}

export default CardResult
