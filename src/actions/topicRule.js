const queryString = require('query-string');

// 获取专题规则
export const FETCH_TOPIC_RULE_REQUEST = 'FETCH_TOPIC_RULE_REQUEST';
export const FETCH_TOPIC_RULE_FAILURE = 'FETCH_TOPIC_RULE_FAILURE';
export const FETCH_TOPIC_RULE_SUCCESS = 'FETCH_TOPIC_RULE_SUCCESS';

function requestFetchTopicRule(topicRule) {
  return {
    type: FETCH_TOPIC_RULE_REQUEST,
    isFetching: true,
    topicRule,
  };
}

function fetchTopicRuleSuccess(topicRule) {
  return {
    type: FETCH_TOPIC_RULE_SUCCESS,
    isFetching: false,
    topicRule,
  };
}

function fetchTopicRuleError(message) {
  return {
    type: FETCH_TOPIC_RULE_FAILURE,
    isFetching: false,
    message,
  };
}

export function fetchTopicRule(creds) {
  return dispatch => {
    dispatch(requestFetchTopicRule(creds));
    return fetch(`/api/xuefeng/topic/findTopicNewRuleByTopicId/${creds.id}`, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
      .then(res =>
        res.json().then(data => {
          if (!res.ok) {
            dispatch(fetchTopicRuleError(data.message));
            return Promise.reject(data);
          }
          const payload = data.data;
          dispatch(fetchTopicRuleSuccess(payload));
          return Promise.resolve(payload);
        }),
      )
      .catch(err => console.log('Error', err));
  };
}

// 更新专题规则
export const UPDATE_TOPIC_RULE_REQUEST = 'UPDATE_TOPIC_RULE_REQUEST';
export const UPDATE_TOPIC_RULE_FAILURE = 'UPDATE_TOPIC_RULE_FAILURE';
export const UPDATE_TOPIC_RULE_SUCCESS = 'UPDATE_TOPIC_RULE_SUCCESS';

function requestUpdateTopicRule(topicRule) {
  return {
    type: UPDATE_TOPIC_RULE_REQUEST,
    isFetching: true,
    topicRule,
  };
}

function updateTopicRuleSuccess(topicRule) {
  return {
    type: UPDATE_TOPIC_RULE_SUCCESS,
    isFetching: false,
    topicRule,
  };
}

function updateTopicRuleError(message) {
  return {
    type: UPDATE_TOPIC_RULE_FAILURE,
    isFetching: false,
    message,
  };
}

export function updateTopicRule(creds) {
  return dispatch => {
    dispatch(requestUpdateTopicRule(creds));
    return fetch(`/api/xuefeng/topic/addAutoTopicRule`, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      method: 'POST',
      body: JSON.stringify(creds),
    })
      .then(res =>
        res.json().then(data => {
          if (!res.ok || data.code !== 200) {
            dispatch(updateTopicRuleError(data.message));
            return Promise.reject(data);
          }
          const payload = data.data;
          dispatch(updateTopicRuleSuccess(payload));
          return Promise.resolve(payload);
        }),
      )
      .catch(err => console.log('Error', err));
  };
}
