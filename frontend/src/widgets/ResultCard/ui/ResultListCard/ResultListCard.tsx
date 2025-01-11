import { useEffect, useState } from 'react'
import { getCardListResults } from 'shared/api/resultsCardService'
import { ICardProps } from 'widgets/ResultCard/model/types'
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
  }, [])

  if (isLoading) {
    return <div>Загрузка данных...</div>
  }

  return (
    <div className={styles.listCardsContainer}>
      {resultsList.length > 0 ? (
        resultsList.map((item) => <CardResult {...item} key={item.userId} />)
      ) : (
        <div>Нет данных для отображения</div>
      )}
    </div>
  )
}

export default ResultListCard
