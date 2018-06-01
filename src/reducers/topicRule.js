import {
  FETCH_TOPIC_RULE_REQUEST,
  FETCH_TOPIC_RULE_FAILURE,
  FETCH_TOPIC_RULE_SUCCESS,
  UPDATE_TOPIC_RULE_REQUEST,
  UPDATE_TOPIC_RULE_FAILURE,
  UPDATE_TOPIC_RULE_SUCCESS,
} from '../actions/topicRule';

export default function topics(state = {}, action) {
  switch (action.type) {
    case FETCH_TOPIC_RULE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        message: '',
      });
    case FETCH_TOPIC_RULE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        message: '',
      });
    case FETCH_TOPIC_RULE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: action.message,
      });
    case UPDATE_TOPIC_RULE_REQUEST:
      return Object.assign({}, state, {
        confirmLoading: true,
        message: '',
      });
    case UPDATE_TOPIC_RULE_SUCCESS:
      return Object.assign({}, state, {
        confirmLoading: false,
        message: '',
      });
    case UPDATE_TOPIC_RULE_FAILURE:
      return Object.assign({}, state, {
        confirmLoading: false,
        message: action.message,
      });

    default:
      return state;
  }
}
