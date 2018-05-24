export const REQUEST_FETCH_KEYWORD_DICT = 'REQUEST_FETCH_KEYWORD_DICT';
export const FETCH_KEYWORD_DICT_FAILURE = 'FETCH_KEYWORD_DICT_FAILURE';
export const FETCH_KEYWORD_DICT_SUCCESS = 'FETCH_KEYWORD_DICT_SUCCESS';
export const REMOVE_ALL_KEYWORD_DICT = 'REMOVE_ALL_KEYWORD_DICT';

function requestFetchKeywordDict(creds) {
  return {
    type: REQUEST_FETCH_KEYWORD_DICT,
    isFetching: true,
    creds,
  };
}

function fetchKeywordDictError(message) {
  return {
    type: FETCH_KEYWORD_DICT_FAILURE,
    isFetching: false,
    message,
  };
}

function fetchKeywordDictSuccess(list) {
  return {
    type: FETCH_KEYWORD_DICT_SUCCESS,
    isFetching: false,
    list,
  };
}

export function removeAllKeywordDict() {
  return {
    type: REMOVE_ALL_KEYWORD_DICT,
  };
}

export function fetchKeywordDict(creds) {
  return dispatch => {
    dispatch(requestFetchKeywordDict());
    const url = creds.name ? 'cfp/kw/find/batch' : 'cfp/keyword/get/ids';
    return fetch(`/api/edit/proxy/post?url=${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(creds),
    })
      .then(res =>
        res.json().then(data => {
          if (!res.ok) {
            dispatch(fetchKeywordDictError(data.message));
            return Promise.reject(data);
          }

          dispatch(fetchKeywordDictSuccess(data));
          return Promise.resolve(data);
        }),
      )
      .catch(err => console.log('FAILURE', err));
  };
}
