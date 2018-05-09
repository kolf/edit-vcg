import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Login.less';

class Login extends React.Component {
  render() {
    return <div className={s.root}>登陆页面</div>;
  }
}

export default withStyles(s)(Login);
