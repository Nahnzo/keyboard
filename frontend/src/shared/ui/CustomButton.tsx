import { ReactNode } from 'react'
import styles from './index.module.css'

interface IButtonProps {
  children?: ReactNode
  width?: number
  height?: number
  margin?: number
  padding?: number
  handler?: () => void
}

const CustomButton = ({ height, handler, width, children, margin, padding }: IButtonProps) => {
  return (
    <button style={{ width: width, height: height, margin: margin, padding: padding }} onClick={handler} className={styles.customBtn}>
      {children}
    </button>
  )
}

export default CustomButton
