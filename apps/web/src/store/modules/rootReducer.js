import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import genders from './genders/reducer';
import labels from './labels/reducer';

export default combineReducers({
  auth,
  user,
  genders,
  labels,
});
