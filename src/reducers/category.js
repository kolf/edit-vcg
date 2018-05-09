import { FETCH_CATEGORY_REQUEST, FETCH_CATEGORY_SUCCESS } from '../constants';

const loop = (data, level) =>
  data.map((item, i) => {
    const key = `${level}-${i}`;
    return {
      label: item.name,
      value: `${item.id}`,
      key: item.code ? item.code.match(/\d+/g).join(',') : 0,
      pid: item.pid || 0,
      children: item.children ? loop(item.children, key) : [],
    };
  });

export default function category(state = {}, action) {
  switch (action.type) {
    case FETCH_CATEGORY_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case FETCH_CATEGORY_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        treeData: loop(action.payload, `${0}0`),
      });
    default:
      return state;
  }
}
