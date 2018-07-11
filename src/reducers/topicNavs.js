import {
  REQUEST_FETCH_TOPIC_NAVS,
  FETCH_TOPIC_NAVS_FAILURE,
  FETCH_TOPIC_NAVS_SUCCESS,
  ACTIVE_TOPIC_NAV,
} from 'actions/topicNavs';

function toTree(data, parentId) {
  const result = [];
  let temp;

  for (const item of data) {
    if (item.parentNavId === parentId) {
      temp = toTree(data, item.navId);
      if (temp.length > 0) {
        item.children = temp;
      }
      result.push(item);
    }
  }

  return result;
}

const defaultState = {
  0: {
    tree: [],
  },
  1: {
    tree: [],
  },
  activeId: '0',
};

export default function topicNavs(state = defaultState, action) {
  switch (action.type) {
    case REQUEST_FETCH_TOPIC_NAVS:
      return Object.assign({}, state, {
        [action.navLocation]: {
          isFetching: true,
        },
      });
    case FETCH_TOPIC_NAVS_SUCCESS:
      return Object.assign({}, state, {
        [action.navLocation]: {
          isFetching: false,
          tree: toTree(action.navs, '1'),
        },
      });
    case FETCH_TOPIC_NAVS_FAILURE:
      return Object.assign({}, state, {
        [action.navLocation]: {
          isFetching: false,
        },
      });
    case ACTIVE_TOPIC_NAV:
      return Object.assign({}, state, {
        activeId: action.navId,
      });
    default:
      return state;
  }
}
