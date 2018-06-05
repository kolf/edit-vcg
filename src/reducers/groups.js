import {
  REQUEST_FETCH_GROUPS,
  FETCH_GROUPS_SUCCESS,
  FETCH_GROUPS_FAILURE,
} from 'actions/groups';

export default function topics(state = { list: [] }, action) {
  console.log(action, 'action');

  switch (action.type) {
    case REQUEST_FETCH_GROUPS:
      return Object.assign({}, state, {
        list: [],
        total: 0,
        isFetching: true,
      });
    case FETCH_GROUPS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        list: action.groups.list.map((item, index) => {
          item.index = index + 1;
          return item;
        }),
        total: action.groups.total,
      });
    case FETCH_GROUPS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
      });
    default:
      return state;
  }
}
