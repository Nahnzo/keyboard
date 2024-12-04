import styles from './key.module.css'

interface IKey {
  symbol: string
  width?: number
}

const Key = ({ symbol, width }: IKey) => {
  return (
    <div className={styles.key} style={{ width: width }}>
      {symbol}
    </div>
  )
}

export default Key
