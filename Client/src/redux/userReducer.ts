import { User } from "../models/User";

// Initial state
export interface UserState {
  user: User | null;
  token: string | null;
}

// all possible action types
export enum UserActionType {
  setLogout = "setLogout",
  setLogin = "setLogin",
}

// Defining the action structure
export interface UserAction {
  type: UserActionType;
  payload?: any;
}

// Functions to dispatch actions
export const setLogoutAction = (): UserAction => {
  return { type: UserActionType.setLogout };
};

export const setLoginAction = (user: User, token: string): UserAction => {
  return { type: UserActionType.setLogin, payload: { user, token } };
};

// Reducer function to handle state changes based on actions
export const userReducer = (
  currentState: UserState = {
    user: null,
    token: null,
  },
  action: UserAction
): UserState => {
  const newState = { ...currentState };

  switch (action.type) {
    case UserActionType.setLogout:
      newState.user = null;
      newState.token = null;
      break;

    case UserActionType.setLogin:
      newState.user = action.payload.user;
      newState.token = action.payload.token;
      break;

    default:
      return currentState;
  }

  return newState;
};
