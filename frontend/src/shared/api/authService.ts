import { createAsyncThunk } from '@reduxjs/toolkit'

type UserCredentials = {
  email?: string
  password?: string
  username?: string
}

export const registerUser = async ({ email, password, username }: UserCredentials) => {
  try {
    const response = await fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, username }),
    })

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`)
    }

    const data = await response.json()
    console.log('Регистрация успешна:', data)
  } catch (error) {
    console.error('Ошибка при регистрации:', error)
  }
}

export const loginUserThunk = createAsyncThunk('user/login', async ({ password, username }: UserCredentials) => {
  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, username }),
    })

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    return error
  }
})

export const logoutUserThunk = createAsyncThunk('user/logout', async () => {
  try {
    const response = await fetch('http://localhost:3000/auth/logout', {
      method: 'POST',
      credentials: 'include', // Важно, если сессии используют cookie
    })

    if (response.ok) {
      console.log('Выход выполнен успешно')
      // Очистите состояние клиента, например, сбросьте данные пользователя
    } else {
      console.error('Ошибка при logout')
    }
  } catch (error) {
    console.error('Ошибка при подключении к серверу:', error)
  }
})
