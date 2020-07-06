import createMutableReducer from "../utils/mutableReducer";
import { IUser } from "app/models/user";

export interface IUserStore {
  user?: IUser;
  isLoggedIn: boolean;
  isLoggingIn: boolean;
  jwtToken?: string;
}

const initialState = {
  user: undefined,
  isLoggedIn: false,
  isLoggingIn: false,
  jwtToken: undefined,
} as IUserStore;

export const reducer = createMutableReducer(initialState, {

})