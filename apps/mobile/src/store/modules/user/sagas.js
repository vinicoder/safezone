import { call, put, all, takeLatest } from 'redux-saga/effects';

import api from '~/services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    // const { name, email, gender, cpf, phone, avatar } = payload.data;

    // const formData = new FormData();
    // formData.append('_method', 'put');

    // formData.append('name', name);
    // formData.append('email', email);
    // formData.append('gender', gender);
    // formData.append('cpf', cpf);
    // formData.append('phone', phone);

    // if (avatar) {
    //   if (typeof avatar === 'string') {
    //     formData.append('avatar', avatar);
    //   } else if (typeof avatar === 'object' && avatar.type === 'image') {
    //     const filename = avatar.uri.split('/').pop();
    //     const match = /\.(\w+)$/.exec(filename);
    //     const type = match ? `image/${match[1]}` : `image`;
    //     formData.append('avatar', { uri: avatar.uri, name: filename, type });
    //   }
    // }

    // const response = yield call(api.post, 'api/user/me', formData, {
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'multipart/form-data',
    //   },
    //   timeout: 10000,
    // });

    yield put(updateProfileSuccess(response.data));
  } catch (error) {
    yield put(updateProfileFailure());
  }
}

export function* getCurrentProfile() {
  try {
    const response = yield call(api.get, 'api/user/me');
    yield put(updateProfileSuccess(response.data));
  } catch (error) {
    yield put(updateProfileFailure());
  }
}

export default all([
  takeLatest('@user/UPDATE_PROFILE_START', getCurrentProfile),
  takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile),
]);
