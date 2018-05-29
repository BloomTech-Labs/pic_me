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

export const CHANGE_SETTINGS_START = "CHANGE_SETTINGS_START";
export const CHANGE_SETTINGS_SUCCESS = "CHANGE_SETTINGS_SUCCESS";

// password
export const FORGOTPASSWORD="FORGOTPASSWORD";
export const RESETPASSWORD="RESETPASSWORD";

const ROOT = 'http://localhost:5555/api';

export const resetErrors = _ => {
  return dispatch => {
    dispatch({ type: AUTH_ERROR_RESET });
  };
};

export const authError = (error) => {
  return (dispatch) => {
    dispatch({ type: AUTH_ERROR, payload: error });
    setTimeout(() => {
      dispatch({ type: AUTH_ERROR });
    }, 4000);
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

    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      dispatch({
        type: AUTH_SIGNUP_ERROR,
        payload: 'Please provide all fields',
      });
      dispatch({ type: AUTH_SIGNUP_FINISH });
      return;
    }

    if (password !== confirmPassword) {
      dispatch({ type: AUTH_SIGNUP_ERROR, payload: 'Passwords do not match' });
      dispatch({ type: AUTH_SIGNUP_FINISH });
      return;
    }

    axios
      .post(`${ROOT}/users`, { email, password, firstName, lastName })
      .then(({ data }) => {
        dispatch({ type: AUTH_SIGNUP_SUCCESS, payload: data.email });
        dispatch({ type: AUTH_LOGIN_START });
        axios
          .post(`${ROOT}/users/login`, { email, password })
          .then(({ response }) => {
            dispatch({ type: AUTH_LOGIN_SUCCESS, payload: email});
            // dispatch({ type: AUTH_LOGIN_FINISH });
            // dispatch({ type: AUTH_SIGNUP_FINISH });
            history.push('/feature');
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
      .then(response => {
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_LOGIN_SUCCESS, payload: email });
        history.push('/feature');
      })
      .catch(err => {
        dispatch({
          type: AUTH_LOGIN_ERROR,
          payload: err.response.data.message,
        });
        // dispatch({ type: AUTH_LOGIN_FINISH });
      });
  };
};

export const logout = () => {
  return dispatch => {
    axios
      .get(`${ROOT}/users/logout`)
      .then(response => {
        dispatch({ type: AUTH_LOGOUT_SUCCESS});
        // history.push('/logout');
      })
      .catch(err => console.log(err));
        // dispatch({
          // type: AUTH_LOGOUT_ERROR,
        // });
        // dispatch({ type: AUTH_LOGOUT_SUCCESS });
        // dispatch({ type: AUTH_LOGOUT_FINISH });
      };
  };

  export const twitter = () => {
    return dispatch => {
      axios
        .get(`${ROOT}/users/auth/twitter`)
        .then(response => {
          console.log(response);
        })
        .catch(err => console.log(err));
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


export const settings = (email, confirmPassword, password, firstName, lastName, nickNames) => {
  return dispatch => {
    dispatch({ type: CHANGE_SETTINGS_START });
    // if (password !== confirmPassword) {
    //   dispatch({ payload: 'Passwords do not match' });
    //   return;
    // }
    axios
      .put(`${ROOT}/users/settings`,  
        {user: {email, confirmPassword, password, firstName, lastName, nickNames}}
      )
      .then(response => {
        console.log(response);
        dispatch({ type: CHANGE_SETTINGS_SUCCESS })
      })
      .catch(err => console.log(err));
  }
};


// export const settings = async (user) => {
//   const apiurl = `${ROOT}/settings`;
//   try {
//     const token = localStorage.getItem('token');
//     await axios.post(apiurl, user, {
//       headers: {
//         Authorization: token,
//       },
//     });
//     return {
//       type: CHANGE_SETTINGS,
//     };
//   } catch (error) {
//     return authError(error.response.data.message);
//   }
// };

export const forgotPassword = (email) => {
  return dispatch => {
    axios
      .post(`${ROOT}/forgotpassword`, { email })
      .then(response => {console.log(response)}
      // .catch (error) ()
      // return authError(error.response.data.message)
      )}
};
