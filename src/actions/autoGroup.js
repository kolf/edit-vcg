const queryString = require('query-string');

export const REQUEST_CREATE_AUTO_GROUP = 'REQUEST_CREATE_AUTO_GROUP';
export const CREATE_AUTO_GROUP_FAILURE = 'CREATE_AUTO_GROUP_FAILURE';
export const CREATE_AUTO_GROUP_SUCCESS = 'CREATE_AUTO_GROUP_SUCCESS';

function requestCreateAutoGroup(group) {
  return {
    type: REQUEST_CREATE_AUTO_GROUP,
    isFetching: true,
    group,
  };
}

function createAutoGroupSuccess(message) {
  return {
    type: CREATE_AUTO_GROUP_SUCCESS,
    isFetching: false,
    message,
  };
}

function createAutoGroupError(message) {
  return {
    type: CREATE_AUTO_GROUP_FAILURE,
    isFetching: false,
    message,
  };
}

export function createAutoGroup(creds) {
  return dispatch => {
    dispatch(requestCreateAutoGroup(creds));
    return fetch(
      `/api/sitecms/autoGroup/addGroup?token=${localStorage.getItem(
        'id_token',
      )}&${queryString.stringify(creds)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      },
    ).then(res =>
      res.json().then(data => {
        let message = data.message;
        if (!res.ok || data.code !== 200) {
          dispatch(createAutoGroupError(message));
          return Promise.reject(data);
        }

        dispatch(createAutoGroupSuccess(message));
        return Promise.resolve(data);
      }),
    );
  };
}
