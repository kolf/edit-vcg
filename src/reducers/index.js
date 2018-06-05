import { combineReducers } from 'redux';
import user from './user';
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
import groups from './groups'

export default combineReducers({
  user,
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
  groups
});
