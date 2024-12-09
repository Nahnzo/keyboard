import { createSlice } from '@reduxjs/toolkit'

interface IStateTimer {
  isActive: boolean
  hasExpired: boolean
}

const initialState: IStateTimer = {
  isActive: false,
  hasExpired: false,
}

export const timerSlice = createSlice({
  name: 'timerSlice',
  initialState,
  reducers: {
    handleTimer: (state, action) => {
      state.isActive = action.payload
    },
    handleExpiredTimer: (state, action) => {
      state.hasExpired = action.payload
    },
  },
})

export const timerReducer = timerSlice.reducer
export const { handleTimer, handleExpiredTimer } = timerSlice.actions
