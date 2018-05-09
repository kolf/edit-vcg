import { FETCH_TOPICS_REQUEST, FETCH_TOPICS_SUCCESS } from '../constants';

export default function topics(state = {}, action) {
  console.log(action);
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
    default:
      return state;
  }
}
