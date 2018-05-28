import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Select } from 'antd';
import PropTypes from 'prop-types';
import s from './SearchSelect.less';

const Option = Select.Option;

class SearchSelect extends Component {
  static defaultProps = {
    value: [],
    style: {
      width: '100%',
    },
  };

  state = {
    value: '',
    options: [],
  };

  onSearch = () => {};

  handleChange = value => {};

  getValue = () =>
    this.props.value !== undefined ? this.props.value : this.state.value;

  render() {
    const { placeholder, value, style } = this.props;
    let { options } = this.state;

    return (
      <Select
        mode="multiple"
        labelInValue
        value={value}
        placeholder={placeholder}
        filterOption={false}
        onSearch={this.onSearch}
        onChange={this.handleChange}
        style={style}
      >
        {options.map(o => <Option key={o.value}>{o.text}</Option>)}
      </Select>
    );
  }
}

export default withStyles(s)(SearchSelect);
