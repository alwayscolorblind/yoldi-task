import { Action } from '@/types'

export enum ActionType {
  SET_EMAIL = 'SET_EMAIL',
  SET_PASSWORD = 'SET_PASSWORD',
  SET_NAME = 'SET_NAME',
  SET_IS_ERROR = 'SET_IS_ERROR',
  SET_IS_PASSWORD_VISIBLE = 'SET_IS_PASSWORD_VISIBLE',
}

export interface State {
  email: string;
  password: string;
  name: string;
  isError: boolean;
  isPasswordVisible: boolean;
}

export const initialState: State = {
  email: '',
  password: '',
  name: '',
  isError: false,
  isPasswordVisible: false,
}

export const reducer = (state: State, action: Action<ActionType, any>) => {
  const { type, payload } = action

  switch (type) {
    case ActionType.SET_EMAIL:
      return {
        ...state,
        email: payload
      }
    case ActionType.SET_PASSWORD:
      return {
        ...state,
        password: payload
      }
    case ActionType.SET_NAME:
      return {
        ...state,
        name: payload
      }
    case ActionType.SET_IS_ERROR:
      return {
        ...state,
        isError: payload
      }
    case ActionType.SET_IS_PASSWORD_VISIBLE:
      return {
        ...state,
        isPasswordVisible: payload
      }
    default:
      return state
  }
}
