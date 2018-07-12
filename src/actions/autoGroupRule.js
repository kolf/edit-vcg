const queryString = require('query-string');

// 获取专题规则
export const REQUEST_FETCH_AUTO_GROUP_RULE = 'REQUEST_FETCH_AUTO_GROUP_RULE';
export const FETCH_AUTO_GROUP_RULE_FAILURE = 'FETCH_AUTO_GROUP_RULE_FAILURE';
export const FETCH_AUTO_GROUP_RULE_SUCCESS = 'FETCH_AUTO_GROUP_RULE_SUCCESS';

function requestFetchAutoGroupRule(autoGroupRule) {
  return {
    type: REQUEST_FETCH_AUTO_GROUP_RULE,
    isFetching: true,
    autoGroupRule,
  };
}

function fetchAutoGroupRuleSuccess(autoGroupRule) {
  return {
    type: FETCH_AUTO_GROUP_RULE_SUCCESS,
    isFetching: false,
    autoGroupRule,
  };
}

function fetchAutoGroupRuleError(message) {
  return {
    type: FETCH_AUTO_GROUP_RULE_FAILURE,
    isFetching: false,
    message,
  };
}

export function fetchAutoGroupRule(creds) {
  return dispatch => {
    dispatch(requestFetchAutoGroupRule(creds));
    return fetch(
      `/api/sitecms/autoGroup/findTopicNewGroupRuleByTopicId/${creds.id}`,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      },
    )
      .then(res =>
        res.json().then(data => {
          if (!res.ok) {
            dispatch(fetchAutoGroupRuleError(data.message));
            return Promise.reject(data);
          }
          const payload = data.data;
          dispatch(fetchAutoGroupRuleSuccess(payload));
          return Promise.resolve(payload);
        }),
      )
      .catch(err => console.log('Error', err));
  };
}

// 更新专题规则
export const UPDATE_AUTO_GROUP_RULE_REQUEST = 'UPDATE_AUTO_GROUP_RULE_REQUEST';
export const UPDATE_AUTO_GROUP_RULE_FAILURE = 'UPDATE_AUTO_GROUP_RULE_FAILURE';
export const UPDATE_AUTO_GROUP_RULE_SUCCESS = 'UPDATE_AUTO_GROUP_RULE_SUCCESS';

function requestUpdateAutoGroupRule(autoGroupRule) {
  return {
    type: UPDATE_AUTO_GROUP_RULE_REQUEST,
    isFetching: true,
    autoGroupRule,
  };
}

function updateAutoGroupRuleSuccess(autoGroupRule) {
  return {
    type: UPDATE_AUTO_GROUP_RULE_SUCCESS,
    isFetching: false,
    autoGroupRule,
  };
}

function updateAutoGroupRuleError(message) {
  return {
    type: UPDATE_AUTO_GROUP_RULE_FAILURE,
    isFetching: false,
    message,
  };
}

export function updateAutoGroupRule(creds) {
  return dispatch => {
    dispatch(requestUpdateAutoGroupRule(creds));
    return fetch(`/api/sitecms/autoGroup/addAutoGroupRule`, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      method: 'POST',
      body: JSON.stringify(creds),
    })
      .then(res =>
        res.json().then(data => {
          if (!res.ok || data.code !== 200) {
            dispatch(updateAutoGroupRuleError(data.message));
            return Promise.reject(data);
          }
          const payload = data.data;
          dispatch(updateAutoGroupRuleSuccess(payload));
          return Promise.resolve(payload);
        }),
      )
      .catch(err => console.log('Error', err));
  };
}

// 结束组规则
export const REQUEST_STOP_AUTO_GROUP_RULE = 'REQUEST_STOP_AUTO_GROUP_RULE';
export const STOP_AUTO_GROUP_RULE_FAILURE = 'STOP_AUTO_GROUP_RULE_FAILURE';
export const STOP_AUTO_GROUP_RULE_SUCCESS = 'STOP_AUTO_GROUP_RULE_SUCCESS';

function requestStopAutoGroupRule(topic) {
  return {
    type: REQUEST_STOP_AUTO_GROUP_RULE,
    isFetching: true,
    topic,
  };
}

function stopAutoGroupRuleSuccess(message) {
  return {
    type: STOP_AUTO_GROUP_RULE_SUCCESS,
    isFetching: false,
    message,
  };
}

function stopAutoGroupRuleError(message) {
  return {
    type: STOP_AUTO_GROUP_RULE_FAILURE,
    isFetching: false,
    message,
  };
}

export function stopAutoGroupRule(creds) {
  return dispatch => {
    dispatch(requestStopAutoGroupRule(creds));
    return fetch(`/api/sitecms/autoGroup/grabingStop/${creds.id}`, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
      .then(res =>
        res.json().then(data => {
          console.log(res, data);
          if (!res.ok) {
            dispatch(stopAutoGroupRuleError(data.message));
            return Promise.reject(data);
          }

          dispatch(stopAutoGroupRuleSuccess(data.message));
          return Promise.resolve(data.message);
        }),
      )
      .catch(err => console.log('Error', err));
  };
}
