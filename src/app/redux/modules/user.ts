import createMutableReducer from "../utils/mutableReducer";
import { IUser } from "app/models/user";

export interface IUserStore {
  user?: IUser;
}

const initialState = {
  user: undefined,
} as IUserStore;

export const reducer = createMutableReducer(initialState, {

})