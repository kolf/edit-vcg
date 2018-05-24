import {
  CREATE_TOPIC_REQUEST,
  CREATE_TOPIC_FAILURE,
  CREATE_TOPIC_SUCCESS,
  STOP_TOPIC_REQUEST,
  STOP_TOPIC_FAILURE,
  STOP_TOPIC_SUCCESS,
} from '../actions/topic';

export default function topics(state = {}, action) {
  switch (action.type) {
    case CREATE_TOPIC_REQUEST:
      return state;
    case CREATE_TOPIC_FAILURE:
      return state;
    case CREATE_TOPIC_SUCCESS:
      return state;
    case STOP_TOPIC_REQUEST:
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
