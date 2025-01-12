import { RootState } from 'shared/types/types'

export const totalPassedCharsSelector = (state: RootState) => state.textBlock.countCountPassedWords ?? 0
export const counterErrorsSelector = (state: RootState) => state.textBlock.countErrors ?? 0
export const isActiveTimerSelector = (state: RootState) => state.timer.isActive ?? false
