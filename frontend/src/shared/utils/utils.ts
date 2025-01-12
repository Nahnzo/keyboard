// Переделать
export function handleKeyPress(event: KeyboardEvent) {
  const keyCode = event.keyCode
  if (keyCode >= 48 && keyCode <= 57) {
    return true
  } else if (keyCode >= 65 && keyCode <= 90) {
    return true
  } else if (keyCode >= 97 && keyCode <= 122) {
    return true
  } else {
    return false
  }
}

export function calculateAccuracy(countErrors: number, totalPassedChars: number) {
  const accuracy = ((totalPassedChars - countErrors) / totalPassedChars) * 100
  return accuracy ? accuracy.toFixed(2) : '-' + '%'
}

export function calculateMinutes(totalPassedChars: number, wordsLength: number = 5) {
  const wpm = totalPassedChars / wordsLength
  const cpm = totalPassedChars / (15 / 60)
  return { wpm, cpm }
}

export function formatDate(date: string) {
  const newDate = new Date(date)
  const formattedDate = newDate.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
  return formattedDate
}
