import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/sagas';
import rehydrate from './rehydrate/sagas';

export default function* rootSaga() {
  return yield all([rehydrate, auth, user]);
}
