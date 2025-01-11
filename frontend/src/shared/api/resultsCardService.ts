interface IResultCardProps {
  seconds: string
  accuracy: string
  wpm: number
  cpm: number
  created_At: Date
}

export const saveUserResults = async ({ seconds, accuracy, wpm, cpm, created_At }: IResultCardProps) => {
  try {
    const response = await fetch('http://localhost:3000/user/saveResultsCard', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ seconds, accuracy, wpm, cpm, created_At }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`)
    }
    const res = await response.json()
    console.log(res)
  } catch (error) {
    console.log('Произошла ошибка', error?.message)
  }
}

export const getCardListResults = async () => {
  try {
    const response = await fetch('http://localhost:3000/user/loadResultsCard', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`)
    }
    const result = await response.json()
    return result
  } catch (error) {
    console.log('Произошла ошибка', error?.message)
  }
}
