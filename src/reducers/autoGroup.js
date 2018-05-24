import {
  REQUEST_CREATE_AUTO_GROUP,
  CREATE_AUTO_GROUP_SUCCESS,
  CREATE_AUTO_GROUP_FAILURE,
} from 'actions/autoGroup';

export default function autoGroups(state = { list: [] }, action) {
  switch (action.type) {
    case REQUEST_CREATE_AUTO_GROUP:
      return Object.assign({}, state, {
        isFetching: true,
        message: '',
      });
    case CREATE_AUTO_GROUP_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        message: action.message,
      });
    case CREATE_AUTO_GROUP_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: action.message,
      });
    default:
      return state;
  }
}
