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
        errorMessage: '',
      });
    case FETCH_TOPIC_RULE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: '',
      });
    case FETCH_TOPIC_RULE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message,
      });
    case UPDATE_TOPIC_RULE_REQUEST:
      return Object.assign({}, state, {
        confirmLoading: true,
        errorMessage: '',
      });
    case UPDATE_TOPIC_RULE_SUCCESS:
      return Object.assign({}, state, {
        confirmLoading: false,
        errorMessage: '',
      });
    case UPDATE_TOPIC_RULE_FAILURE:
      return Object.assign({}, state, {
        confirmLoading: false,
        errorMessage: action.message,
      });

    default:
      return state;
  }
}
