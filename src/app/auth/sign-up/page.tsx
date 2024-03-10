'use client'
import styles from '@/app/auth/page.module.css'
import { Button, Input } from '@/components'
import { EnvelopeIcon, EyeIcon, LockIcon, UserIcon } from 'react-line-awesome'
import { useReducer } from 'react'
import { ActionType, initialState, reducer } from '@/app/auth/reducer'
import { changeHandler } from '@/utils'
import { useFormState } from 'react-dom'
import { handleRegister } from '@/actions'

export default function LoginPage() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [formState, action] = useFormState(handleRegister, { isError: false });

  const togglePassword = () => {
    dispatch({type: ActionType.SET_IS_PASSWORD_VISIBLE, payload: !state.isPasswordVisible})
  }

  return (
    <form className={styles.form} action={action}>
      <h1 className={styles.title}>Регистрация<br/> в Yoldi Agency</h1>
      <div className={styles.formContainer}>
        <div className={styles.inputContainer}>
          <Input
            placeholder="Имя"
            name="name"
            leftIcon={<UserIcon className={styles.icon}/>}
            onChange={changeHandler(dispatch, ActionType.SET_NAME)}
            isError={!formState}
            autoComplete="off"
          />
          <Input
            placeholder="E-mail"
            name="email"
            leftIcon={<EnvelopeIcon className={styles.icon}/>}
            onChange={changeHandler(dispatch, ActionType.SET_EMAIL)}
            isError={formState.isError}
            autoComplete="off"
            type="email"
          />
          <Input
            placeholder="Пароль"
            name="password"
            type={state.isPasswordVisible ? "text" : "password"}
            leftIcon={<LockIcon variant="solid" className={styles.icon}/>}
            rightIcon={<EyeIcon variant="solid" className={`${styles.icon} ${styles.eye}`} onClick={togglePassword}/>}
            onChange={changeHandler(dispatch, ActionType.SET_PASSWORD)}
            isError={formState.isError}
            autoComplete="off"
          />
        </div>
        <Button type="submit" disabled={!state.email || !state.password || !state.name}>
          Войти
        </Button>
      </div>
    </form>
  )
}
