import { IStore } from "../rootReducer";

export const selectIsUserLoggedIn = (store: IStore) => store.user.isLoggedIn;

export const selectLoggedInUser = (store: IStore) => store.user.user;