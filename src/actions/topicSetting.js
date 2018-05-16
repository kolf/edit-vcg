const queryString = require('query-string');

export const TOPIC_SETTING_REQUEST = 'TOPIC_SETTING_REQUEST';
export const TOPIC_SETTING_FAILURE = 'TOPIC_SETTING_FAILURE';
export const TOPIC_SETTING_SUCCESS = 'TOPIC_SETTING_SUCCESS';

function requestSettingTopic(topic) {
  return {
    type: TOPIC_SETTING_REQUEST,
    isFetching: true,
    topic,
  };
}

function settingTopicSuccess(topic) {
  return {
    type: TOPIC_SETTING_SUCCESS,
    isFetching: false,
    topic,
  };
}

function settingTopicError(message) {
  return {
    type: TOPIC_SETTING_FAILURE,
    isFetching: false,
    message,
  };
}

export function topicSetting(creds) {
  return dispatch => {
    dispatch(requestSettingTopic(creds));
    return fetch(`/api/xuefeng/topic/findTopicNewRuleByTopicId/${creds.id}`, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
      .then(res =>
        res.json().then(data => {
          if (!res.ok) {
            dispatch(settingTopicError(data.message));
            return Promise.reject(data);
          }
          const payload = data.data;
          dispatch(settingTopicSuccess(payload));
          return Promise.reject(payload);
        }),
      )
      .catch(err => console.log('Error', err));
  };
}
