import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Icon, Button } from 'antd';

class DropdownSelect extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    size: PropTypes.string,
  };

  static defaultProps = {
    onChange: null,
    options: [],
    value: '',
    size: 'default',
  };

  handleMenuClick = e => {
    const { onChange } = this.props;
    const value = e.key;
    onChange && onChange(value);
  };

  getLabel = value => {
    if (!value) return '';
    const { options } = this.props;
    const option = options.find(o => o.value === value) || {};
    return option.label || '';
  };

  render() {
    const { value, options, size } = this.props;

    const menu = (
      <Menu onClick={this.handleMenuClick}>
        {options.map(o => <Menu.Item key={o.value}>{o.label}</Menu.Item>)}
      </Menu>
    );

    return (
      <Dropdown overlay={menu}>
        <Button size={size}>
          {this.getLabel(value)} <Icon type="down" />
        </Button>
      </Dropdown>
    );
  }
}

export default DropdownSelect;
