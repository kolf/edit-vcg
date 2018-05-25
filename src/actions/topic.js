const queryString = require('query-string')

export const REQUEST_CREATE_TOPIC = 'REQUEST_CREATE_TOPIC'
export const CREATE_TOPIC_FAILURE = 'CREATE_TOPIC_FAILURE'
export const CREATE_TOPIC_SUCCESS = 'CREATE_TOPIC_SUCCESS'

function requestCreateTopic (topic) {
  return {
    type: REQUEST_CREATE_TOPIC,
    isFetching: true,
    topic
  }
}

function createTopicSuccess (topic) {
  return {
    type: CREATE_TOPIC_SUCCESS,
    isFetching: false,
    topic
  }
}

function createTopicError (message) {
  return {
    type: CREATE_TOPIC_FAILURE,
    isFetching: false,
    message
  }
}

export function createTopic (creds) {
  return dispatch => {
    dispatch(requestCreateTopic(creds))
    return fetch(
      `/api/xuefeng/topic/addTopic?token=${localStorage.getItem('id_token')}&${queryString.stringify(creds)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    )
      .then(res =>
        res.json().then(data => {
          if (!res.ok) {
            dispatch(createTopicError(data.message))
            return Promise.reject(data)
          }
          dispatch(createTopicSuccess(data))
          return Promise.resolve(data)
        })
      )
      .catch(err => console.log('Error', err))
  }
}

// 停止专题
export const REQUEST_STOP_TOPIC = 'REQUEST_STOP_TOPIC'
export const STOP_TOPIC_FAILURE = 'STOP_TOPIC_FAILURE'
export const STOP_TOPIC_SUCCESS = 'STOP_TOPIC_SUCCESS'

function requestStopTopic (topic) {
  return {
    type: REQUEST_STOP_TOPIC,
    isFetching: true,
    topic
  }
}

function stopTopicSuccess (topic) {
  return {
    type: STOP_TOPIC_SUCCESS,
    isFetching: false,
    topic
  }
}

function stopTopicError (message) {
  return {
    type: STOP_TOPIC_FAILURE,
    isFetching: false,
    message
  }
}

export function stopTopic (creds) {
  return dispatch => {
    dispatch(requestStopTopic(creds))
    return fetch(`/api/xuefeng/topic/grabingStop/${creds.id}`, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
      .then(res =>
        res.json().then(data => {
          console.log(res, data)
          if (!res.ok) {
            dispatch(stopTopicError(data.message))
            return Promise.reject(data)
          }

          dispatch(stopTopicSuccess(data))
          return Promise.resolve(data)
        })
      )
      .catch(err => console.log('Error', err))
  }
}

// 下线专题
export const REQUEST_OFFLINE_TOPIC = 'REQUEST_OFFLINE_TOPIC'
export const OFFLINE_TOPIC_FAILURE = 'OFFLINE_TOPIC_FAILURE'
export const OFFLINE_TOPIC_SUCCESS = 'OFFLINE_TOPIC_SUCCESS'

function requestOfflineTopic (topic) {
  return {
    type: REQUEST_OFFLINE_TOPIC,
    isFetching: true,
    topic
  }
}

function offlineTopicSuccess (topic) {
  return {
    type: OFFLINE_TOPIC_SUCCESS,
    isFetching: false,
    topic
  }
}

function offlineTopicError (message) {
  return {
    type: OFFLINE_TOPIC_FAILURE,
    isFetching: false,
    message
  }
}

export function offlineTopic (creds) {
  return dispatch => {
    dispatch(requestOfflineTopic(creds))
    return fetch(`/api/xuefeng/topic/offLineTopic/${creds.id}`, {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    })
      .then(res =>
        res.json().then(data => {
          if (!res.ok) {
            dispatch(offlineTopicError(data.message))
            return Promise.reject(data)
          }

          dispatch(offlineTopicSuccess(data))
          return Promise.resolve(data.message)
        })
      )
      .catch(err => console.log('Error', err))
  }
}
