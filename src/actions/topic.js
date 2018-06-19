const queryString = require('query-string');

// 创建
export const REQUEST_CREATE_TOPIC = 'REQUEST_CREATE_TOPIC';
export const CREATE_TOPIC_FAILURE = 'CREATE_TOPIC_FAILURE';
export const CREATE_TOPIC_SUCCESS = 'CREATE_TOPIC_SUCCESS';

function requestCreateTopic(topic) {
  return {
    type: REQUEST_CREATE_TOPIC,
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

// 更新
export const REQUEST_UPDATE_TOPIC = 'REQUEST_UPDATE_TOPIC';
export const UPDATE_TOPIC_FAILURE = 'UPDATE_TOPIC_FAILURE';
export const UPDATE_TOPIC_SUCCESS = 'UPDATE_TOPIC_SUCCESS';

function requestUpdateTopic(topic) {
  return {
    type: REQUEST_UPDATE_TOPIC,
    isFetching: true,
    topic,
  };
}

function updateTopicSuccess(topic) {
  return {
    type: UPDATE_TOPIC_SUCCESS,
    isFetching: false,
    topic,
  };
}

function updateTopicError(message) {
  return {
    type: UPDATE_TOPIC_FAILURE,
    isFetching: false,
    message,
  };
}

// 获取
export const REQUEST_FETCH_TOPIC = 'REQUEST_FETCH_TOPIC';
export const FETCH_TOPIC_FAILURE = 'FETCH_TOPIC_FAILURE';
export const FETCH_TOPIC_SUCCESS = 'FETCH_TOPIC_SUCCESS';

function requestFetchTopic(topic) {
  return {
    type: REQUEST_FETCH_TOPIC,
    isFetching: true,
    topic,
  };
}

function fetchTopicSuccess(topic) {
  return {
    type: FETCH_TOPIC_SUCCESS,
    isFetching: false,
    topic,
  };
}

function fetchTopicError(message) {
  return {
    type: FETCH_TOPIC_FAILURE,
    isFetching: false,
    message,
  };
}

// 设置专题
export const SET_TOPIC = 'SET_TOPIC';
export function setTopic(topic) {
  return {
    type: SET_TOPIC,
    topic,
  };
}

// 创建专题
export function createTopic(creds) {
  return dispatch => {
    dispatch(requestCreateTopic(creds));
    return fetch(
      `/api/sitecms/topic/addTopic?token=${localStorage.getItem(
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
          dispatch(createTopicSuccess(data.data));
          return Promise.resolve(data.message);
        }),
      )
      .catch(err => console.log('Error', err));
  };
}

// 停用专题
export function stopTopic(creds) {
  return dispatch => {
    dispatch(requestUpdateTopic(creds));
    return fetch(`/api/sitecms/topic/grabingStop/${creds.id}`, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
      .then(res =>
        res.json().then(data => {
          if (!res.ok) {
            dispatch(updateTopicError(data.message));
            return Promise.reject(data);
          }

          dispatch(updateTopicSuccess(data.data));
          return Promise.resolve(data.message);
        }),
      )
      .catch(err => console.log('Error', err));
  };
}

// 下线专题
export function offlineTopic(creds) {
  return dispatch => {
    dispatch(requestUpdateTopic(creds));
    return fetch(`/api/sitecms/topic/offLineTopic/${creds.id}`, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
      .then(res =>
        res.json().then(data => {
          if (!res.ok) {
            dispatch(updateTopicError(data.message));
            return Promise.reject(data);
          }

          dispatch(updateTopicSuccess(data.data));
          return Promise.resolve(data.message);
        }),
      )
      .catch(err => console.log('Error', err));
  };
}

// 发布专题
export function publishTopic(creds) {
  return dispatch => {
    dispatch(requestUpdateTopic(creds));
    return fetch(`/api/sitecms/topicPageSet/getPageSet/${creds.id}`, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      method: 'POST',
    })
      .then(res =>
        res.json().then(data => {
          if (!res.ok || data.code !== 200) {
            dispatch(updateTopicError(data.message));
            return Promise.reject(data);
          }
          dispatch(updateTopicSuccess(data.data));
          return Promise.resolve(data.message);
        }),
      )
      .catch(err => console.log('Error', err));
  };
}

// 获取专题
export function fetchTopic(creds) {
  return dispatch => {
    dispatch(requestFetchTopic(creds));
    return fetch(`/api/sitecms/topic/getTopicById/${creds.id}`, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
      .then(res =>
        res.json().then(data => {
          if (!res.ok) {
            dispatch(fetchTopicError(data.message));
            return Promise.reject(data);
          }
          dispatch(fetchTopicSuccess(data.data));
          return Promise.resolve(data.message);
        }),
      )
      .catch(err => console.log('Error', err));
  };
}

// 删除专题banner
export function deteleTopicBanner(creds) {
  return fetch(`/api/sitecms/topicPageSet/deleteBannerImage/${creds.topicId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  })
    .then(res =>
      res.json().then(data => {
        if (!res.ok || data.code !== 200) {
          return Promise.reject(data);
        }
        return Promise.resolve(data.message);
      }),
    )
    .catch(err => console.log('Error', err));
}

// 查询专题下的组照
export const REQUEST_FETCH_TOPIC_IMAGES = 'REQUEST_FETCH_TOPIC_IMAGES';
export const FETCH_TOPIC_IMAGES_FAILURE = 'FETCH_TOPIC_IMAGES_FAILURE';
export const FETCH_TOPIC_IMAGES_SUCCESS = 'FETCH_TOPIC_IMAGES_SUCCESS';

function requestFetchTopicImages(images) {
  return {
    type: REQUEST_FETCH_TOPIC_IMAGES,
    isFetching: true,
    images,
  };
}

function fetchTopicImagesSuccess({ list, total }) {
  return {
    type: FETCH_TOPIC_IMAGES_SUCCESS,
    isFetching: false,
    list,
    total,
  };
}

function fetchTopicImagesError(message) {
  return {
    type: FETCH_TOPIC_IMAGES_FAILURE,
    isFetching: false,
    message,
  };
}

export function fetchTopicImages(creds) {
  return dispatch => {
    dispatch(requestFetchTopicImages(creds));
    return fetch(
      `/api/edit/group/pageList?token=${localStorage.getItem('id_token')}`,
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
            dispatch(fetchTopicImagesError(data.message));
            return Promise.reject(data);
          }
          dispatch(fetchTopicImagesSuccess(data.data));
          return Promise.resolve(data.message);
        }),
      )
      .catch(err => console.log('Error', err));
  };
}

// 获取专题页面展示
export const REQUEST_FETCH_TOPIC_SETTING = 'REQUEST_FETCH_TOPIC_SETTING';
export const FETCH_TOPIC_SETTING_FAILURE = 'FETCH_TOPIC_SETTING_FAILURE';
export const FETCH_TOPIC_SETTING_SUCCESS = 'FETCH_TOPIC_SETTING_SUCCESS';

function requestFetchTopicSetting() {
  return {
    type: REQUEST_FETCH_TOPIC_SETTING,
    isFetching: true,
  };
}

function fetchTopicSettingSuccess(message) {
  return {
    type: FETCH_TOPIC_SETTING_SUCCESS,
    isFetching: false,
    message,
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
    return fetch(`/api/sitecms/topicPageSet/getPageSetdetailInfo/${creds.id}`, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
      .then(res =>
        res.json().then(data => {
          if (!res.ok || data.code !== 200) {
            dispatch(fetchTopicSettingError(data.message));
            return Promise.reject(data);
          }
          dispatch(fetchTopicSettingSuccess(data.data));
          return Promise.resolve(data.message);
        }),
      )
      .catch(err => console.log('Error', err));
  };
}
