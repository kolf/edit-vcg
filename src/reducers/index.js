import { combineReducers } from 'redux';
import auth from './auth';
import runtime from './runtime';
import category from './category';
import topics from './topics';
import topic from './topic';
import topicRule from './topicRule';
import autoGroups from './autoGroups';
import autoGroup from './autoGroup';
import autoGroupRule from './autoGroupRule';
import keywordDict from './keywordDict';
import topicNavs from './topicNavs';
import searchGroups from './searchGroups';
import userSearch from './userSearch';

export default combineReducers({
  auth,
  runtime,
  category,
  topics,
  topic,
  topicRule,
  autoGroups,
  autoGroup,
  autoGroupRule,
  keywordDict,
  topicNavs,
  searchGroups,
  userSearch,
});
