import { ChangeEvent } from 'react'
import styles from './index.module.css'

interface IInputProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  width?: number
  height?: number
  padding?: number
  placeholder: string
}

const CustomInput = ({ onChange, placeholder, height, width, padding }: IInputProps) => {
  return <input onChange={onChange} placeholder={placeholder} style={{ height, width, padding }} className={styles.customInput} />
}

export default CustomInput
