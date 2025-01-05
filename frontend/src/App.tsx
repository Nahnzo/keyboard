import { Keyboard } from './entities/Keyboard'
import { TextBlock } from './entities/TextBlock'
import Timer from './entities/Timer/ui/Timer'
import { User } from './entities/User'
import './index.css'

function App() {
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
