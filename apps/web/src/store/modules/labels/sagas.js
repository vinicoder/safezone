import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from 'services/api';

import { labelsSuccess, labelsFailure } from './actions';

export function* labelsRequest() {
  try {
    const { data } = yield call(api.get, '/labels');

    yield put(labelsSuccess(data));
  } catch (err) {
    toast.error(
      'Houve um problema com a api, por favor, entre em contato conosco e ajude-nos a resolver.'
    );
    yield put(
      labelsFailure(
        err.message ||
          'Houve um problema com a api, por favor, entre em contato conosco e ajude-nos a resolver.'
      )
    );
  }
}

export default all([takeLatest('@labels/LABELS_REQUEST', labelsRequest)]);
