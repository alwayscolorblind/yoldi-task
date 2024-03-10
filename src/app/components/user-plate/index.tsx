import { ProfileDto } from '@/api/swagger'
import { Avatar } from '@/components'
import styles from './user-plate.module.css'
import Link from 'next/link'

interface UserPlateProps {
  info: Pick<ProfileDto, 'name' | 'slug' | 'email' | 'image'>;
}

export const UserPlate = ({ info }: UserPlateProps) => {
  return (
    <li className={styles.userPlateLi}>
      <Link href="/[slug]" as={`/${info.slug}`} className={styles.userPlate}>
        <Avatar size="small" name={info.name} src={info.image?.url}/>
        <div className={styles.info}>
          <p className={styles.name}>{info.name}</p>
          <p className={styles.email}>{info.email}</p>
        </div>
      </Link>
    </li>
  )
}
