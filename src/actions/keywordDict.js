export const REQUEST_FETCH_KEYWORD_DICT = 'REQUEST_FETCH_KEYWORD_DICT';
export const FETCH_KEYWORD_DICT_FAILURE = 'FETCH_KEYWORD_DICT_FAILURE';
export const FETCH_KEYWORD_DICT_SUCCESS = 'FETCH_KEYWORD_DICT_SUCCESS';
export const REMOVE_ALL_KEYWORD_DICT = 'REMOVE_ALL_KEYWORD_DICT';

function requestFetchKeywordDict() {
  return {
    type: REQUEST_FETCH_KEYWORD_DICT,
    isFetching: true,
  };
}

function fetchKeywordDictError(message) {
  return {
    type: FETCH_KEYWORD_DICT_FAILURE,
    isFetching: false,
    message,
  };
}

function fetchKeywordDictSuccess(list) {
  return {
    type: FETCH_KEYWORD_DICT_SUCCESS,
    isFetching: false,
    list,
  };
}

function keywordToOtions(data, keys) {
  return keys.reduce((result, key) => {
    const keyword = JSON.parse(data[key]);
    result.push({
      label: key,
      value: keyword.map(k => k.id).join(','),
    });
    return result;
  }, []);
}

function keywordToMap(data) {
  return data.reduce((result, item) => {
    // const keyword = JSON.parse(data[key])
    const { id, cnname } = item;
    result[id] = {
      label: cnname,
      value: id + '',
    };
    return result;
  }, {});
}

function keywordToList(data) {
  let result = [];

  Object.values(data).forEach(keywordStr => {
    let keyword = JSON.parse(keywordStr);
    result = result.concat(keyword);
  });

  return result;
}

export function removeAllKeywordDict() {
  return {
    type: REMOVE_ALL_KEYWORD_DICT,
    isFetching: false,
  };
}

export function fetchKeywordDict(creds) {
  return dispatch => {
    dispatch(requestFetchKeywordDict());
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(creds),
    };

    if (creds.name) {
      return fetch(`/api/edit/proxy/post?url=cfp/kw/find/batch`, config)
        .then(res =>
          res.json().then(data => {
            if (!res.ok) {
              dispatch(fetchKeywordDictError(data.message));
              return Promise.reject(data);
            }

            dispatch(fetchKeywordDictSuccess(keywordToList(data)));
            return Promise.resolve(keywordToOtions(data, creds.name));
          }),
        )
        .catch(err => console.error('error', err));
    } else if (creds.data) {
      return fetch(`/api/edit/proxy/post?url=cfp/keyword/get/ids`, config)
        .then(res => res.json())
        .then(data => {
          if (!data) {
            dispatch(fetchKeywordDictError(data.message));
            return Promise.reject(data);
          }

          dispatch(fetchKeywordDictSuccess(data));
          return Promise.resolve(keywordToMap(data));
        });
    }
  };
}
