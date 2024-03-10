import { FOOTER_TEXT } from '@/app/auth/constants'
import { ReactNode } from 'react'
import Link from 'next/link'
import styles from './layout.module.css'

interface LayoutProps {
  footerType: keyof typeof FOOTER_TEXT,
  children: ReactNode,
}

export const Layout = ({ footerType, children }: LayoutProps) => {
  return (
    <div className={styles.layout}>
      <main className={styles.container}>
        <div className={styles.plate}>
          {children}
        </div>
      </main>
      <footer className={styles.footer}>
        <p>{FOOTER_TEXT[footerType].description} <Link href={FOOTER_TEXT[footerType].link}>{FOOTER_TEXT[footerType].title}</Link></p>
      </footer>
    </div>
  )
}
