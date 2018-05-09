import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Input } from 'antd';
import ToggleLayer from './ToggleLayer';

const Search = Input.Search;

import s from './Navbar.less';
import logoUrl from '../assets/logo.svg';

class Navbar extends React.Component {
  render() {
    const { showTitle, showLogo } = this.props;

    return (
      <div className={s.root}>
        {showLogo && (
          <a className={s.logo}>
            <img src={logoUrl} width="110" alt="视觉中国" />
          </a>
        )}
        {showTitle && <h1 className={s.title}>2018俄罗斯世界杯</h1>}
        <div className={s.search}>
          <Search
            placeholder="专题内搜索"
            onSearch={value => console.log(value)}
            enterButton
          />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Navbar);
