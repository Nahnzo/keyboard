import { createSlice } from '@reduxjs/toolkit'

interface IInitialState {
  countErrors: number
  countCountPassedWords: number
}

const initialState: IInitialState = {
  countErrors: 0,
  countCountPassedWords: 0,
}

export const TextBlockSlice = createSlice({
  name: 'TextBlockSlice',
  initialState,
  reducers: {
    incrementCountErrors: (state, action) => {
      state.countErrors += action.payload
    },
    incrementCountPassedWords: (state, action) => {
      state.countCountPassedWords += action.payload
    },
    refreshAllCounts: (state) => {
      state.countCountPassedWords = 0
      state.countErrors = 0
    },
  },
})

export const { incrementCountPassedWords, incrementCountErrors, refreshAllCounts } = TextBlockSlice.actions
export const textBlockReducer = TextBlockSlice.reducer
