const queryString = require('query-string')

export const REQUEST_FETCH_AUTO_GROUPS = 'REQUEST_FETCH_AUTO_GROUPS'
export const FETCH_AUTO_GROUPS_FAILURE = 'FETCH_AUTO_GROUPS_FAILURE'
export const FETCH_AUTO_GROUPS_SUCCESS = 'FETCH_AUTO_GROUPS_SUCCESS'

function requestFetchAutoGroups (creds) {
  return {
    type: REQUEST_FETCH_AUTO_GROUPS,
    isFetching: true,
    creds
  }
}

function fetchAutoGroupsError (message) {
  return {
    type: FETCH_AUTO_GROUPS_FAILURE,
    isFetching: false,
    message
  }
}

function fetchAutoGroupsSuccess (payload) {
  return {
    type: FETCH_AUTO_GROUPS_SUCCESS,
    isFetching: false,
    payload
  }
}

export function fetchAutoGroups (
  creds = {
    pageNum: 1,
    pageSize: 60
  }
) {
  return dispatch => {
    dispatch(requestFetchAutoGroups(creds))
    return fetch(
      `/api/xuefeng/autoGroup/autoGroupPageList?token=${localStorage.getItem('id_token')}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(creds)
      }
    )
      .then(res =>
        res.json().then(data => {
          if (!res.ok || data.code !== 200) {
            dispatch(fetchAutoGroupsError(data.message))
            return Promise.reject(data)
          }
          const payload = data.data
          dispatch(fetchAutoGroupsSuccess(payload))
          return Promise.resolve(payload)
        })
      )
      .catch(err => console.error(err))
  }
}
