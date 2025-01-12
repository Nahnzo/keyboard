import { configureStore } from '@reduxjs/toolkit'
import { timerReducer } from 'entities/Timer/model/timerSlice'
import { textBlockReducer } from 'entities/TextBlock/model/TextBlockSlice'
import { userSliceReducer } from 'entities/AuthPage/model/AuthSlice'

export const store = configureStore({
  reducer: { timer: timerReducer, textBlock: textBlockReducer, userReducer: userSliceReducer },
})
