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
  REQUEST_UPDATE_TOPIC_SETTING,
  UPDATE_TOPIC_SETTING_SUCCESS,
  UPDATE_TOPIC_SETTING_FAILURE,
  REQUEST_FETCH_TOPIC_SETTING,
  FETCH_TOPIC_SETTING_FAILURE,
  FETCH_TOPIC_SETTING_SUCCESS,
} from '../actions/topic';

export default function topic(
  state = {
    settings: {},
  },
  action,
) {
  switch (action.type) {
    case REQUEST_UPDATE_TOPIC_SETTING:
      return Object.assign({}, state, {
        isUpdateing: true,
        message: '',
      });
    case UPDATE_TOPIC_SETTING_SUCCESS:
      return Object.assign({}, state, {
        isUpdateing: false,
        message: '',
      });
    case UPDATE_TOPIC_SETTING_FAILURE:
      return Object.assign({}, state, {
        isUpdateing: false,
        message: '',
      });
    case REQUEST_FETCH_TOPIC_SETTING:
      return Object.assign({}, state, {
        isFetching: true,
        message: '',
      });
    case FETCH_TOPIC_SETTING_FAILURE:
      return Object.assign({}, state, {
        isFetching: true,
        message: '',
      });
    case FETCH_TOPIC_SETTING_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        message: '',
        settings: action.setting,
      });
    case REQUEST_CREATE_TOPIC:
      return Object.assign({}, state, {
        isFetching: true,
        message: '',
      });
    case CREATE_TOPIC_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: '',
      });
    case CREATE_TOPIC_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        message: '',
      });
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
        fetchImageing: true,
        imagesMessage: '',
      });

    case FETCH_TOPIC_IMAGES_SUCCESS:
      return Object.assign({}, state, {
        fetchImageing: false,
        imagesList: (action.list || []).map(item => ({
          ...item,
          id: item.id || item.groupId,
        })),
        imagesTotal: action.total,
        imagesMessage: action.message,
      });
    case FETCH_TOPIC_IMAGES_FAILURE:
      return Object.assign({}, state, {
        fetchImageing: false,
        imagesMessage: action.message,
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
      return Object.assign({}, state, {
        ...action.topic,
        updateKey: Date.now(),
      });
    default:
      return state;
  }
}
