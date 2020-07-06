import { UserActions, setLoggedInUser } from "../modules/user";
import { takeEvery, put, call } from "redux-saga/effects";
import { getJson } from "app/utils/rest";
import { ApiRoute } from "app/services/constants";

function* fetchUserInfo() {
  const user = yield call(async () => await getJson(ApiRoute.UserInfo));
  yield put(setLoggedInUser(user));
}

export const userSagas = [
  takeEvery(UserActions.VerifyJwtAuthentication, fetchUserInfo)
];