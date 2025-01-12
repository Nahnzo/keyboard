import { useEffect, useState } from 'react'
import { getCardListResults } from 'shared/api/resultsCardService'
import { ICardProps } from '../../model/types'
import CardResult from '../CardResult/CardResult'
import styles from './resultListCard.module.css'
const ResultListCard = () => {
  const [resultsList, setResultList] = useState<ICardProps[]>([])
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const getResultsList = async () => {
      try {
        setIsLoading(true)
        const response = await getCardListResults()
        if (Array.isArray(response)) {
          setResultList(response)
        } else {
          console.error('Полученные данные не являются массивом', response)
        }
        setIsLoading(false)
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }
    getResultsList()
  }, [resultsList.length])

  if (isLoading) {
    return <div>Загрузка данных...</div>
  }

  return (
    <div className={styles.listCardsContainer}>
      <div className={styles.filterContainer}>
        <div className={styles.time}>Время</div>
        <div className={styles.accuracy}>Точность %</div>
        <div className={styles.wpm}>Слов в минуту</div>
        <div className={styles.cpm}>Символов в минуту</div>
        <div className={styles.date}>Дата создания</div>
      </div>
      {resultsList.length > 0 ? resultsList.map((item) => <CardResult {...item} key={item._id} />) : <div>Нет данных для отображения</div>}
    </div>
  )
}

export default ResultListCard
