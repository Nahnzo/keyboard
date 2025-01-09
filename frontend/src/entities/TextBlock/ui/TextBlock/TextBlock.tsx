import { useEffect, useState } from 'react'
import { handleKeyPress } from 'shared/utils/utils'
import { useAppDispatch } from 'app/store/store'
import { handleExpiredTimer, handleTimer } from '../../../Timer/model/timerSlice'
import { incrementCountPassedWords, incrementCountErrors } from '../../model/TextBlockSlice'
import styles from './TextBlock.module.css'
import Words from '../Words/Words'
const TextBlock = () => {
  const [words, setWords] = useState<string[]>([])
  const [counterCharacters, setCounterCharacters] = useState(0)
  const [counterWords, setCounterWords] = useState(0)
  const [changeWords, setChangeWords] = useState(false)
  const [isNiceChar, setIsNiceChar] = useState<boolean | null>(null)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!words) return
      if (!handleKeyPress(event)) {
        return
      }
      const currentWord = words[counterWords]
      if (currentWord) {
        dispatch(handleTimer(true))
        if (event.key === currentWord[counterCharacters]) {
          setCounterCharacters((prev) => prev + 1)
          dispatch(incrementCountPassedWords(1))
          setIsNiceChar(true)
          if (event.key === ' ') {
            return
          }

          if (counterCharacters + 1 === currentWord.length) {
            setCounterWords((prev) => prev + 1)
            setCounterCharacters(0)
          }
        } else {
          setIsNiceChar(false)
          dispatch(incrementCountErrors(1))
        }

        if (event.key === ' ' && counterCharacters === currentWord.length) {
          setCounterWords((prev) => prev + 1)
          setCounterCharacters(0)
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [counterCharacters, counterWords, dispatch, words])

  useEffect(() => {
    const getWords = async () => {
      try {
        const response = await fetch('https://random-word-api.vercel.app/api?words=30&length=5')
        const words = await response.json()
        setWords(words)
      } catch (error) {
        console.log(error)
      }
    }
    getWords()
  }, [changeWords])

  return (
    <>
      <div className={styles.accuracyContainer}></div>
      <div className={styles.textContainer}>
        <Words words={words} counterCharacters={counterCharacters} counterWords={counterWords} isNiceChar={isNiceChar} />
        <button
          onClick={() => {
            setChangeWords((prev) => !prev)
            setCounterCharacters(0)
            setCounterWords(0)
            dispatch(handleExpiredTimer(true))
          }}
          className={styles.changeWordsBtn}
        >
          Refresh
        </button>
      </div>
    </>
  )
}

export default TextBlock
