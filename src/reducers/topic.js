import {
  REQUEST_CREATE_TOPIC,
  CREATE_TOPIC_FAILURE,
  CREATE_TOPIC_SUCCESS,
  REQUEST_UPDATE_TOPIC,
  UPDATE_TOPIC_FAILURE,
  UPDATE_TOPIC_SUCCESS,
  REQUEST_FETCH_TOPIC_IMAGES,
  FETCH_TOPIC_IMAGES_SUCCESS,
  FETCH_TOPIC_IMAGES_FAILURE,
  REQUEST_FETCH_TOPIC,
  FETCH_TOPIC_FAILURE,
  FETCH_TOPIC_SUCCESS,
  SET_TOPIC,
} from '../actions/topic';

export default function topic(state = {}, action) {
  switch (action.type) {
    case REQUEST_CREATE_TOPIC:
      return {
        isFetching: true,
        message: '',
      };
    case CREATE_TOPIC_FAILURE:
      return {
        isFetching: false,
        message: action.message,
      };
    case CREATE_TOPIC_SUCCESS:
      return {
        isFetching: false,
        message: action.message,
      };
    case REQUEST_UPDATE_TOPIC:
      return Object.assign({}, state, {
        isFetching: true,
        message: '',
      });
    case UPDATE_TOPIC_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: action.message,
      });
    case UPDATE_TOPIC_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
      });
    case REQUEST_FETCH_TOPIC_IMAGES:
      return Object.assign({}, state, {
        isFetching: true,
        message: '',
      });
    case FETCH_TOPIC_IMAGES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        imagesList: action.list,
        imagesTotal: action.total,
        message: '',
      });
    case FETCH_TOPIC_IMAGES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
      });
    case REQUEST_FETCH_TOPIC:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case FETCH_TOPIC_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        title: action.topic.title,
        bannerUrl: action.topic.preBanner,
      });
    case FETCH_TOPIC_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
      });
    case SET_TOPIC:
      console.log(action.topic);
      return Object.assign({}, state, action.topic);
    default:
      return state;
  }
}
