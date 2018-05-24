import {
  REQUEST_FETCH_KEYWORD_DICT,
  FETCH_KEYWORD_DICT_FAILURE,
  FETCH_KEYWORD_DICT_SUCCESS,
  REMOVE_ALL_KEYWORD_DICT
} from 'actions/keywordDict'

export default function keywordDict (state = { map: {} }, action) {
  switch (action.type) {
    case REQUEST_FETCH_KEYWORD_DICT:
      return Object.assign({}, state, {
        isFetching: true,
        message: ''
      })
    case FETCH_KEYWORD_DICT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        message: action.message
      })
    case FETCH_KEYWORD_DICT_SUCCESS:
      let map = {}

      for (let name in action.map) {
        const keywords = JSON.parse(action.map[name])
        if (keywords.length === 1) {
          let { id, kind, cnname } = keywords[0]
          map[id] = {
            value: id + '',
            label: cnname,
            kind
          }
        } else if (keywords.length > 1) {
          let id = keywords.map(k => k.id).join(',')
          map[id] = name
        }
      }

      return Object.assign({}, state, {
        isFetching: false,
        message: action.message,
        map
      })
    case REMOVE_ALL_KEYWORD_DICT:
      return {}
    default:
      return state
  }
}
