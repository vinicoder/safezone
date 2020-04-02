import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/sagas';
import labels from './labels/sagas';
import genders from './genders/sagas';
import rehydrate from './rehydrate/sagas';
import bootstrap from './bootstrap/sagas';

export default function* rootSaga() {
  return yield all([rehydrate, bootstrap, auth, user, genders, labels]);
}
