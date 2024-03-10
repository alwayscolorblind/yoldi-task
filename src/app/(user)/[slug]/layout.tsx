import { getUser, logout, toEdit } from '@/actions'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import styles from './layout.module.css'
import { Avatar } from '@/components/avatar'
import { Button } from '@/components'
import { ImageIcon, PenIcon, SignOutAltIcon, TrashIcon, UploadIcon } from 'react-line-awesome'
import React from 'react'

export default async function UserPage({ params, modals }: { modals: React.ReactNode,params: { slug: string } }) {
  const data = await getUser(params.slug)

  const handleToEdit = toEdit.bind(null, params.slug)

  if (!data) {
    notFound()
  }

  const { user, isOwner } = data

  return (
    <div className={styles.pageContainer}>
      {modals}
      <div className={styles.cover}>
        {isOwner && (
          <>
            {user.cover?.url
              ? (
                <Button
                  size="small"
                  buttonType="secondary"
                  leftIcon={<TrashIcon variant="solid" className={styles.icon} />}
                  rightIcon={<ImageIcon className={styles.icon} />}
                >
                  Удалить
                </Button>)
              : (
                <Button
                  size="small"
                  buttonType="secondary"
                  leftIcon={<UploadIcon variant="solid" className={styles.icon} />}
                  rightIcon={<ImageIcon className={styles.icon} />}
                >
                  Загрузить
                </Button>
              )}
          </>
        )}
        {user.cover?.url &&
          <Image src={user.cover?.url} alt="user cover" width={+user.cover.width} height={+user.cover.height}/>}
      </div>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.avatarContainer}>
            <Avatar size="big" name={user.name} src={user.image?.url} className={styles.avatar} canUpload={isOwner}/>
          </div>
          <div className={styles.info}>
            <div className={styles.infoContainer}>
              <h1 className={styles.name}>{user.name}</h1>
              <p className={styles.email}>{user.email}</p>
            </div>
            {isOwner && (
              <div className={styles.editButtonContainer}>
                <form action={handleToEdit}>
                  <Button
                    buttonType="secondary"
                    size="small"
                    leftIcon={<PenIcon className={styles.icon}/>}
                  >
                    Редактировать
                  </Button>
                </form>
              </div>
            )}
          </div>
          {user.description && <p className={styles.description}>{user.description}</p>}
          {isOwner && (
            <div className={styles.exitButtonContainer}>
              <form action={logout}>
                <Button
                  buttonType="secondary"
                  size="small"
                  leftIcon={<SignOutAltIcon variant="solid" className={styles.icon}/>}
                  type="submit"
                >
                  Выйти
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
