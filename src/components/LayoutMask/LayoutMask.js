import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Switch } from 'antd';
import s from './LayoutMask.less';

class LayoutMask extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    target: PropTypes.string,
    value: PropTypes.number,
  };

  static defaultProps = {
    style: null,
  };

  state = {
    value: 1,
  };

  handleChange = () => {
    const { target, onChange } = this.props;

    console.log(this.getValue());

    const value = this.getValue() === 1 ? 0 : 1;

    if (this.props.value === undefined) {
      this.setState({ value });
    }

    console.log(value);

    onChange && onChange(target, value);
  };

  getValue = () =>
    this.props.value !== undefined ? this.props.value : this.state.value;

  render() {
    const { style, bordered } = this.props;
    const checked = !!this.getValue();

    console.log(checked);

    return (
      <div className={s.root + (bordered ? ' bordered' : '')} style={style}>
        {this.props.children}
        <Switch
          value={checked}
          className={s.btn}
          defaultChecked
          onChange={this.handleChange}
        />
        {!checked && <div className={s.mask} />}
      </div>
    );
  }
}

export default withStyles(s)(LayoutMask);
