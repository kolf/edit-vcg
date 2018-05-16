export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds,
  };
}

export function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token,
  };
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message,
  };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true,
  };
}

function getTGT(creds) {
  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    credentials: 'include',
    body: JSON.stringify(creds),
  };

  return dispatch => {
    return fetch('/api/passport/vcglogin/access', config)
      .then(res =>
        res.json().then(data => {
          if (data.status !== '200') {
            return Promise.reject(data);
          }
          return Promise.resolve(data);
        }),
      )
      .catch(err => console.error('Error: ', err));
  };
}

function TGTLogin(creds) {
  const config = {
    headers: { 'Content-Type': 'application/json;charset=UTF-8' },
    credentials: 'include',
  };

  return dispatch => {
    return fetch(`/api/edit/user/viewByToken?token=${creds.token}`, config)
      .then(res => {
        return res.json().then(data => {
          if (data.code !== 200) {
            dispatch(loginError(data.message));
            return Promise.reject(data);
          }

          const user = {
            userName: data.data.name,
            id_token: creds.token,
          };
          localStorage.setItem('id_token', user.id_token);
          dispatch(receiveLogin(user));
          return Promise.resolve(user);
        });
      })
      .catch(err => console.error('Error: ', err));
  };
}

export function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false,
  };
}

// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem('id_token');
    document.cookie = 'id_token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    dispatch(receiveLogout());
  };
}

export function loginUser(creds) {
  return dispatch => {
    if (creds.token) {
      dispatch(requestLogin(creds));
      return dispatch(TGTLogin(creds));
    } else {
      dispatch(requestLogin(creds));
      return dispatch(getTGT(creds))
        .then(data => {
          dispatch(
            TGTLogin({
              token: data.TGT,
            }),
          );
        })
        .catch(err => dispatch(loginError(err)));
    }
  };
}
