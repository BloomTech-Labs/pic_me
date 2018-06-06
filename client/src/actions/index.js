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

export const AUTH_RESET_ATTEMPTED = 'AUTH_RESET_ATTEMPTED';

// logout
export const AUTH_LOGOUT_START = 'AUTH_LOGOUT_START';
export const AUTH_LOGOUT_SUCCESS = 'AUTH_LOGOUT_SUCCESS';
export const AUTH_LOGOUT_ERROR = 'AUTH_LOGOUT_ERROR';
export const AUTH_LOGOUT_FINISH = 'AUTH_LOGOUT_FINISH';

export const CHANGE_SETTINGS_START = 'CHANGE_SETTINGS_START';
export const CHANGE_SETTINGS_SUCCESS = 'CHANGE_SETTINGS_SUCCESS';
export const CHANGE_SETTINGS_ERROR = 'CHANGE_SETTINGS_ERROR';
export const ACCOUNT_DELETE = 'ACCOUNT_DELETE';

// password
export const FORGOTPASSWORD = 'FORGOTPASSWORD';
export const RESETPASSWORD = 'RESETPASSWORD';

// photo
export const FETCH_MYUPLOADS = 'FETCH_MYUPLOADS';
export const FETCH_OTHERMES = 'FETCH_OTHERMES';
export const FETCH_OTHERMES_PICTURE = 'FETCH_OTHERMES_PICTURE';
export const DELETE_MYUPLOADS = 'DELETE_MYUPLOADS';
export const FETCH_BROWSE = 'FETCH_BROWSE';
export const FETCH_MYCOLLECTION = 'FETCH_MYCOLLECTION';

// const ROOT = 'https://labpicme.herokuapp.com/api';
const ROOT = `/api`;

export const resetErrors = _ => {
	return dispatch => {
		dispatch({ type: AUTH_ERROR_RESET });
	};
};

export const authError = error => {
	return dispatch => {
		dispatch({ type: AUTH_ERROR, payload: error });
		setTimeout(() => {
			dispatch({ type: AUTH_ERROR });
		}, 4000);
	};
};

export const resetAuthAttempted = _ => {
	return dispatch => {
		dispatch({ type: AUTH_RESET_ATTEMPTED });
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
						dispatch({ type: AUTH_LOGIN_SUCCESS, payload: email });
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
				// history.go(-1);
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

export const mobil = (email, password, history) => {
	return dispatch => {
		dispatch({ type: AUTH_LOGIN_START });

		axios
			.post(`${ROOT}/users/login`, { email, password })
			.then(response => {
				// - Update state to indicate user is authenticated
				dispatch({ type: AUTH_LOGIN_SUCCESS, payload: email });
				// history.push('/feature');
				history.go(-1);
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

export const logout = history => {
	return dispatch => {
		dispatch({ type: AUTH_LOGOUT_START });

		axios
			.get(`${ROOT}/users/logout`)
			.then(data => {
				dispatch({ type: AUTH_LOGOUT_SUCCESS });
				history.push('/logout');
			})
			.catch(err => console.log(err));
		// dispatch({
		// type: AUTH_LOGOUT_ERROR,
		// });
		// dispatch({ type: AUTH_LOGOUT_SUCCESS });
		// dispatch({ type: AUTH_LOGOUT_FINISH });
	};
};

export const twitter = history => {
	return dispatch => {
		axios
			.get(`${ROOT}/users/auth/twitter`, {
				// headers: { 'Access-Control-Allow-Origin': '*' },
			})
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

export const account = (
	email,
	password,
	// newPassword,
	// confirmPassword
) => {
	return dispatch => {
		dispatch({ type: CHANGE_SETTINGS_START });
		// if (newPassword !== confirmPassword) {
		//   dispatch({ type: CHANGE_SETTINGS_ERROR, payload: 'New passwords do not match' });
		//   return;
		// }
		axios
			.put(`${ROOT}/users/settings`, { user: { email, password } })
			.then(response => {
				console.log(response);
				dispatch({ type: CHANGE_SETTINGS_SUCCESS });
			})
			.catch(err => console.log(err));
	};
};

export const profile = (firstName, lastName, nickNames) => {
	return dispatch => {
		dispatch({ type: CHANGE_SETTINGS_START });
		console.log('nicknames', nickNames);
		// if (password !== confirmPassword) {
		//   dispatch({ payload: 'Passwords do not match' });
		//   return;
		// }
		axios
			.put(`${ROOT}/users`, {
				user: { firstName, lastName, nickNames: nickNames.split(', ') },
			})
			.then(response => {
				console.log(response);
				dispatch({ type: CHANGE_SETTINGS_SUCCESS });
			})
			.catch(err => console.log(err));
	};
};

export const forgotPassword = email => {
	return dispatch => {
		axios.post(`${ROOT}/forgotpassword`, { email }).then(
			response => {
				console.log(response);
			},
			// .catch (error) ()
			// return authError(error.response.data.message)
		);
	};
};

export const deleteaccount = (email, password) => {
	return dispatch => {
		axios
			.delete(`${ROOT}/users`, { user: { email, password } })
			.then(response => {
				console.log(response);
				dispatch({ type: ACCOUNT_DELETE });
				// history.push('logout')
			})
			.catch(err => console.log(err));
	};
};

export const sendPayment = (stripeToken, pkg, history) => {
	return dispatch => {
		axios
			.post(`${ROOT}/users/payment`, { stripeToken, typeOfCharge: pkg })
			.then(({ data }) => {
				/* successful capture from Stripe */
				if (data.captured) {
					console.log('payment successful');
					history.push(`/picture_browse`);
				} else {
					console.error('problem capturing payment from Stripe');
				}
			})
			.catch(err => console.log(err));
	};
};

export const authenticateUser = history => {
	return dispatch => {
		axios
			.post(`${ROOT}/users/login/check`)
			.then(({ data }) => {
				if (data.message === `user verified`) {
					dispatch({ type: AUTH_LOGIN_SUCCESS, payload: data.user.email });

					// history.go(-1);
				} else {
					window.alert(`login failed`);

					// dispatch({
					// 	type: AUTH_LOGIN_ERROR,
					// 	// payload: err.response.data.message,
					// });
					history.push(`/login`);
				}
			})
			.catch(err => {
				dispatch({
					type: AUTH_LOGIN_ERROR,
					// payload: err.response.data.message,
					payload:
						err.response.data.message /* session expired. please log in */,
				});
				// window.alert(`login failed at err`);

				// history.push('/login');
			});
	};
};

export const upload = data => {
	return dispatch => {
		axios
			.post(`${ROOT}/pictures/upload`)
			.then(res => console.log(res))
			.catch(err => console.error(err));
	};
};

export const browse = _ => {
	return dispatch => {
		axios
			.get(`${ROOT}/pictures/browse`)
			.then(({ data }) => {
				dispatch({ type: FETCH_BROWSE, payload: data });
			})
			.catch(err => console.log(err));
	};
};

export const browseCredit = _ => {
	return dispatch => {
		axios
			.get(`${ROOT}/pictures/browse`)
			.then(({ data }) => {
				dispatch({ type: FETCH_BROWSE, payload: data });
			})
			.catch(err => console.log(err));
	};
};

export const myuploads = _ => {
	return dispatch => {
		axios
			.get(`${ROOT}/pictures/myuploads`)
			.then(({ data }) => {
				console.log('data', data);
				dispatch({ type: FETCH_MYUPLOADS, payload: data });
			})
			.catch(err => console.log(err));
	};
};

export const deletemyuploads = photoUploadId => {
	return dispatch => {
		axios
			.delete(`${ROOT}/pictures/myuploads/${photoUploadId}`)
			.then(response => {
				dispatch({ type: DELETE_MYUPLOADS, payload: photoUploadId });
			})
			.catch(err => console.log(err));
	};
};

export const othermephotos = _ => {
	return dispatch => {
		axios
			.get(`${ROOT}/pictures/othermes`)
			.then(({ data }) => dispatch({ type: FETCH_OTHERMES, payload: data }))
			.catch(err => console.log(err));
	};
};

export const claimPicture = imgId => {
	return dispatch => {
		axios
			.post(`${ROOT}/pictures/othermes/${imgId}`)
			.then(({ data }) =>
				dispatch({ type: FETCH_OTHERMES_PICTURE, payload: imgId }),
			)
			.catch(err => console.log(err));
	};
};

export const mycollection = _ => {
	return dispatch => {
		axios
			.get(`${ROOT}/pictures/mycollection`)
			.then(({ data }) => dispatch({ type: FETCH_MYCOLLECTION, payload: data }))
			.catch(err => console.log(err));
	};
};
