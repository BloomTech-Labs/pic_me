import { combineReducers } from 'redux';
import AuthReducer from './authentication';
import { reducer as FormReducer } from 'redux-form';

const rootReducer = combineReducers({
  auth: AuthReducer,
  form: FormReducer,
});

export default rootReducer;