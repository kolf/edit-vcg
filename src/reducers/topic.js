import {
  CREATE_TOPIC_REQUEST,
  CREATE_TOPIC_FAILURE,
  CREATE_TOPIC_SUCCESS,
} from '../actions/topic';

export default function topics(state = {}, action) {
  switch (action.type) {
    case CREATE_TOPIC_REQUEST:
      return state;
    case CREATE_TOPIC_SUCCESS:
      return state;
    default:
      return state;
  }
}
