const queryString = require('query-string');

// 查询组照
export const REQUEST_FETCH_GROUPS = 'REQUEST_FETCH_GROUPS';
export const FETCH_GROUPS_FAILURE = 'FETCH_GROUPS_FAILURE';
export const FETCH_GROUPS_SUCCESS = 'FETCH_GROUPS_SUCCESS';

function requestFetchGroups(groups) {
  return {
    type: REQUEST_FETCH_GROUPS,
    isFetching: true,
    groups,
  };
}

function fetchGroupsSuccess(groups) {
  return {
    type: FETCH_GROUPS_SUCCESS,
    isFetching: false,
    groups,
  };
}

function fetchGroupsError(message) {
  return {
    type: FETCH_GROUPS_FAILURE,
    isFetching: false,
    message,
  };
}

// 获取专题
export function fetchGroups(creds) {
  return dispatch => {
    dispatch(requestFetchGroups(creds));
    return fetch(
      `/api/edit/group/pageList?token=ST-249-f3561633a4536937a5709b088053e8723`,
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
            dispatch(fetchGroupsError(data.message));
            return Promise.reject(data);
          }
          dispatch(fetchGroupsSuccess(data.data));
          return Promise.resolve(data.message);
        }),
      )
      .catch(err => console.log('Error', err));
  };
}
