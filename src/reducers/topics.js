import {
  FETCH_TOPICS_REQUEST,
  FETCH_TOPICS_SUCCESS,
  FETCH_TOPICS_FAILURE,
  UPDATE_TOPIC,
} from '../actions/topics';

export default function topics(state = { list: [] }, action) {
  switch (action.type) {
    case FETCH_TOPICS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        pageNum: 1,
        pageSize: 60,
      });
    case FETCH_TOPICS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        list: action.payload.list.map((item, index) => {
          item.index = index + 1;
          return item;
        }),
        total: action.payload.total,
      });
    case UPDATE_TOPIC:
      state.list.find(item => {
        if (item.id == action.payload.id) {
          Object.assign(item, action.payload.data);
        }
      });
      return state;
    default:
      return state;
  }
}
