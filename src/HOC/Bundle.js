import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Bundle extends Component {
  static propTypes = {
    load: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
  };

  static generateBundle = loadModule => () => (
    <Bundle load={loadModule}>
      {Mod =>
        Mod ? (
          <Mod />
        ) : (
          <div style={{ textAlign: 'center', paddingTop: '35vh' }}>Loading</div>
        )
      }
    </Bundle>
  );

  state = {
    mod: null,
  };

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }

  load(props) {
    this.setState({
      mod: null,
    });
    props.load(mod => {
      this.setState({
        mod: mod.default ? mod.default : mod,
      });
    });
  }

  render() {
    return this.props.children(this.state.mod);
  }
}

export default Bundle;
