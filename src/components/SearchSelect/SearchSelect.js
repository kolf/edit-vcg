import React, { Component } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Select, Spin } from 'antd';
import PropTypes from 'prop-types';
import s from './SearchSelect.less';
import { fetchOptions } from 'actions/options';

const _ = require('lodash');

const Option = Select.Option;
let timer = null;
let currentValue = '';

class SearchSelect extends Component {
  static defaultProps = {
    value: [],
    style: {
      width: '100%',
    },
    paramType: '3',
  };

  state = {
    value: [],
    options: [],
    fetching: false,
  };

  onSearch = value => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    currentValue = value;
    this.setState({ fetching: true });

    const _this = this;
    const { paramType } = this.props;
    function fetch() {
      fetchOptions({ assetFamily: 1, searchName: value }, paramType).then(
        data => {
          if (value === currentValue) {
            let options = _.uniqBy(data || [], 'id').map(item => ({
              label: `${item.nameCn}(${item.id})`,
              key: item.id + '',
            }));

            _this.setState({
              options,
              fetching: false,
            });
          }
        },
      );
    }

    timer = setTimeout(fetch, 900);
  };

  handleChange = value => {
    const { onChange } = this.props;
    if (this.props.value === undefined) {
      this.setState({
        value,
        options: [],
        isFetching: false,
      });
    }

    onChange && onChange(value);
  };

  getValue = () =>
    this.props.value !== undefined ? this.props.value : this.state.value;

  render() {
    const { placeholder, style } = this.props;
    let { options, fetching } = this.state;

    return (
      <Select
        mode="multiple"
        notFoundContent={fetching ? <Spin size="small" /> : null}
        labelInValue
        value={this.getValue()}
        placeholder={placeholder}
        filterOption={false}
        onSearch={this.onSearch}
        onChange={this.handleChange}
        style={style}
      >
        {options.map(o => <Option key={o.key}>{o.label}</Option>)}
      </Select>
    );
  }
}

export default withStyles(s)(connect()(SearchSelect));
