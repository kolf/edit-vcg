import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Switch } from 'antd';
import s from './LayoutMask.less';

class LayoutMask extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    target: PropTypes.string,
  };

  static defaultProps = {
    style: null,
  };

  state = {
    show: true,
  };

  handleChange = () => {
    const { target, onChange } = this.props;
    const value = !this.state.show;

    this.setState({ show: value });

    onChange(target, value);
  };

  render() {
    const { style } = this.props;
    const { show } = this.state;

    return (
      <div className={s.root} style={style}>
        {this.props.children}
        <Switch
          value={show}
          className={s.btn}
          defaultChecked
          onChange={this.handleChange}
        />
        {!show && <div className={s.mask} />}
      </div>
    );
  }
}

export default withStyles(s)(LayoutMask);
