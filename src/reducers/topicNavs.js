import {
  REQUEST_FETCH_TOPIC_NAVS,
  FETCH_TOPIC_NAVS_FAILURE,
  FETCH_TOPIC_NAVS_SUCCESS,
} from 'actions/topicNavs';

export default function topicNavs(
  state = {
    navs: {
      0: [],
      1: [],
    },
  },
  action,
) {
  switch (action.type) {
    case REQUEST_FETCH_TOPIC_NAVS:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case FETCH_TOPIC_NAVS_SUCCESS:
      let navs = Object.assign({}, state.navs, action.navs);
      return {
        isFetching: false,
        navs,
      };
    case FETCH_TOPIC_NAVS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
      });
    default:
      return state;
  }
}
