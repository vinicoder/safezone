import produce from 'immer';

const INITIAL_STATE = {
  data: [],
  loading: false,
  error: null,
};

export default function labels(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@labels/LABELS_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@labels/LABELS_SUCCESS': {
        draft.data = action.payload.labels;
        draft.loading = false;
        break;
      }
      case '@labels/LABELS_FAILURE': {
        draft.loading = false;
        draft.error = action.payload.error;
        break;
      }
      default:
    }
  });
}
