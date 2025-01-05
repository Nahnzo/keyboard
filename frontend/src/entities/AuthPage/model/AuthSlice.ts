import { createSlice } from '@reduxjs/toolkit'
import { loginUserThunk, logoutUserThunk } from '../../../shared/api/authService'

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
    builder.addCase(loginUserThunk.pending, (state, action) => {
      state.isLoading = true
    })

    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.isAuth = true
      state.isLoading = false
      state.username = action.meta.arg.username
    })

    builder.addCase(loginUserThunk.rejected, (state, action) => {
      state.hasError = true
      state.isAuth = false
      state.isLoading = false
      state.errorMessage = action?.error?.message
    })
    builder.addCase(logoutUserThunk.fulfilled, (state) => {
      state.isAuth = false
      state.username = undefined
    })
  },
})

export const userSliceReducer = userSlice.reducer
