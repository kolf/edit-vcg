import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Switch } from 'antd';
import s from './ToggleLayer.less';

class ToggleLayer extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }

  onChange = () => {
    const { show } = this.state;
    this.setState({
      show: !show,
    });
  };

  render() {
    const { style } = this.props;
    const { show } = this.state;

    return (
      <div className={s.toggleLayer} style={style}>
        {this.props.children}
        <Switch
          value={show}
          className={s.toggleBtn}
          defaultChecked
          onChange={this.onChange}
        />
        {!show && <div className={s.layerMask} />}
      </div>
    );
  }
}

export default withStyles(s)(ToggleLayer);
