import { combineReducers } from 'redux';
import auth from './auth';
import videos from './videos';

const rootReducer = combineReducers({
  auth,
  videos,
});

export default rootReducer;