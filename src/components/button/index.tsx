import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react'
import styles from './button.module.css'

type ButtonTypes = 'primary' | 'secondary'

type ButtonSize = 'small' | 'medium'

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  isError?: boolean;
  // called buttonType to not conflict with native button 'type'
  buttonType?: ButtonTypes;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  size?: ButtonSize;
}

const buttonTypes: Record<ButtonTypes, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
}

const buttonSizes: Record<ButtonSize, string> = {
  small: styles.small,
  medium: styles.medium,
}

export const Button = ({ buttonType = 'primary', size = 'medium', leftIcon, rightIcon, isError, ...props }: ButtonProps) => (
  <button {...props} className={`${styles.button} ${isError ? styles.error : ''} ${buttonTypes[buttonType]} ${buttonSizes[size]} ${props.className ?? ''}`} >
    {leftIcon && <div className={`${styles.icon} ${leftIcon}`}>{leftIcon}</div>}
    <p className={styles.text}>{props.children}</p>
    {rightIcon && <div className={`${styles.icon} ${rightIcon}`}>{rightIcon}</div>}
  </button>
)
