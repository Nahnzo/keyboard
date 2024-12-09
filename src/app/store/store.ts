import { configureStore } from '@reduxjs/toolkit'
import { timerReducer } from '../../entities/Timer/model/timerSlice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
  reducer: { timer: timerReducer },
})

type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<AppDispatch>()
