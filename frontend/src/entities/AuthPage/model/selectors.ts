import { RootState } from 'shared/types/types'

export const isAuthUserSelector = (state: RootState) => state.userReducer.isAuth ?? false
export const errorMessageSelector = (state: RootState) => state.userReducer.errorMessage ?? ''
