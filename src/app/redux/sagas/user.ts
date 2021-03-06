import { UserActions, setLoggedInUser, userRegistrationComplete, userLoginComplete } from "../modules/user";
import { takeEvery, put } from "redux-saga/effects";
import { getJson, postJson } from "app/utils/rest";
import { ApiRoute } from "app/services/constants";
import { IUserRegistrationFormValues } from "app/components/screens/Register";
import { IActionWithPayload } from "../utils/actions";
import { setJwtToken, clearJwtToken } from "app/services/auth";
import { IUser } from "app/models/user";
import { ILoginFormValues } from "app/components/screens/Login";

interface IRegisterUserResponse {
  auth: boolean;
  message: string;
  token: string;
  user: IUser;
}

interface ILoginUserResponse extends IRegisterUserResponse {}

function* fetchUserInfo() {
  const user = yield getJson(ApiRoute.UserInfo);
  yield put(setLoggedInUser(user));
}

function* registerUser({ 
  payload,
  actionMeta
}: IActionWithPayload<IUserRegistrationFormValues>) {
  try {
    const response: IRegisterUserResponse = yield postJson(ApiRoute.RegisterUser, payload);
    if (response.auth) {
      setJwtToken(response.token);
      yield put(userRegistrationComplete(response.user));
      if (actionMeta && actionMeta.success) {
        actionMeta.success(response.user);
      }
    } else {
      throw Error(response.message);
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

function* loginUser({ 
  payload,
  actionMeta
}: IActionWithPayload<ILoginFormValues>) {
  try {
    const response: ILoginUserResponse = yield postJson(ApiRoute.LoginUser, payload);
    if (response.auth) {
      setJwtToken(response.token);
      yield put(userLoginComplete(response.user));
      if (actionMeta && actionMeta.success) {
        actionMeta.success(response.user);
      }
    } else {
      throw Error(response.message);
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

function* logoutUser() {
  clearJwtToken();
}

export const userSagas = [
  takeEvery(UserActions.VerifyJwtAuthentication, fetchUserInfo),
  takeEvery(UserActions.RegisterBegin, registerUser),
  takeEvery(UserActions.LoginBegin, loginUser),
  takeEvery(UserActions.Logout, logoutUser),
];