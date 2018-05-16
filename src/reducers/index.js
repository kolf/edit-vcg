import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime';
import category from './category';
import topics from './topics';
import topic from './topic';
import topicSetting from './topicSetting';

export default combineReducers({
  user,
  runtime,
  category,
  topics,
  topic,
  topicSetting,
});
