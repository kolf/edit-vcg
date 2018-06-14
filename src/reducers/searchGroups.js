import {
  REQUEST_FETCH_SEARCH_GROUPS,
  FETCH_SEARCH_GROUPS_SUCCESS,
  FETCH_SEARCH_GROUPS_FAILURE,
  REQUEST_UPDATE_GROUP_SEARCH,
  UPDATE_GROUP_SEARCH_FAILURE,
  UPDATE_GROUP_SEARCH_SUCCESS,
  REQUEST_DELETE_GROUP_SEARCH,
  DELETE_GROUP_SEARCH_FAILURE,
  DELETE_GROUP_SEARCH_SUCCESS,
} from 'actions/searchGroups';

function deleteGroupSearch(gorup, groupSearch) {
  function loop(items = []) {
    items.find((item, index) => {
      if (groupSearch.id === item.id) {
        items.splice(index, 1);
        return true;
      } else if (groupSearch.pid === item.id) {
        loop(item.children);
      }
    });
  }

  loop(gorup.searchItems);
}

function updateGroupSearch(group, groupSearch) {
  group.searchItems = group.searchItems || [];

  function loop(items = []) {
    let updateItem = items.find((item, index) => {
      if (groupSearch.id === item.id) {
        items[index] = Object.assign({}, item, groupSearch);
        return true;
      } else if (groupSearch.pid === item.id) {
        item.children = item.children || [];
        loop(item.children);
        return true;
      }
    });
    if (!updateItem) {
      items.push(groupSearch);
    }
  }

  loop(group.searchItems);
}

function updateGroup(groups, groupId, groupSearch, isDelele) {
  groups.find(group => {
    if (groupId === group.id) {
      if (isDelele) {
        deleteGroupSearch(group, groupSearch);
      } else {
        updateGroupSearch(group, groupSearch);
      }
      return true;
    }
  });
}

export default function searchGroups(state = { list: [] }, action) {
  const { groupId, groupSearch } = action;
  switch (action.type) {
    case REQUEST_FETCH_SEARCH_GROUPS:
      return Object.assign({}, state, {
        isFetching: true,
        errMessage: '',
      });
    case FETCH_SEARCH_GROUPS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        list: action.list.map((item, index) => {
          item.index = index + 1;
          return item;
        }),
        errMessage: action.message,
      });
    case FETCH_SEARCH_GROUPS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errMessage: action.message,
      });

    case REQUEST_UPDATE_GROUP_SEARCH:
      return Object.assign({}, state, {
        isGroupUpdating: true,
      });
    case UPDATE_GROUP_SEARCH_SUCCESS:
      updateGroup(state.list, groupId, groupSearch);
      return {
        ...state,
        isGroupUpdating: false,
      };
    case UPDATE_GROUP_SEARCH_FAILURE:
      return Object.assign({}, state, {
        isGroupUpdating: false,
      });
    case REQUEST_DELETE_GROUP_SEARCH:
      return Object.assign({}, state, {
        isGroupUpdating: true,
      });
    case DELETE_GROUP_SEARCH_SUCCESS:
      updateGroup(state.list, groupId, groupSearch, true);
      return {
        ...state,
        isGroupUpdating: false,
        // groupsKey: Date.now(), // 后期优化
      };

    default:
      return state;
  }
}
