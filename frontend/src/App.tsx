import { useEffect } from 'react'
import { TextBlock } from './entities/TextBlock'
import { Timer } from 'entities/Timer'
import { checkSessionThunk } from './shared/api/authService'
import { useAppDispatch } from './app/store/store'
import { User } from 'widgets/User'
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
