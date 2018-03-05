import { combineReducers } from 'redux';

import studios from './studiosReducer';
import filter from './filterReducer';

// exporting of rootReducer
export default combineReducers({
  studios,
  filter,
});
