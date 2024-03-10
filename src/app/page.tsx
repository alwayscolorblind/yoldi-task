import { getUsers } from '@/actions'
import { UserPlate } from '@/app/components/user-plate'
import styles from './page.module.css'

export default async function UsersPage() {
  const users = await getUsers()

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <h1 className={styles.title}>Список аккаунтов</h1>
        <ul>
          {users?.map(user => <UserPlate key={user.slug} info={user}/>)}
        </ul>
      </div>
    </div>
  )
}
