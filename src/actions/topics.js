const queryString = require('query-string');

console.log(queryString);

export const FETCH_TOPICS_REQUEST = 'FETCH_TOPICS_REQUEST';
export const FETCH_TOPICS_FAILURE = 'FETCH_TOPICS_FAILURE';
export const FETCH_TOPICS_SUCCESS = 'FETCH_TOPICS_SUCCESS';

export const UPDATE_TOPIC = 'UPDATE_TOPIC';

function fetchTopicsRequest(creds) {
  return {
    type: FETCH_TOPICS_REQUEST,
    isFetching: true,
    creds,
  };
}

function fetchTopicsError(message) {
  return {
    type: FETCH_TOPICS_FAILURE,
    isFetching: false,
    message,
  };
}

function fetchTopicsSuccess(payload) {
  return {
    type: FETCH_TOPICS_SUCCESS,
    isFetching: false,
    payload,
  };
}

export function updateTopic(id, data) {
  return {
    type: UPDATE_TOPIC,
    payload: {
      id,
      data,
    },
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
      `/api/xuefeng/topic/topicPageList?token=${localStorage.getItem(
        'id_token',
      )}`,
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
          return Promise.resolve(payload);
        }),
      )
      .catch(err => console.error(err));
  };
}
