/* eslint-disable import/prefer-default-export */

import {
  FETCH_TOPICS_REQUEST,
  FETCH_TOPICS_ERROR,
  FETCH_TOPICS_SUCCESS,
} from '../constants';

function fetchTopicsRequest(creds) {
  return {
    type: FETCH_TOPICS_REQUEST,
    isFetching: true,
    creds,
  };
}

function fetchTopicsError(msg) {
  return {
    type: FETCH_TOPICS_ERROR,
    isFetching: false,
    msg,
  };
}

function fetchTopicsSuccess(payload) {
  return {
    type: FETCH_TOPICS_SUCCESS,
    isFetching: false,
    payload,
  };
}

export function fetchTopics(
  creds = {
    pageNum: 1,
    pageSize: 60,
  },
) {
  return dispatch => {
    dispatch(fetchTopicsRequest(creds));
    return fetch(
      '/api/edit/group/pageList?token=ST-79-dc869de0148e490da302387e010a89286',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(creds),
      },
    )
      .then(res =>
        res.json().then(data => {
          if (!res.ok) {
            dispatch(fetchTopicsError(data.message));
            return Promise.reject(data);
          }
          const payload = data.data;
          dispatch(fetchTopicsSuccess(payload));
          return Promise.reject(payload);
        }),
      )
      .catch(err => console.log('Error', err));
  };
  console.log(this);
}
