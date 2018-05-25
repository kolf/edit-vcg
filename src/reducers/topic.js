import {
  REQUEST_CREATE_TOPIC,
  CREATE_TOPIC_FAILURE,
  CREATE_TOPIC_SUCCESS,
  REQUEST_STOP_TOPIC,
  STOP_TOPIC_FAILURE,
  STOP_TOPIC_SUCCESS,
} from '../actions/topic';

export default function topics(state = {}, action) {
  switch (action.type) {
    case REQUEST_CREATE_TOPIC:
      return state;
    case CREATE_TOPIC_FAILURE:
      return state;
    case CREATE_TOPIC_SUCCESS:
      return state;
    case REQUEST_STOP_TOPIC:
      return Object.assign({}, state, {
        isFetching: true,
        errorMessage: '',
      });
    case STOP_TOPIC_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message,
      });
    case STOP_TOPIC_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
      });
    default:
      return state;
  }
}
