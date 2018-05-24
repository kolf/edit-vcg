import {
  REQUEST_FETCH_AUTO_GROUPS,
  FETCH_AUTO_GROUPS_SUCCESS,
  FETCH_AUTO_GROUPS_FAILURE,
} from 'actions/autoGroups';

export default function autoGroups(state = { list: [] }, action) {
  switch (action.type) {
    case REQUEST_FETCH_AUTO_GROUPS:
      return Object.assign({}, state, {
        isFetching: true,
        pageNum: 1,
        pageSize: 60,
      });
    case FETCH_AUTO_GROUPS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        list: action.payload.list
          ? action.payload.list.map((item, index) => {
              item.index = index + 1;
              return item;
            })
          : [],
        total: action.payload.total,
      });
    default:
      return state;
  }
}
