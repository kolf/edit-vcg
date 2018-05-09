import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime';
import category from './category';
import topics from './topics';

export default combineReducers({
  user,
  runtime,
  category,
  topics,
});
