import { combineReducers } from "redux";
import { reducer as user, IUserStore } from './modules/user';
import { reducer as form } from 'redux-form'

export interface IStore {
  user: IUserStore;
}

export default combineReducers({
  user,

  // redux-form
  form,
});