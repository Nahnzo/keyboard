import { createSlice } from '@reduxjs/toolkit'
import { checkSessionThunk, loginUserThunk, logoutUserThunk } from 'shared/api/authService'

interface IUserState {
  isAuth: boolean
  hasError: boolean
  isLoading: boolean
  errorMessage: string | undefined
  username: string | undefined
}

const initialState: IUserState = {
  isAuth: false,
  hasError: false,
  isLoading: false,
  errorMessage: '',
  username: '',
}

const userSlice = createSlice({
  name: 'AuthSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUserThunk.pending, (state) => {
      state.isLoading = true
    })

    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      if (action.payload.isAuth) {
        state.isAuth = true
        state.username = action.payload.username
      } else {
        state.isAuth = false
        state.errorMessage = 'Неверный логин или пароль'
      }
      state.isLoading = false
    })
    builder.addCase(loginUserThunk.rejected, (state) => {
      state.hasError = true
      state.isAuth = false
      state.isLoading = false
      state.errorMessage = 'Неверный логин или пароль'
    })
    builder.addCase(logoutUserThunk.fulfilled, (state) => {
      state.isAuth = false
      state.username = undefined
    })
    builder.addCase(checkSessionThunk.fulfilled, (state, action) => {
      if (action.payload.isAuth) {
        state.isAuth = true
        state.username = action.payload.username
      }
    })
  },
})

export const userSliceReducer = userSlice.reducer
