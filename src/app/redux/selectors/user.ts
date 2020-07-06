import { IStore } from "../rootReducer";

export const selectIsUserLoggedIn = (store: IStore) => store.user.isLoggedIn;