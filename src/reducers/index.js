import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import help from './help';

const rootReducer = combineReducers({
  alert,
  auth,
  profile,
  post,
  help,
});

export default rootReducer;
