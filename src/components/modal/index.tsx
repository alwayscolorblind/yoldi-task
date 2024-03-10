import { ReactNode, MouseEvent } from 'react'
import styles from './modal.module.css'

interface ModalProps {
  children: ReactNode;
  onClose?: () => void;
}

export const Modal = ({ children, onClose }: ModalProps) => {
  const handleModalClose = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose?.()
    }
  }

  return (
    <div className={styles.container} onClick={handleModalClose}>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}
