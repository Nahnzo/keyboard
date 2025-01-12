import { store } from 'app/store/store'
import { useDispatch } from 'react-redux'

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<AppDispatch>()
