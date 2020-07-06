import createMutableReducer from "../utils/mutableReducer";
import { IUser } from "app/models/user";

export interface IUserStore {
  user?: IUser;
  isLoggedIn: boolean;
  isLoggingIn: boolean;
  loginError?: string;
}

export enum UserActions {
  LoginBegin = 'USER:LOGIN_BEGIN',
  LoginComplete = 'USER:LOGIN_COMPLETE',
  LoginError = 'USER:LOGIN_ERROR',
  Logout = 'USER:LOGOUT',
  SetLoggedInUser = 'USER:SET_LOGGED_IN_USER',
  VerifyJwtAuthentication = 'USER:VERIFY_JWT_AUTHENTICATION',
}

export const setLoggedInUser = (user: IUser) => ({
  type: UserActions.SetLoggedInUser,
  payload: user,
});

export const logoutUser = () => ({
  type: UserActions.Logout
});

export const verifyJwtAuthentication = (jwtToken: string) => ({
  type: UserActions.VerifyJwtAuthentication,
  payload: jwtToken,
});

const initialState = {
  user: undefined,
  isLoggedIn: false,
  isLoggingIn: false,
  loginError: undefined,
} as IUserStore;

export const reducer = createMutableReducer(initialState, {
  [UserActions.SetLoggedInUser]: (draft, action) => {
    draft.user = action.payload;
  },
  [UserActions.LoginBegin]: (draft, action) => {
    draft.isLoggingIn = true;
    draft.loginError = undefined;
  },
  [UserActions.LoginComplete]: (draft, action) => {
    draft.isLoggingIn = false;
    draft.isLoggedIn = true;
    draft.user = action.payload;
  },
  [UserActions.LoginError]: (draft, action) => {
    draft.isLoggingIn = false;
    draft.loginError = action.payload;
  },
  [UserActions.Logout]: (draft, action) => {
    draft.isLoggedIn = false;
    draft.user = undefined;
  },
})