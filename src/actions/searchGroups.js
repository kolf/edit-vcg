const queryString = require('query-string');

// 查询组照
export const REQUEST_FETCH_SEARCH_GROUPS = 'REQUEST_FETCH_SEARCH_GROUPS';
export const FETCH_SEARCH_GROUPS_FAILURE = 'FETCH_SEARCH_GROUPS_FAILURE';
export const FETCH_SEARCH_GROUPS_SUCCESS = 'FETCH_SEARCH_GROUPS_SUCCESS';

function requestFetchSearchGroups(creds) {
  return {
    type: REQUEST_FETCH_SEARCH_GROUPS,
    isFetching: true,
    creds,
  };
}

function fetchSearchGroupsSuccess(list) {
  return {
    type: FETCH_SEARCH_GROUPS_SUCCESS,
    isFetching: false,
    list,
  };
}

function fetchSearchGroupsError(message) {
  return {
    type: FETCH_SEARCH_GROUPS_FAILURE,
    isFetching: false,
    message,
  };
}

// 更新筛选项
export const REQUEST_UPDATE_GROUP_SEARCH = 'REQUEST_UPDATE_GROUP_SEARCH';
export const UPDATE_GROUP_SEARCH_FAILURE = 'UPDATE_GROUP_SEARCH_FAILURE';
export const UPDATE_GROUP_SEARCH_SUCCESS = 'UPDATE_GROUP_SEARCH_SUCCESS';

function requestUpdateGroupSearch() {
  return {
    type: REQUEST_UPDATE_GROUP_SEARCH,
    isFetching: true,
  };
}

function updateGroupSearchSuccess(groupSearch, groupId) {
  return {
    type: UPDATE_GROUP_SEARCH_SUCCESS,
    isFetching: false,
    groupSearch,
    groupId,
  };
}

function updateGroupSearchError(message) {
  return {
    type: UPDATE_GROUP_SEARCH_FAILURE,
    isFetching: false,
    message,
  };
}

// 删除筛选项
export const REQUEST_DELETE_GROUP_SEARCH = 'REQUEST_DELETE_GROUP_SEARCH';
export const DELETE_GROUP_SEARCH_FAILURE = 'DELETE_GROUP_SEARCH_FAILURE';
export const DELETE_GROUP_SEARCH_SUCCESS = 'DELETE_GROUP_SEARCH_SUCCESS';

function requestDeleteGroupSearch() {
  return {
    type: REQUEST_DELETE_GROUP_SEARCH,
    isFetching: true,
  };
}

function deleteGroupSearchSuccess(groupSearch, groupId) {
  return {
    type: DELETE_GROUP_SEARCH_SUCCESS,
    isFetching: false,
    groupSearch,
    groupId: groupId * 1,
  };
}

function deleteGroupSearchError(message) {
  return {
    type: DELETE_GROUP_SEARCH_FAILURE,
    isFetching: false,
    message,
  };
}

export function setSearchGroups(list) {
  return dispatch => {
    dispatch(fetchSearchGroupsSuccess(list));
  };
}

// 查询组照
export function fetchSearchGroups(groupIds) {
  return dispatch => {
    dispatch(requestFetchSearchGroups(groupIds));
    return fetch(
      `/api/sitecms/searchItem4ResGroup/list?token=${localStorage.getItem(
        'id_token',
      )}&groupIds=${groupIds}`,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        method: 'POST',
      },
    )
      .then(res => res.json())
      .then(data => {
        if (data.code !== 200) {
          dispatch(fetchSearchGroupsError(data.message));
          return Promise.reject(data.message);
        }
        dispatch(fetchSearchGroupsSuccess(data.data));
        return Promise.resolve(data.data);
      })
      .catch(err =>
        dispatch(fetchSearchGroupsError('服务器出错，请稍候再试~')),
      );
  };
}
// 发布筛选
export function publishSearchGroups(creds) {
  return fetch(
    `/api/sitecms/searchItem4ResGroup/save?token=${localStorage.getItem('id_token')}`,
    {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      method: 'POST',
      body: JSON.stringify(creds),
    },
  )
    .then(res => res.json())
    .then(data => {
      if (data.code !== 200) {
        return Promise.reject(data.message);
      }
      return Promise.resolve(data.data);
    });
}

// 添加筛选
export function postSearch(creds, groupId) {
  return dispatch => {
    dispatch(requestUpdateGroupSearch(creds));
    return fetch(
      `/api/sitecms/searchItem4ResGroup/${
        creds.id ? 'update/' + creds.id : 'create'
      }?token=${localStorage.getItem('id_token')}`,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
        method: 'POST',
        body: JSON.stringify(creds),
      },
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.code !== 200) {
          dispatch(updateGroupSearchError(data.message));
          return Promise.reject(data.message);
        }
        const gruopSearch = data.data || creds;

        dispatch(updateGroupSearchSuccess(gruopSearch, groupId));
        return Promise.resolve(gruopSearch);
      });
  };
}

// 删除筛选
export function deleteSearch(groupSearch, groupId) {
  return dispatch => {
    dispatch(requestDeleteGroupSearch());
    const timer = setTimeout(() => {
      clearTimeout(timer);
      dispatch(deleteGroupSearchSuccess(groupSearch, groupId));
    }, 30);
  };
}
