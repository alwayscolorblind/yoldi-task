'use client'
import { Button, Input } from '@/components'
import { EnvelopeIcon, EyeIcon, LockIcon } from 'react-line-awesome'
import styles from '@/app/auth/page.module.css'
import { useReducer } from 'react'
import { useFormState } from "react-dom"
import { ActionType, initialState, reducer } from '@/app/auth/reducer'
import { changeHandler } from '@/utils'
import { handleLogin } from '@/actions'

export default function LoginPage() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [formState, action] = useFormState(handleLogin, { isError: false });

  const togglePassword = () => {
    dispatch({type: ActionType.SET_IS_PASSWORD_VISIBLE, payload: !state.isPasswordVisible})
  }

  return (
    <form className={styles.form} action={action}>
      <h1 className={styles.title}>Вход в Yoldi Agency</h1>
      <div className={styles.formContainer}>
        <div className={styles.inputContainer}>
          <Input
            placeholder="E-mail"
            name="email"
            type="email"
            leftIcon={<EnvelopeIcon className={styles.icon}/>}
            value={state.email}
            onChange={changeHandler(dispatch, ActionType.SET_EMAIL)}
            isError={formState.isError}
            autoComplete="off"
            required
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
            required
          />
        </div>
        <Button type="submit" disabled={!state.email || !state.password}>
          Войти
        </Button>
      </div>
    </form>
  )
}
