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
import HotSpots from './components/HotSpots';
import Banner from './components/Banner';
import SideNav from './components/SideNav';
import ThumbList from './components/ThumbList';
import Navbar from './components/Navbar';
import storage from 'utils/localStorage';

import s from './Topic.less';

class Topic extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      topicModules: {
        title: '0',
        banner: '1',
        sideNav: '1',
        mainNav: '1',
        logo: '1',
        imgList: '1',
      },
    };
  }

  componentDidMount() {
    this.updateTopicModules();
  }

  updateTopicModules = () => {
    const topicModules = JSON.parse(storage.get('topicModules') || '{}');
    // console.log(topicModules);
    this.setState({
      topicModules,
    });
  };

  render() {
    const {
      topicModules: { title, banner, sideNav, logo, mainNav, imgList },
    } = this.state;

    const showTitle = title === '1';
    const showLogo = logo === '1';
    return (
      <div className={s.root}>
        <div className="container">
          <Navbar showTitle={showTitle} showLogo={showLogo} />
          <div className={s.body}>
            {sideNav === '1' && <SideNav />}
            <div className={s.main}>
              {mainNav === '1' && <MainNav />}
              {imgList === '1' && <ThumbList row={4} />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Topic);
