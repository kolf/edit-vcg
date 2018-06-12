import {
  REQUEST_FETCH_KEYWORD_DICT,
  FETCH_KEYWORD_DICT_FAILURE,
  FETCH_KEYWORD_DICT_SUCCESS,
  REMOVE_ALL_KEYWORD_DICT,
} from 'actions/keywordDict';

export default function keywordDict(state = { mapData: {} }, action) {
  switch (action.type) {
    case REQUEST_FETCH_KEYWORD_DICT:
      return Object.assign({}, state, {
        isFetching: true,
        message: '',
      });
    case FETCH_KEYWORD_DICT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: action.message,
      });
    case FETCH_KEYWORD_DICT_SUCCESS:
      let mapData = Object.assign(
        {},
        state.mapData,
        action.list.reduce((result, item) => {
          let { id, cnname } = item;
          result[id] = {
            // value: id + '',
            displayName: cnname,
            ...item,
          };
          return result;
        }, {}),
      );

      return {
        isFetching: false,
        message: action.message,
        mapData,
      };
    case REMOVE_ALL_KEYWORD_DICT:
      return {
        isFetching: false,
        message: '清除关键词词典',
        mapData: {},
      };
    default:
      return state;
  }
}
