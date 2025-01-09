import { configureStore } from '@reduxjs/toolkit'
import { timerReducer } from 'entities/Timer/model/timerSlice'
import { textBlockReducer } from 'entities/TextBlock/model/TextBlockSlice'
import { useDispatch } from 'react-redux'
import { userSliceReducer } from 'entities/AuthPage/model/AuthSlice'

export const store = configureStore({
  reducer: { timer: timerReducer, textBlock: textBlockReducer, userReducer: userSliceReducer },
})

type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<AppDispatch>()
