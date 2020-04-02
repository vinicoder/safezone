import { select, all, takeLatest } from 'redux-saga/effects';

import { REHYDRATE } from 'redux-persist/lib/constants';

import api from 'services/api';
import { getAuth } from './selectors';

export function* init() {
  const auth = yield select(getAuth);

  if (auth.token) {
    yield (api.defaults.headers.common.Authorization = `Bearer ${auth.token}`);
  }
}

export default all([takeLatest(REHYDRATE, init)]);
