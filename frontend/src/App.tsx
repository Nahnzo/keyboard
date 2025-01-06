import { useEffect } from 'react'
import { Keyboard } from './entities/Keyboard'
import { TextBlock } from './entities/TextBlock'
import Timer from './entities/Timer/ui/Timer'
import { User } from './entities/User'
import './index.css'
import { useAppDispatch } from './app/store/store'
import { checkSessionThunk } from './shared/api/authService'

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
      {/* <Keyboard /> */}
    </main>
  )
}

export default App
