import { Action } from '@/types'

export enum ActionType {
  SET_NAME = 'SET_NAME',
  SET_DESCRIPTION = 'SET_DESCRIPTION',
  SET_SLUG = 'SET_SLUG',
  CLEAR_STATE = 'CLEAR_STATE',
}

export interface State {
  name: string;
  description: string;
  slug: string;
}

export const initialState: State = {
  slug: '',
  description: '',
  name: '',
}

export const reducer = (state: State, action: Action<ActionType, any>) => {
  const { type, payload } = action

  switch (type) {
    case ActionType.SET_SLUG:
      return {
        ...state,
        slug: payload
      }
    case ActionType.SET_DESCRIPTION:
      return {
        ...state,
        description: payload
      }
    case ActionType.SET_NAME:
      return {
        ...state,
        name: payload
      }
    case ActionType.CLEAR_STATE:
      return initialState
    default:
      return state
  }
}
