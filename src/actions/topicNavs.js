const queryString = require('query-string');

// 查询专题导航
export const REQUEST_FETCH_TOPIC_NAVS = 'REQUEST_FETCH_TOPIC_NAVS';
export const FETCH_TOPIC_NAVS_FAILURE = 'FETCH_TOPIC_NAVS_FAILURE';
export const FETCH_TOPIC_NAVS_SUCCESS = 'FETCH_TOPIC_NAVS_SUCCESS';

function requestFetchTopicNavs(navLocation) {
  return {
    type: REQUEST_FETCH_TOPIC_NAVS,
    isFetching: true,
    navLocation,
  };
}

function fetchTopicNavsSuccess(navLocation, navs) {
  return {
    type: FETCH_TOPIC_NAVS_SUCCESS,
    isFetching: false,
    navLocation,
    navs,
  };
}

function fetchTopicNavsError(navLocation, message) {
  return {
    type: FETCH_TOPIC_NAVS_FAILURE,
    isFetching: false,
    navLocation,
    message,
  };
}

export function fetchTopicNavs(creds) {
  return dispatch => {
    dispatch(requestFetchTopicNavs(creds.navLocation));
    return fetch(
      `/api/sitecms/topicNavList/getEidtOrPreviewNavList?${queryString.stringify(
        creds,
      )}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify(creds),
      },
    ).then(res =>
      res.json().then(data => {
        if (!res.ok || data.code !== 200) {
          dispatch(
            fetchTopicNavsError(creds.navLocation, data.message || '查询失败'),
          );
          return Promise.reject(data.message);
        }
        dispatch(fetchTopicNavsSuccess(creds.navLocation, data.data || []));
        return Promise.resolve(data.message);
      }),
    );
  };
}

// 更新专题导航
export const REQUEST_UPDATE_TOPIC_NAV = 'REQUEST_UPDATE_TOPIC_NAV';
export const UPDATE_TOPIC_NAV_FAILURE = 'UPDATE_TOPIC_NAV_FAILURE';
export const UPDATE_TOPIC_NAV_SUCCESS = 'UPDATE_TOPIC_NAV_SUCCESS';

function requestCreateTopicNav() {
  return {
    type: REQUEST_UPDATE_TOPIC_NAV,
    isFetching: true,
  };
}

function createTopicNavSuccess(nav) {
  return {
    type: UPDATE_TOPIC_NAV_SUCCESS,
    isFetching: false,
    nav,
  };
}

function createTopicNavError(message) {
  return {
    type: UPDATE_TOPIC_NAV_FAILURE,
    isFetching: false,
    message,
  };
}

export function createTopicNav(creds, isAuto) {
  return dispatch => {
    dispatch(requestCreateTopicNav(creds));
    return fetch(
      `/api/sitecms/topicNavList/${
        isAuto
          ? `autoAddTopicNavList?${queryString.stringify(creds)}`
          : 'addTopicNavList'
      }`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        body: isAuto ? 'null' : JSON.stringify(creds),
      },
    ).then(res =>
      res.json().then(data => {
        if (!res.ok) {
          dispatch(createTopicNavError(data.message));
          return Promise.reject(data);
        }
        dispatch(createTopicNavSuccess(data.message));
        return Promise.resolve(data.message || '添加成功');
      }),
    );
  };
}
// 删除专题导航
export const REQUEST_DELETE_TOPIC_NAV = 'REQUEST_DELETE_TOPIC_NAV';
export const DELETE_TOPIC_NAV_FAILURE = 'DELETE_TOPIC_NAV_FAILURE';
export const DELETE_TOPIC_NAV_SUCCESS = 'DELETE_TOPIC_NAV_SUCCESS';

function requestDeleteTopicNav() {
  return {
    type: REQUEST_DELETE_TOPIC_NAV,
    isFetching: true,
  };
}

function deleteTopicNavSuccess(nav) {
  return {
    type: DELETE_TOPIC_NAV_SUCCESS,
    isFetching: false,
    nav,
  };
}

function deleteTopicNavError(message) {
  return {
    type: DELETE_TOPIC_NAV_FAILURE,
    isFetching: false,
    message,
  };
}

export function deleteTopicNav(creds) {
  return dispatch => {
    dispatch(requestDeleteTopicNav(creds));
    return fetch(`/api/sitecms/topicNavList/preRemoveNav/${creds.navId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    }).then(res =>
      res.json().then(data => {
        if (!res.ok || data.code !== 200) {
          dispatch(deleteTopicNavError(data.message));
          return Promise.reject(data);
        }
        dispatch(deleteTopicNavSuccess(data.message));
        return Promise.resolve(data.message || '删除成功');
      }),
    );
  };
}

export const ACTIVE_TOPIC_NAV = 'ACTIVE_TOPIC_NAV';
// 修改专题导航
export function activeTopicNav(navId) {
  return {
    type: ACTIVE_TOPIC_NAV,
    navId,
  };
}
