import { call, put, all, takeLatest } from 'redux-saga/effects';

import api from '~/services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const data = ({
      name,
      email,
      gender_id,
      birth_date,
      password,
    } = payload.data);

    const formData = Object.entries(data).reduce(
      (a, [k, v]) => (v ? { ...a, [k]: v } : a),
      {}
    );

    const response = yield call(api.put, '/users', formData, {
      timeout: 10000,
    });

    yield put(updateProfileSuccess(response.data));
  } catch (error) {
    yield put(updateProfileFailure());
  }
}

export function* getCurrentProfile() {
  try {
    const response = yield call(api.get, '/users/me');
    yield put(updateProfileSuccess(response.data));
  } catch (error) {
    yield put(updateProfileFailure());
  }
}

export default all([
  takeLatest('@user/UPDATE_PROFILE_START', getCurrentProfile),
  takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile),
]);
