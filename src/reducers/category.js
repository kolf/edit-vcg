import {
  FETCH_CATEGORY_REQUEST,
  FETCH_CATEGORY_SUCCESS,
} from '../actions/category';

function toTreeData(data) {
  let mapData = {};
  let treeData = loop(data);

  function loop(data) {
    return data.map((item, i) => {
      const { id, name } = item;
      const key = item.code ? item.code.match(/\d+/g).join(',') : '0'
      const obj = {
        label: name,
        value: id + '',
        level: key.split(',').length,
        key,
      };
      mapData[id] = {
        ...obj,
        pid: item.pid + '' || '0',
        cid: item.children ? item.children.map(c => c.id + '') : [],
      };

      return {
        ...obj,
        children: item.children ? loop(item.children) : [],
      };
    });
  }

  return {
    treeData,
    mapData,
  };
}

export default function category(state = {}, action) {
  switch (action.type) {
    case FETCH_CATEGORY_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case FETCH_CATEGORY_SUCCESS:
      const { treeData, mapData } = toTreeData(action.payload);
      return Object.assign({}, state, {
        isFetching: false,
        treeData,
        mapData,
      });
    default:
      return state;
  }
}
