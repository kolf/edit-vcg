import {
  REQUEST_FETCH_AUTO_GROUP_RULE,
  FETCH_AUTO_GROUP_RULE_FAILURE,
  FETCH_AUTO_GROUP_RULE_SUCCESS,
  UPDATE_AUTO_GROUP_RULE_REQUEST,
  UPDATE_AUTO_GROUP_RULE_FAILURE,
  UPDATE_AUTO_GROUP_RULE_SUCCESS,
} from 'actions/autoGroupRule';

export default function autoGroupRule(state = {}, action) {
  switch (action.type) {
    case REQUEST_FETCH_AUTO_GROUP_RULE:
      return Object.assign({}, state, {
        isFetching: true,
        errorMessage: '',
      });
    case FETCH_AUTO_GROUP_RULE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: '',
      });
    case FETCH_AUTO_GROUP_RULE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message,
      });
    case UPDATE_AUTO_GROUP_RULE_REQUEST:
      return Object.assign({}, state, {
        confirmLoading: true,
        errorMessage: '',
      });
    case UPDATE_AUTO_GROUP_RULE_SUCCESS:
      return Object.assign({}, state, {
        confirmLoading: false,
        errorMessage: '',
      });
    case UPDATE_AUTO_GROUP_RULE_FAILURE:
      return Object.assign({}, state, {
        confirmLoading: false,
        errorMessage: action.message,
      });

    default:
      return state;
  }
}
