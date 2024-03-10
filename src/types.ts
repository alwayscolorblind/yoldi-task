export interface Action<ActionType extends string, T> {
  type: ActionType;
  payload: T;
}

export type ServerActionState = {
  isError: boolean;
}
