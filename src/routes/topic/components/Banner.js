import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Icon, Upload } from 'antd';
import s from './Banner.less';

import imageUrl from '../assets/default_banner.png';

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: '',
      loading: false,
    };
  }

  render() {
    return (
      <div className={s.banner}>
        <img src={imageUrl} alt="" />
      </div>
    );
  }
}

export default withStyles(s)(Banner);
