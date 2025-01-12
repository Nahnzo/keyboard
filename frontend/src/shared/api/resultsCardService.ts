import { api } from './axiosInstance'

interface IResultCardProps {
  accuracy: string
  cpm: string
  seconds: string
  wpm: string
}

export const saveUserResults = async (data: IResultCardProps) => {
  try {
    const response = await api.post('/user/saveResultsCard', data)
    return response.data
  } catch (error) {
    console.log(error)
    throw new Error('Не удалось сохранить результаты')
  }
}

export const getCardListResults = async (): Promise<IResultCardProps[]> => {
  try {
    const response = await api.get('/user/loadResultsCard')
    return response.data
  } catch (error) {
    console.error('Ошибка получения списка результатов:', error)
    return []
  }
}
