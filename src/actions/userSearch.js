const queryString = require('query-string');

// 创建
export function createUserSearch(creds) {
  return dispatch => {
    return fetch(
      `/api/edit/userSearch/create?token=${localStorage.getItem('id_token')}`,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        method: 'POST',
        body: JSON.stringify(creds),
      },
    )
      .then(res =>
        res.json().then(data => {
          if (!res.ok) {
            return Promise.reject(data);
          }
          return Promise.resolve(data.data);
        }),
      )
      .catch(err => console.log('Error', err));
  };
}
// 删除
export function deleteUserSearch(creds) {
  return dispatch => {
    return fetch(
      `/api/edit/userSearch/delete?token=${localStorage.getItem(
        'id_token',
      )}&${queryString.stringify(creds)}`,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      },
    )
      .then(res =>
        res.json().then(data => {
          if (!res.ok) {
            return Promise.reject(data);
          }
          return Promise.resolve(data.data);
        }),
      )
      .catch(err => console.log('Error', err));
  };
}
// 获取
export const FETCH_USER_SEARCH_REQUEST = 'FETCH_USER_SEARCH_REQUEST';
export const FETCH_USER_SEARCH_FAILURE = 'FETCH_USER_SEARCH_FAILURE';
export const FETCH_USER_SEARCH_SUCCESS = 'FETCH_USER_SEARCH_SUCCESS';

function requestFetchUserSearch() {
  return {
    type: FETCH_USER_SEARCH_REQUEST,
    isFetching: true,
  };
}

function fetchUserSearchSuccess(list) {
  return {
    type: FETCH_USER_SEARCH_SUCCESS,
    isFetching: false,
    list,
  };
}

function fetchUserSearchError(message) {
  return {
    type: FETCH_USER_SEARCH_FAILURE,
    isFetching: false,
    message,
  };
}

export function fetchUserSearch(pageId) {
  return dispatch => {
    dispatch(requestFetchUserSearch(pageId));
    return fetch(
      `/api/edit/userSearch/get?token=${localStorage.getItem(
        'id_token',
      )}&type=${pageId}`,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      },
    )
      .then(res =>
        res.json().then(data => {
          if (!res.ok) {
            dispatch(fetchUserSearchError(data.message));
            return Promise.reject(data);
          }
          const payload = data.data;
          dispatch(fetchUserSearchSuccess(payload));
          return Promise.resolve(payload);
        }),
      )
      .catch(err => console.log('Error', err));
  };
}
