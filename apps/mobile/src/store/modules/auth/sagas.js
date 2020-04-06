import { call, put, all, takeLatest } from 'redux-saga/effects';

import { signInSuccess, signInRequest, signFailure } from './actions';

import api from '~/services/api';

export function* signIn({ payload }) {
  const { email, password } = payload;

  try {
    const response = yield call(
      api.post,
      '/sessions',
      { email, password },
      { timeout: 10000 }
    );
    const { token, user } = response.data;
    api.defaults.headers.Authorization = `Bearer ${token}`;
    yield put(signInSuccess(token, user));
  } catch (error) {
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password, birthday, gender } = payload.data;

    yield call(
      api.post,
      '/users',
      { name, email, password, birthday, gender },
      { timeout: 10000 }
    );

    yield put(signInRequest(email, password));
  } catch (error) {
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;
  const { token } = payload.auth;
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
