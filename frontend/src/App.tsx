import { useEffect } from 'react'
import { TextBlock } from './entities/TextBlock'
import { Timer } from 'entities/Timer'
import { checkSessionThunk } from './shared/api/authService'
import { User } from 'widgets/User'
import { useAppDispatch } from 'shared/types/types'
import './index.css'

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(checkSessionThunk())
  })
  return (
    <main className="main">
      <User />
      <Timer />
      <TextBlock />
    </main>
  )
}

export default App
