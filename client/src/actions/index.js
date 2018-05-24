import axios from 'axios';
axios.defaults.withCredentials = true;

export const AUTH_USER_AUTHENTICATED = 'AUTH_USER_AUTHENTICATED';
export const AUTH_USER_UNAUTHENTICATED = 'AUTH_USER_UNAUTHENTICATED';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_CHECK = 'AUTH_CHECK';
export const AUTH_ERROR_RESET = 'AUTH_ERROR_RESET';

// signup
export const AUTH_SIGNUP_START = 'AUTH_SIGNUP_START';
export const AUTH_SIGNUP_SUCCESS = 'AUTH_SIGNUP_SUCCESS';
export const AUTH_SIGNUP_ERROR = 'AUTH_SIGNUP_ERROR';
export const AUTH_SIGNUP_FINISH = 'AUTH_SIGNUP_FINISH';

// login
export const AUTH_LOGIN_START = 'AUTH_LOGIN_START';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_ERROR = 'AUTH_LOGIN_ERROR';
export const AUTH_LOGIN_FINISH = 'AUTH_LOGIN_FINISH';

// logout
export const AUTH_LOGOUT_START = 'AUTH_LOGOUT_START';
export const AUTH_LOGOUT_SUCCESS = 'AUTH_LOGOUT_SUCCESS';
export const AUTH_LOGOUT_ERROR = 'AUTH_LOGOUT_ERROR';
export const AUTH_LOGOUT_FINISH = 'AUTH_LOGOUT_FINISH';

const ROOT = 'http://127.0.0.1:5555/api';

export const resetErrors = _ => {
  return dispatch => {
    dispatch({ type: AUTH_ERROR_RESET });
  };
};

export const authenticateUser = _ => {
  return dispatch => {
    dispatch({ type: AUTH_LOGIN_START });
    axios
      .get(`${ROOT}/users/validate`, {
        headers: { authorization: localStorage.getItem() },
      })
      .then(({ data }) => {
        dispatch({ type: AUTH_LOGIN_SUCCESS, payload: data.email });
        dispatch({ type: AUTH_LOGIN_FINISH });
      })
      .catch(err => {
        dispatch({ type: AUTH_LOGIN_ERROR, payload: err.response.data.error });
        dispatch({ type: AUTH_LOGIN_FINISH });
      });
  };
};

export const register = (
  email,
  password,
  confirmPassword,
  firstName,
  lastName,
  history,
) => {
  return dispatch => {
    dispatch({ type: AUTH_SIGNUP_START });

    // if (!email || !password || !confirmPassword || !firstName || !lastName) {
    //   dispatch({
    //     type: AUTH_SIGNUP_ERROR,
    //     payload: 'Please provide all fields',
    //   });
    //   dispatch({ type: AUTH_SIGNUP_FINISH });
    //   return;
    // }

    // if (password !== confirmPassword) {
    //   dispatch({ type: AUTH_SIGNUP_ERROR, payload: 'Passwords do not match' });
    //   dispatch({ type: AUTH_SIGNUP_FINISH });
    //   return;
    // }

    axios
      .post(`${ROOT}/users`, { email, password, firstName, lastName })
      .then(({ data }) => {
        dispatch({ type: AUTH_SIGNUP_SUCCESS, payload: data.email });
        dispatch({ type: AUTH_LOGIN_START });
        axios
          .post(`${ROOT}/users/login`, { email, password })
          .then(({ data }) => {
            // console.log(cookies.getAll());
            // localStorage.setItem(data.token);
            dispatch({ type: AUTH_LOGIN_SUCCESS, payload: email });
            dispatch({ type: AUTH_LOGIN_FINISH });
            dispatch({ type: AUTH_SIGNUP_FINISH });
            history.push('/');
          })
          .catch(err => {
            console.log(err);
            dispatch({
              type: AUTH_LOGIN_ERROR,
              payload: err.response.data.message,
            });
            dispatch({ type: AUTH_LOGIN_FINISH });
            dispatch({ type: AUTH_SIGNUP_ERROR });
            dispatch({ type: AUTH_SIGNUP_FINISH });
          });
      })
      .catch(err => {
        dispatch({
          type: AUTH_SIGNUP_ERROR,
          payload: err.response.data.message,
        });
        dispatch({ type: AUTH_SIGNUP_FINISH });
      });
  };
};

export const login = (email, password, history) => {
  return dispatch => {
    dispatch({ type: AUTH_LOGIN_START });

    axios
      .post(`${ROOT}/users/login`, { email, password })
      .then(({ data }) => {
        dispatch({ type: AUTH_ERROR_RESET });
        localStorage.setItem('token', data.token);
        dispatch({ type: AUTH_LOGIN_SUCCESS, payload: email });
        dispatch({ type: AUTH_LOGIN_FINISH });
        history.push('/');
      })
      .catch(err => {
        dispatch({
          type: AUTH_LOGIN_ERROR,
          payload: err.response.data.message,
        });
        dispatch({ type: AUTH_LOGIN_FINISH });
      });
  };
};

export const logout = history => {
  return dispatch => {
    dispatch({ type: AUTH_LOGOUT_START });

    axios
      .get(`${ROOT}/users/logout`)
      .then(response => console.log(response))
      .catch(err => console.log(err));

    // localStorage.removeItem();
    dispatch({ type: AUTH_LOGOUT_SUCCESS });

    dispatch({ type: AUTH_LOGOUT_FINISH });

    // history.push('/login');
  };
};

export const getAllUsers = _ => {
  return dispatch => {
    axios
      .get(`${ROOT}/users/all`)
      .then(response => {
        console.log(response);
      })
      .catch(err => console.log(err));
  };
};

export const getInfo = _ => {
  return dispatch => {
    axios
      .get(`${ROOT}/users/info`)
      .then(response => console.log(response))
      .catch(err => console.log(err));
  };
};