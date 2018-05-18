const queryString = require('query-string');

// 获取专题规则
export const FETCH_TOPIC_SETTING_REQUEST = 'FETCH_TOPIC_SETTING_REQUEST';
export const FETCH_TOPIC_SETTING_FAILURE = 'FETCH_TOPIC_SETTING_FAILURE';
export const FETCH_TOPIC_SETTING_SUCCESS = 'FETCH_TOPIC_SETTING_SUCCESS';

function requestFetchTopicSetting(topicSetting) {
  return {
    type: FETCH_TOPIC_SETTING_REQUEST,
    isFetching: true,
    topicSetting,
  };
}

function fetchTopicSettingSuccess(topicSetting) {
  return {
    type: FETCH_TOPIC_SETTING_SUCCESS,
    isFetching: false,
    topicSetting,
  };
}

function fetchTopicSettingError(message) {
  return {
    type: FETCH_TOPIC_SETTING_FAILURE,
    isFetching: false,
    message,
  };
}

export function fetchTopicSetting(creds) {
  return dispatch => {
    dispatch(requestFetchTopicSetting(creds));
    return fetch(`/api/xuefeng/topic/findTopicNewRuleByTopicId/${creds.id}`, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
      .then(res =>
        res.json().then(data => {
          if (!res.ok) {
            dispatch(fetchTopicSettingError(data.message));
            return Promise.reject(data);
          }
          const payload = data.data;
          dispatch(fetchTopicSettingSuccess(payload));
          return Promise.resolve(payload);
        }),
      )
      .catch(err => console.log('Error', err));
  };
}

// 更新专题规则
export const UPDATE_TOPIC_SETTING_REQUEST = 'UPDATE_TOPIC_SETTING_REQUEST';
export const UPDATE_TOPIC_SETTING_FAILURE = 'UPDATE_TOPIC_SETTING_FAILURE';
export const UPDATE_TOPIC_SETTING_SUCCESS = 'UPDATE_TOPIC_SETTING_SUCCESS';

function requestUpdateTopicSetting(topicSetting) {
  return {
    type: UPDATE_TOPIC_SETTING_REQUEST,
    isFetching: true,
    topicSetting,
  };
}

function updateTopicSettingSuccess(topicSetting) {
  return {
    type: UPDATE_TOPIC_SETTING_SUCCESS,
    isFetching: false,
    topicSetting,
  };
}

function updateTopicSettingError(message) {
  return {
    type: UPDATE_TOPIC_SETTING_FAILURE,
    isFetching: false,
    message,
  };
}

export function updateTopicSetting(creds) {
  return dispatch => {
    dispatch(requestUpdateTopicSetting(creds));
    return fetch(`/api/xuefeng/topic/addAutoTopicRule`, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      method: 'POST',
      body: JSON.stringify(creds),
    })
      .then(res =>
        res.json().then(data => {
          if (!res.ok) {
            dispatch(updateTopicSettingError(data.message));
            return Promise.reject(data);
          }
          const payload = data.data;
          dispatch(updateTopicSettingSuccess(payload));
          return Promise.resolve(payload);
        }),
      )
      .catch(err => console.log('Error', err));
  };
}
