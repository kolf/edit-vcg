import {
  FETCH_TOPIC_SETTING_REQUEST,
  FETCH_TOPIC_SETTING_FAILURE,
  FETCH_TOPIC_SETTING_SUCCESS,
  UPDATE_TOPIC_SETTING_REQUEST,
  UPDATE_TOPIC_SETTING_FAILURE,
  UPDATE_TOPIC_SETTING_SUCCESS,
} from '../actions/topicSetting';

export default function topics(state = {}, action) {
  switch (action.type) {
    case FETCH_TOPIC_SETTING_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        errorMessage: '',
      });
    case FETCH_TOPIC_SETTING_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: '',
      });
    case FETCH_TOPIC_SETTING_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message,
      });
    case UPDATE_TOPIC_SETTING_REQUEST:
      return Object.assign({}, state, {
        confirmLoading: true,
        errorMessage: '',
      });
    case UPDATE_TOPIC_SETTING_SUCCESS:
      return Object.assign({}, state, {
        confirmLoading: false,
        errorMessage: '',
      });
    case UPDATE_TOPIC_SETTING_FAILURE:
      return Object.assign({}, state, {
        confirmLoading: true,
        errorMessage: action.message,
      });

    default:
      return state;
  }
}
