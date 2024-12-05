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
