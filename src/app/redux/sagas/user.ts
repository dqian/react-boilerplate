import { UserActions, setLoggedInUser, userRegistrationComplete } from "../modules/user";
import { takeEvery, put } from "redux-saga/effects";
import { getJson, postJson } from "app/utils/rest";
import { ApiRoute } from "app/services/constants";
import { IUserRegistrationFormValues } from "app/components/screens/Register";
import { IActionWithPayload } from "../utils/actions";

function* fetchUserInfo() {
  const user = yield getJson(ApiRoute.UserInfo);
  yield put(setLoggedInUser(user));
}

function* registerUser({ 
  payload,
  actionMeta
}: IActionWithPayload<IUserRegistrationFormValues>) {
  try {
    const user = yield postJson(ApiRoute.RegisterUser, payload);
    yield put(userRegistrationComplete(user));
    if (actionMeta && actionMeta.success) {
      actionMeta.success(user);
    }
  } catch (err) {
    console.error(err);
    if (actionMeta && actionMeta.error) {
      actionMeta.error(err);
    }
  }
  if (actionMeta && actionMeta.finally) {
    actionMeta.finally();
  }
}

export const userSagas = [
  takeEvery(UserActions.VerifyJwtAuthentication, fetchUserInfo),
  takeEvery(UserActions.RegisterBegin, registerUser),
];