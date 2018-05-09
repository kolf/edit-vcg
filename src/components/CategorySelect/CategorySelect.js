import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TreeSelect } from 'antd';
import { fetchCategory } from 'actions/category';

const SHOW_PARENT = TreeSelect.SHOW_PARENT;

const filterTreeNode = (inputValue, treeNode) => {
  const { value, title } = treeNode.props;
  return new RegExp(inputValue, 'i').test(value + title);
};
class CategorySelect extends React.Component {
  state = {
    value: [],
  };

  componentWillMount() {
    this.props.dispatch(fetchCategory());
  }

  onChange = value => {
    console.log('onChange ', value);
    this.setState({ value });
  };

  render() {
    const props = {
      filterTreeNode,
      treeData: this.props.treeData,
      labelInValue: true,
      value: this.state.value,
      onChange: this.onChange,
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
  return { treeData: state.category.treeData };
}

export default connect(mapStateToProps)(CategorySelect);
