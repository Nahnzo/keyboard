import { Keyboard } from './entities/Keyboard'
import { TextBlock } from './entities/TextBlock'
import Timer from './entities/Timer/ui/Timer'
import './index.css'

function App() {
  return (
    <main className="main">
      <Timer />
      <TextBlock />
      {/* <Keyboard /> */}
    </main>
  )
}

export default App
