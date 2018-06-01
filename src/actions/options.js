const queryString = require('query-string');

export function fetchOptions(creds, paramType) {
  if (paramType === '6') {
    return fetch(
      `/api/edit/resouceUpload/searchProvider?assetType=1&${queryString.stringify(
        creds,
      )}`,
      {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
        },
      },
    ).then(res =>
      res.json().then(data => {
        if (!res.ok || data.code !== 200) {
          return Promise.reject(data);
        }
        return Promise.resolve(data.data);
      }),
    );
  }

  return fetch(`/api/edit/param/pageList?paramType=${paramType}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(creds),
  }).then(res =>
    res.json().then(data => {
      if (!res.ok || data.code !== 200) {
        return Promise.reject(data);
      }
      return Promise.resolve(Object.values(data.data)[0]);
    }),
  );
}
