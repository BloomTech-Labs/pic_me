import axios from 'axios';
// import * as types from '../constants/ActionTypes';

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

export const resetErrors = _ => {
    return dispatch => {
      dispatch({ type: AUTH_ERROR_RESET });
    };
  };

export const register = (username, password, confirmPassword, history) => {
    return dispatch => {
      dispatch({ types: AUTH_SIGNUP_START });
  
      if (!username || !password || !confirmPassword) {
        dispatch({
          types: AUTH_SIGNUP_ERROR,
          payload: 'Please provide all fields',
        });
  
        dispatch({ types: AUTH_SIGNUP_FINISH });
        return;
      }
  
      if (password !== confirmPassword) {
        dispatch({ types: AUTH_SIGNUP_ERROR, payload: 'Passwords do not match' });
  
        dispatch({ types: AUTH_SIGNUP_FINISH });
        return;
      }
  
      axios
        .post('/users', { username, password })
        .then(({ data }) => {
          dispatch({ types: AUTH_SIGNUP_SUCCESS, payload: data });
  
          dispatch({ types: AUTH_LOGIN_START });
  
          axios
            .post('/users/login', { username, password })
            .then(({ data }) => {
              localStorage.setItem(data.token);
  
              dispatch({ types: AUTH_LOGIN_SUCCESS, payload: username });
  
              dispatch({ types: AUTH_LOGIN_FINISH });
  
              dispatch({ types: AUTH_SIGNUP_FINISH });
  
              history.push('/');
            })
            .catch(err => {
              dispatch({
                type: AUTH_LOGIN_ERROR,
                payload: err.response.data.message,
              });
              dispatch({ types: AUTH_LOGIN_FINISH });
  
              dispatch({ types: AUTH_SIGNUP_ERROR });
              dispatch({ types: AUTH_SIGNUP_FINISH });
            });
        })
        .catch(err => {
          dispatch({
            type: AUTH_SIGNUP_ERROR,
            payload: err.response.data.message,
          });
          dispatch({ types: AUTH_SIGNUP_FINISH });
        });
    };
  };