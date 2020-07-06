import { combineReducers } from "redux";
import { reducer as user, IUserStore } from './modules/user';

export interface IStore {
  user: IUserStore;
}

export default combineReducers({
  user,
  // ..
});