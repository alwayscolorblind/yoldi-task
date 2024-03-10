import { HTMLAttributes } from 'react'
import Image from 'next/image'
import { Button } from '@/components/button'
import styles from './header.module.css'
import { ProfileDto } from '@/api/swagger'
import { Avatar } from '@/components/avatar'
import Link from 'next/link'
import { toLogin } from '@/actions'

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  userData: Pick<ProfileDto, "name" | "image" | "slug"> | null;
}

export const Header = ({ userData, ...props}: HeaderProps) => {
  return (
    <header {...props} className={styles.header}>
      <Link href="/">
        <div className={styles.logoContainer}>
          <Image src="/logo-wrapper.svg" alt="logo" width={80} height={50} priority/>
          <p className={styles.logoText}>
            Разрабатываем и запускаем сложные веб проекты
          </p>
        </div>
      </Link>
      {Boolean(userData) || (
        <form action={toLogin}>
          <Button buttonType="secondary" type="submit">Войти</Button>
        </form>
      )}
      {userData && (
        <Link href="/[slug]" as={`/${userData.slug}`}>
          <div className={styles.profile}>
            <p>{userData.name}</p>
            <Avatar name={userData.name} src={userData?.image?.url || ''} size="small"/>
          </div>
        </Link>
      )}
    </header>
  )
}
