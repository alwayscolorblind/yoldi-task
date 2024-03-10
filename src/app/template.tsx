import { Header } from '@/components'
import styles from './template.module.css'
import { getMyProfile } from '@/actions'

export default async function RootTemplate({ children }: { children: React.ReactNode }) {
  const data = await getMyProfile()

  return (
    <>
      <Header userData={data || null}/>
      <div className={styles.pageContainer}>
        {children}
      </div>
    </>
  )
}
