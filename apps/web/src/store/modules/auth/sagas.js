import { takeLatest, call, put, all, delay } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from 'services/history';
import api from 'services/api';

import { signInSuccess, signFailure, signInRequest } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    yield delay(500);

    const response = yield call(api.post, '/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    history.push('/');
    toast.success(
      'Agora você está logado, contribua e veja o status da sua empresa'
    );
  } catch (err) {
    toast.error('Falha na autenticação, verifique seus dados.');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password, birth_date, gender_id } = payload;

    yield call(api.post, '/users', {
      name,
      email,
      password,
      birth_date,
      gender_id,
    });

    yield put(signInRequest(email, password));
  } catch (error) {
    toast.error(
      'Houve um problema ao tentar se cadastrar, por favor revise seus dados.'
    );
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
