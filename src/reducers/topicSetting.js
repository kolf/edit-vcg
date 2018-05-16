import {
  TOPIC_SETTING_REQUEST,
  TOPIC_SETTING_FAILURE,
  TOPIC_SETTING_SUCCESS,
} from '../actions/topicSetting';

export default function topics(state = {}, action) {
  switch (action.type) {
    case TOPIC_SETTING_REQUEST:
      return state;
    case TOPIC_SETTING_SUCCESS:
      return state;
    default:
      return state;
  }
}
