import { useCallback, useEffect, useState } from 'react'
import styles from './TextBlock.module.css'
const TextBlock = () => {
  const [words, setWords] = useState<string[]>([])
  const [counterCharacters, setCounterCharacters] = useState(0)
  const [counterWords, setCounterWords] = useState(0)
  const [changeWords, setChangeWords] = useState(false)
  const [isNiceChar, setIsNiceChar] = useState<boolean | null>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!words) return

      const currentWord = words[counterWords]
      if (currentWord) {
        if (event.key === currentWord[counterCharacters]) {
          setCounterCharacters((prev) => prev + 1)
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

  const renderWords = useCallback(() => {
    return words.map((word, wordIndex) => {
      const isWordFinished = counterWords > wordIndex || (counterWords === wordIndex && counterCharacters === word.length)
      return (
        <span key={wordIndex} className={isWordFinished ? styles.finishedWord : ''}>
          {word.split('').map((char, charIndex) => {
            const isCurrentChar = counterWords === wordIndex && counterCharacters === charIndex
            const isCorrectChar = counterWords === wordIndex && counterCharacters === charIndex && isNiceChar
            const isIncorrectChar = counterWords === wordIndex && counterCharacters === charIndex && !isNiceChar
            return (
              <span
                key={charIndex}
                className={`
                ${isCurrentChar ? styles.currentChar : ''}
                ${isCorrectChar ? styles.correctChar : ''}
                ${isIncorrectChar ? styles.incorrectChar : ''}
              `}
              >
                {char}
              </span>
            )
          })}{' '}
        </span>
      )
    })
  }, [counterCharacters, counterWords, isNiceChar, words])

  return (
    <div className={styles.textContainer}>
      {renderWords()}
      <button
        onClick={() => {
          setChangeWords((prev) => !prev)
          setCounterCharacters(0)
          setCounterWords(0)
        }}
        className={styles.changeWordsBtn}
      >
        Refresh
      </button>
    </div>
  )
}

export default TextBlock
