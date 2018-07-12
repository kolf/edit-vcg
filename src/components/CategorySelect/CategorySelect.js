import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TreeSelect } from 'antd';
import { fetchCategory } from 'actions/category';

const _ = require('lodash');
const SHOW_PARENT = TreeSelect.SHOW_PARENT;

function filterTreeNode(inputValue, treeNode) {
  const { value, title } = treeNode.props;
  return new RegExp(inputValue, 'i').test(value + title);
}

function toLabelInValue(value, map) {
  if (!value || value.length === 0 || !map) {
    return [];
  }
  return value.map(
    v =>
      typeof v === 'string'
        ? {
            value: v + '',
            label: map[v].label,
          }
        : v,
  );
}
class CategorySelect extends React.Component {
  static defaultProps = {
    treeData: [],
    mapData: {},
  };

  state = {
    value: [],
  };

  componentWillMount() {
    if (this.props.treeData.length === 0) {
      this.props.dispatch(fetchCategory());
    }
  }

  handleChange = (val, label, { triggerValue, checked } = extra) => {
    const { mapData, oneCategorys, oneCategoryMultiple, ss } = this.props;
    let values = val.map(v => v.value);
    let oneCategory = oneCategorys.find(o => values.find(s => s === o));

    const { pid, key, value, cid } = mapData[triggerValue];

    console.log(oneCategoryMultiple, ss, 'oneCategoryMultiple');

    if (!oneCategoryMultiple) {
      if (pid === '0') {
        // 一级菜单
        values = checked ? [value] : [];
      } else {
        if (checked) {
          let curKeys = key.split(',');
          if (oneCategory && curKeys.indexOf(oneCategory) === -1) {
            values = curKeys;
          } else {
            values = values.concat(curKeys);
          }
        } else {
          values = values.filter(s => cid.indexOf(s) === -1);
        }
      }
    }

    const labelInValues = toLabelInValue(
      _.uniq(values).sort(
        (val1, val2) => mapData[val1].level - mapData[val2].level,
      ),
      mapData,
    );

    if (this.props.value) {
      this.props.onChange(labelInValues);
    } else {
      this.setState({ value: labelInValues });
    }
  };

  render() {
    const props = {
      filterTreeNode,
      treeCheckStrictly: true,
      treeData: this.props.treeData,
      value: this.props.value
        ? toLabelInValue(this.props.value, this.props.mapData)
        : this.state.value,
      onChange: this.handleChange,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: '请选择分类',
      dropdownStyle: {
        maxHeight: 400,
        overflow: 'auto',
      },
    };
    return <TreeSelect {...props} />;
  }
}

function mapStateToProps(state) {
  return {
    treeData: state.category.treeData,
    mapData: state.category.mapData,
    oneCategorys: state.category.treeData.map(c => c.value),
  };
}

export default connect(mapStateToProps)(CategorySelect);
