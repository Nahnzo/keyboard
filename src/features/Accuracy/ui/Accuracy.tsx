import { memo } from 'react'

interface IAccuracy {
  totalPassedChars: number
  errors: number
}

const Accuracy = memo(({ errors, totalPassedChars }: IAccuracy) => {
  const accuracy = ((totalPassedChars - errors) / totalPassedChars) * 100
  return <>Точность {accuracy ? accuracy.toFixed(2) : '-'} %</>
})

export default Accuracy
