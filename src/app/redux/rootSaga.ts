import { all } from 'redux-saga/effects';
import { userSagas } from './sagas/user';

export default function* rootSaga() {
  yield all([
    ...userSagas,
  ])
}