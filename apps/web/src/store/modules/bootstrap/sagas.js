import { all, put, takeLatest } from 'redux-saga/effects';

import { REHYDRATE } from 'redux-persist/lib/constants';

import { gendersRequest } from '../genders/actions';
import { labelsRequest } from '../labels/actions';

export function* startBootstrap() {
  yield all([put(labelsRequest()), put(gendersRequest())]);
}

export default all([takeLatest(REHYDRATE, startBootstrap)]);
