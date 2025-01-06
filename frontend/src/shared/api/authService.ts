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
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password, username }),
    })

    if (!response.ok) {
      throw new Error('Ошибка аутентификации')
    }

    const data = await response.json()
    console.log(data)
    return data
  } catch (error: any) {
    return { isAuth: false, errorMessage: error.message }
  }
})

export const checkSessionThunk = createAsyncThunk('auth/checkSession', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('http://localhost:3000/auth/me', {
      method: 'GET',
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Сессия истекла или пользователь не авторизован')
    }

    const data = await response.json()
    return data
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

export const logoutUserThunk = createAsyncThunk('user/logout', async () => {
  try {
    const response = await fetch('http://localhost:3000/auth/logout', {
      method: 'POST',
      credentials: 'include',
    })

    if (response.ok) {
      console.log('Выход выполнен успешно')
    } else {
      console.error('Ошибка при logout')
    }
  } catch (error) {
    console.error('Ошибка при подключении к серверу:', error)
  }
})
