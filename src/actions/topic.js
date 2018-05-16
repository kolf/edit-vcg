const queryString = require('query-string');

export const CREATE_TOPIC_REQUEST = 'CREATE_TOPIC_REQUEST';
export const CREATE_TOPIC_FAILURE = 'CREATE_TOPIC_FAILURE';
export const CREATE_TOPIC_SUCCESS = 'CREATE_TOPIC_SUCCESS';

function requestCreateTopic(topic) {
  return {
    type: CREATE_TOPIC_REQUEST,
    isFetching: true,
    topic,
  };
}

function createTopicSuccess(topic) {
  return {
    type: CREATE_TOPIC_SUCCESS,
    isFetching: false,
    topic,
  };
}

function createTopicError(message) {
  return {
    type: CREATE_TOPIC_FAILURE,
    isFetching: false,
    message,
  };
}

export function createTopic(creds) {
  return dispatch => {
    dispatch(requestCreateTopic(creds));
    return fetch(
      `/api/xuefeng/topic/addTopic?token=${localStorage.getItem(
        'id_token',
      )}&${queryString.stringify(creds)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      },
    )
      .then(res =>
        res.json().then(data => {
          if (!res.ok) {
            dispatch(createTopicError(data.message));
            return Promise.reject(data);
          }
          const payload = data.data;
          dispatch(createTopicSuccess(payload));
          return Promise.reject(payload);
        }),
      )
      .catch(err => console.log('Error', err));
  };
}
