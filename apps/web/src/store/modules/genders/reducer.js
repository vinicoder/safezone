import produce from 'immer';

const INITIAL_STATE = {
  data: [],
  loading: false,
  error: null,
};

export default function genders(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@genders/GENDERS_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@genders/GENDERS_SUCCESS': {
        draft.data = action.payload.genders;
        draft.loading = false;
        break;
      }
      case '@genders/GENDERS_FAILURE': {
        draft.loading = false;
        draft.error = action.payload.error;
        break;
      }
      default:
    }
  });
}
