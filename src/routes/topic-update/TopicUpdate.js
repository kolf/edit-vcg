/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import MainNav from './components/MainNav';
import SideNav from './components/SideNav';
import ThumbList from './components/ThumbList';
import LayoutMask from 'components/LayoutMask';
import Topbar from './components/Topbar';
import Navbar from './components/Navbar';

import storage from 'utils/localStorage';

import gs from 'components/App.less';
import s from './TopicUpdate.less';

class TopicUpdate extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    storage.set('topicModules', JSON.stringify(this.modulesValue));
  }

  modulesValue = {
    title: '1',
    banner: '1',
    sideNav: '1',
    logo: '1',
    mainNav: '1',
    imgList: '1',
  };

  changeModules = (key, checked) => {
    const value = checked ? '1' : '0';
    this.modulesValue[key] = value;

    storage.set('topicModules', JSON.stringify(this.modulesValue));
  };

  render() {
    return (
      <div className={s.root}>
        <Topbar />
        <div className="container">
          <Navbar toggleLayerChange={this.changeModules} />
          <div className={s.body}>
            <LayoutMask
              target="sideNav"
              onChange={this.changeModules}
              style={{ marginRight: 20 }}
            >
              <SideNav />
            </LayoutMask>
            <div className={s.main}>
              <LayoutMask target="mainNav" onChange={this.changeModules}>
                <MainNav />
              </LayoutMask>
              <LayoutMask target="imgList" onChange={this.changeModules}>
                <ThumbList row={4} />
              </LayoutMask>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(gs, s)(TopicUpdate);
