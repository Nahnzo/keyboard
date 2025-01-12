import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from './axiosInstance'

type UserCredentials = {
  email?: string
  password?: string
  username?: string
}

export const registerUser = async ({ email, password, username }: UserCredentials) => {
  try {
    const response = await api.post('/auth/register', { email, password, username })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data || 'Не удалось зарегистрироваться')
  }
}

export const loginUserThunk = createAsyncThunk('user/login', async ({ password, username }: UserCredentials, { rejectWithValue }) => {
  try {
    const response = await api.post('/auth/login', { password, username })
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Ошибка аутентификации')
  }
})

export const logoutUserThunk = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
  try {
    const response = await api.post('/auth/logout')
    if (response.status === 200) {
      return response.data
    } else {
      return rejectWithValue('Ошибка при logout')
    }
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Ошибка подключения')
  }
})

export const checkSessionThunk = createAsyncThunk('auth/checkSession', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/auth/me')
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Сессия истекла или пользователь не авторизован')
  }
})
