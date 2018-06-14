import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Input, Icon, Button } from 'antd';
import PropTypes from 'prop-types';
import DropdownSelect from 'components/DropdownSelect';
import s from './SearchInput.css';

const Search = Input.Search;

class SearchInput extends Component {
  state = {
    value: '',
    typeValue: '1',
  };

  handleClick = () => {
    this.onSearch(this.getValue('typeValue'));
  };

  handleChange = value => {
    const { onChange } = this.props;
    if (this.props.value === undefined) {
      this.setState({
        value,
      });
    }
    onChange && onChange(value);
  };

  onSearch = typeValue => {
    const { onClick } = this.props;
    onClick &&
      onClick({
        value: this.getValue('value'),
        typeValue,
      });
  };

  onEmpty = () => {
    this.handleChange('');
    const timer = setTimeout(() => {
      clearTimeout(timer);
      this.onSearch(this.getValue('typeValue'));
    }, 300);
  };

  getValue = key =>
    this.props[key] !== undefined ? this.props[key] : this.state[key];

  render() {
    const { placeholder, types } = this.props;
    const value = this.getValue('value');
    const typeValue = this.getValue('typeValue');

    let suffix = [];

    if (types && types.length > 0) {
      suffix.push(
        <DropdownSelect
          size="large"
          value={typeValue}
          options={types}
          onChange={this.onSearch}
        />,
      );
    }

    if (value) {
      suffix.unshift(<Icon type="close-circle" onClick={this.onEmpty} />);
    }

    return (
      <Search
        size="large"
        className={s.root}
        suffix={suffix}
        onChange={e => this.handleChange(e.target.value)}
        value={value}
        placeholder={placeholder}
        onSearch={this.handleClick}
        enterButton="搜索"
      />
    );
  }
}

export default withStyles(s)(SearchInput);
