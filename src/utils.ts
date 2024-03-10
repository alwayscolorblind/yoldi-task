import { Action } from '@/types'

export const changeHandler = <A extends string>(dispatch: (action: Action<A, string>) => void, action: A) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  dispatch({ type: action, payload: e.target.value })
}
