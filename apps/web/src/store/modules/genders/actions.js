export function gendersRequest() {
  return {
    type: '@genders/GENDERS_REQUEST',
  };
}

export function gendersSuccess(genders) {
  return {
    type: '@genders/GENDERS_SUCCESS',
    payload: { genders },
  };
}

export function gendersFailure(error) {
  return {
    type: '@genders/GENDERS_FAILURE',
    payload: { error },
  };
}
