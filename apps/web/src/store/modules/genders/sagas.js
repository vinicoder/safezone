import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from 'services/api';

import { gendersSuccess, gendersFailure } from './actions';

export function* gendersRequest() {
  try {
    const { data } = yield call(api.get, '/genders');

    yield put(gendersSuccess(data));
  } catch (err) {
    toast.error(
      'Houve um problema com a api, por favor, entre em contato conosco e ajude-nos a resolver.'
    );
    yield put(
      gendersFailure(
        err.message ||
          'Houve um problema com a api, por favor, entre em contato conosco e ajude-nos a resolver.'
      )
    );
  }
}

export default all([takeLatest('@genders/GENDERS_REQUEST', gendersRequest)]);
