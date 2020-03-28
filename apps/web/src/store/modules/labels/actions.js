export function labelsRequest() {
  return {
    type: '@labels/LABELS_REQUEST',
  };
}

export function labelsSuccess(labels) {
  return {
    type: '@labels/LABELS_SUCCESS',
    payload: { labels },
  };
}

export function labelsFailure(error) {
  return {
    type: '@labels/LABELS_FAILURE',
    payload: { error },
  };
}
