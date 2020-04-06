import produce from 'immer';

const initialState = {
  profile: null,
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  return produce(state, draft => {
    switch (type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.profile = payload.user;
        break;
      }
      case '@auth/SIGN_START': {
        draft.profile = null;
        draft.loading = false;
        break;
      }
      case '@user/UPDATE_PROFILE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@user/UPDATE_PROFILE_SUCCESS': {
        draft.loading = false;
        if (!Object.is(draft.profile, payload.profile))
          draft.profile = payload.profile;
        break;
      }
      case '@user/UPDATE_PROFILE_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@user/UPDATE_PROFILE_START': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.profile = null;
        break;
      }
      default:
    }
  });
};
