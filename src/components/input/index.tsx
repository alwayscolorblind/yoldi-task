import { InputHTMLAttributes, ReactNode } from 'react'
import styles from './input.module.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  label?: string;
  additional?: string;
}

export const Input = ({ isError, leftIcon, rightIcon, label, additional, ...props }: InputProps) => (
  <div className={styles.inputContainer}>
    <label className={styles.label} htmlFor={props.id}>{label}</label>
    <div className={styles.inputInner}>
      {additional && <div className={styles.additional}>{additional}</div>}
      <div
        className={`${styles.input} ${isError ? styles.error : ''} ${leftIcon ? styles.withLeft : ''} ${rightIcon
          ? styles.withRight
          : ''} ${additional ? styles.withAdditional : ''}`}>
        {leftIcon && <div className={`${styles.icon} ${styles.leftIcon}`}>
          {leftIcon}
        </div>}
        <input {...props} />
        {rightIcon && <div className={`${styles.icon} ${styles.rightIcon}`}>
          {rightIcon}
        </div>}
      </div>
    </div>
  </div>
)
