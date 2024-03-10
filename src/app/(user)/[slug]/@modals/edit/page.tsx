'use client'
import { Modal } from '@/components/modal'
import { Button, Input, TextArea } from '@/components'
import styles from './page.module.css'
import { changeProfile } from '@/actions'
import { useFormState } from 'react-dom'
import { useRouter } from 'next/navigation'
import { queries } from '@/api'
import { useEffect, useReducer } from 'react'
import { ActionType, initialState, reducer } from '@/app/(user)/[slug]/@modals/edit/reducer'
import { changeHandler } from '@/utils'

export default function Edit({ params }: { params: { slug: string } }) {
  const router = useRouter()

  const [inputState, dispatch] = useReducer(reducer, initialState)

  const { data: userData, isLoading, error } = queries.useMyProfile()

  const [state, action] = useFormState(changeProfile, { isError: false })

  const handleModalClose = () => {
    router.push(`/${params.slug}`)
  }

  useEffect(() => {
    if (userData) {
      dispatch({ type: ActionType.SET_NAME, payload: userData.name })
      dispatch({ type: ActionType.SET_DESCRIPTION, payload: userData.description })
      dispatch({ type: ActionType.SET_SLUG, payload: userData.slug })
    }
  }, [userData, dispatch])

  useEffect(() => {
    return () => {
      dispatch({ type: ActionType.CLEAR_STATE, payload: null })
    }
  }, [dispatch])

  return (
    <Modal onClose={handleModalClose}>
      <div className={styles.container}>
        <h1 className={styles.title}>Редактировать профиль</h1>
        <form className={styles.form} action={action}>
          <div className={styles.inputs}>
            <Input
              type="text"
              name="name"
              placeholder="Имя"
              label="Имя"
              required
              value={inputState.name}
              onChange={changeHandler(dispatch, ActionType.SET_NAME)}
              autoComplete="off"
              isError={Boolean(error) || state.isError}
              disabled={isLoading}
            />
            <Input
              type="text"
              name="slug"
              placeholder="slug"
              label="Адрес профиля"
              additional="example.com/"
              required
              value={inputState.slug}
              onChange={changeHandler(dispatch, ActionType.SET_SLUG)}
              autoComplete="off"
              isError={Boolean(error) || state.isError}
              disabled={isLoading}
            />
            <TextArea
              type="text"
              name="description"
              placeholder="Описание"
              label="Описание"
              value={inputState.description}
              onChange={changeHandler(dispatch, ActionType.SET_DESCRIPTION)}
              autoComplete="off"
            />
          </div>
          <div className={styles.buttons}>
            <Button buttonType="secondary" className={styles.buttonElement} onClick={handleModalClose} type="button">Отмена</Button>
            <Button type="submit" className={styles.buttonElement} disabled={isLoading}>Сохранить</Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
