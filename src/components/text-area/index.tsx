import { InputHTMLAttributes } from 'react'
import styles from './text-area.module.css'

interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  isError?: boolean;
}

export const TextArea = ({ label, isError, ...props }: TextAreaProps) => (
  <div className={styles.textAreaContainer}>
    <label className={styles.label} htmlFor={props.id}>{label}</label>
    <textarea {...props} rows={5} />
  </div>
)
