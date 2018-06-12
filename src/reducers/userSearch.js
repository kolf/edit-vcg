import {
  FETCH_USER_SEARCH_REQUEST,
  FETCH_USER_SEARCH_FAILURE,
  FETCH_USER_SEARCH_SUCCESS,
} from 'actions/userSearch';

export default function userSearch(state = { list: [] }, action) {
  switch (action.type) {
    case FETCH_USER_SEARCH_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case FETCH_USER_SEARCH_SUCCESS:
      return {
        isFetching: false,
        list: action.list.map(item => {
          const { searchs, name, id, orders } = item;
          return {
            sort: orders,
            key: id,
            value: searchs,
            name,
          };
        }),
      };
    case FETCH_USER_SEARCH_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
      });
    default:
      return state;
  }
}
