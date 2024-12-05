import styles from './words.module.css'

interface IWords {
  words: string[]
  counterWords: number
  counterCharacters: number
  isNiceChar: boolean | null
}

const Words = ({ words, counterCharacters, counterWords, isNiceChar }: IWords) => {
  return words.map((word, wordIndex) => {
    const isWordFinished = counterWords > wordIndex || (counterWords === wordIndex && counterCharacters === word.length)

    return (
      <span key={wordIndex} className={isWordFinished ? styles.finishedWord : ''}>
        {word.split('').map((char, charIndex) => {
          const isPressedChar = counterWords === wordIndex && counterCharacters > charIndex
          const isCurrentChar = counterWords === wordIndex && counterCharacters === charIndex
          const isCorrectChar = counterWords === wordIndex && counterCharacters === charIndex && isNiceChar
          const isIncorrectChar = counterWords === wordIndex && counterCharacters === charIndex && !isNiceChar

          return (
            <span
              key={charIndex}
              className={`
                  ${isPressedChar ? styles.pressedChar : ''}  
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
}
export default Words
