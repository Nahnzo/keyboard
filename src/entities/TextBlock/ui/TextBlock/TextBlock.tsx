import { useEffect, useState } from 'react'
import { Accuracy } from '../../../../features/Accuracy'
import { handleKeyPress } from '../../../../shared/utils/utils'
import styles from './TextBlock.module.css'
import Words from '../Words/Words'
const TextBlock = () => {
  const [words, setWords] = useState<string[]>([])
  const [counterCharacters, setCounterCharacters] = useState(0)
  const [counterWords, setCounterWords] = useState(0)
  const [changeWords, setChangeWords] = useState(false)
  const [counterErrors, setCounterErrors] = useState<number>(0)
  const [isNiceChar, setIsNiceChar] = useState<boolean | null>(null)
  const [totalPassedChars, setTotalPassedChars] = useState<number>(0)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!words) return
      if (!handleKeyPress(event)) {
        return
      }
      const currentWord = words[counterWords]
      if (currentWord) {
        if (event.key === currentWord[counterCharacters]) {
          setCounterCharacters((prev) => prev + 1)
          setTotalPassedChars((prev) => prev + 1)
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
          setCounterErrors((prev) => prev + 1)
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
  }, [counterCharacters, counterWords, words])

  useEffect(() => {
    const getWords = async () => {
      try {
        const response = await fetch('https://random-word-api.vercel.app/api?words=30')
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
      <div className={styles.accuracyContainer}>
        <Accuracy errors={counterErrors} totalPassedChars={totalPassedChars} />
      </div>
      <div className={styles.textContainer}>
        <Words words={words} counterCharacters={counterCharacters} counterWords={counterWords} isNiceChar={isNiceChar} />
        <button
          onClick={() => {
            setChangeWords((prev) => !prev)
            setCounterCharacters(0)
            setCounterWords(0)
            setCounterErrors(totalPassedChars)
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
