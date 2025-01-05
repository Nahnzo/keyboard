import { charactersArray } from '../../../../shared/consts/characters'
import Key from '../Key/Key'
import styles from './keyboard.module.css'

const Keyboard = () => {
  return (
    <div className={styles.keyboardContainer}>
      {charactersArray.map((item) => (
        <Key symbol={item.symbol} key={item.symbol} width={item.width} />
      ))}
    </div>
  )
}
export default Keyboard
