export const FETCH_CATEGORY_REQUEST = 'FETCH_CATEGORY_REQUEST';
export const FETCH_CATEGORY_ERROR = 'FETCH_CATEGORY_ERROR';
export const FETCH_CATEGORY_SUCCESS = 'FETCH_CATEGORY_SUCCESS';

function fetchCategoryRequest(creds) {
  return {
    type: FETCH_CATEGORY_REQUEST,
    isFetching: true,
    creds,
  };
}

function fetchCategoryError(msg) {
  return {
    type: FETCH_CATEGORY_ERROR,
    isFetching: false,
    msg,
  };
}

function fetchCategorySuccess(payload) {
  return {
    type: FETCH_CATEGORY_SUCCESS,
    isFetching: false,
    payload,
  };
}

export function fetchCategory() {
  return dispatch => {
    dispatch(fetchCategoryRequest());
    return fetch('/api/edit/param/getAllCategory', {
      method: 'POST',
    })
      .then(res =>
        res.json().then(data => {
          if (!res.ok) {
            dispatch(fetchCategoryError(data.message));
            return Promise.reject(data);
          }
          const payload = data.data;
          dispatch(fetchCategorySuccess(payload));
          return Promise.reject(payload);
        }),
      )
      .catch(err => console.log('Error', err));
  };
}
